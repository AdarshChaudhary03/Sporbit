const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



exports.paymentDone = functions
    .region("asia-south1")
    .firestore
    .document("/users/{userID}/payments/{paymentID}")
    .onWrite(async (change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        if(beforeData && beforeData.status === afterData.status){
            console.log('status unchanged')
            return true;
        }
        if(afterData.status !== 'paid'){
            console.log('payment ',afterData.status)
            return true
        }
        const userID = afterData.user
        const userRef = await admin
            .firestore()
            .collection("users")
            .doc(userID).get()
        const userToken = userRef.data().tokens
        await admin.messaging().sendMulticast({
            tokens: userToken,
            notification: {
                title: `Payment of ₹${afterData.amount / 100} was received towards ${afterData.description}`,
                body: "You can view more details.",
            },
            data: {screen: "PaymentScreen"},
        })
    })
exports.bookingDone = functions
    .region("asia-south1")
    .firestore
    .document("/users/{userID}/bookings/{bookingID}")
    .onWrite(async (change, context) => {
        const afterData = change.after.data();
        const userID = afterData.user
        console.log('user', userID)
        const userRef = await admin
            .firestore()
            .collection("users")
            .doc(userID).get()
        const userToken = userRef.data().tokens
        await admin.messaging().sendMulticast({
            tokens: userToken,
            notification: {
                title: `Booking at ₹${afterData.facilityName} was confirmed.`,
                body: "You can view more details.",
            },
            data: {screen: "BookingsScreen"},
        })
    })

exports.classUpdated = functions
    .region("asia-south1")
    .firestore
    .document("/academies/{academyID}/classes/{classID}")
    .onUpdate(async (change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();
        if(beforeData.status === afterData.status){
            console.log('status unchanged')
            return true;
        }
        if(afterData.status !== 'done'){
            console.log('class started',afterData.status)
            return true
        }
        for (const studentID of afterData.students) {
            console.log(studentID)
            const studentRef = await admin
                .firestore()
                .collection("students")
                .doc(studentID).get()
            const playerID = studentRef.data().player.id
            const userID = studentRef.data().user
            console.log(`Sending notification to ${playerID} of ${userID}`)
            const playerRef = await admin
                .firestore()
                .collection("players")
                .doc(playerID).get()
            const playerName = playerRef.data().name
            const userRef = await admin
                .firestore()
                .collection("users")
                .doc(userID).get()
            const userToken = userRef.data().tokens
            await admin.messaging().sendMulticast({
                tokens: userToken,
                notification: {
                    title: `${playerName}'s class just got over.`,
                    body: "Checkout their performance now.",
                },
                data: {screen: "CourseScreen", playerID: playerID},
            })
        }
  });


exports.handleNewSignUp = functions
    .region("asia-south1")
    .auth.user().onCreate((user) => {
      const {uid, phoneNumber, displayName, metadata} = user;
      const {creationTime, lastSignInTime} = metadata;
      const userData = {
        uid: uid,
        phoneNumber: phoneNumber,
        email: "",
        emailVerified: false,
        location: new admin.firestore.GeoPoint(0.0, 0.0),
        players: [],
        birthday: new Date(946708200000), // 1st Jan 2000
        gender: "",
        creationTime: creationTime,
        lastSignInTime: lastSignInTime,
      };
      admin.firestore().collection("users")
          .doc(uid)
          .set(userData,{merge:true})
          .then(() => {
            console.log("User added");
          });
    });
//
// exports.uploadImage = functions
//     .region("asia-south1")
//     .https.onCall((data, context) => {
//       console.log(data, context);
//       functions.logger.info("Hello logs!", {structuredData: true});
//     });
//
// exports.listProducts = functions
//     .region("asia-south1")
//     .https.onCall((data, context) => {
//       return [{asd: 1}];
//     });
