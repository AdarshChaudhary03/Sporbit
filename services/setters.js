import firebaseSetup from './setup';
import {getAcademy, getAcademyByID, getUser} from './getters';
import {GoogleSignin} from '@react-native-community/google-signin';
import Toast from 'react-native-simple-toast';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

const {firestore, storage, auth} = firebaseSetup();


export const addSlotBooking = async (facilityID, slotIDs) => {
  slotIDs.forEach((slotID) => {
    firestore()
      .collection(`facilities/${facilityID}/bookings`)
      .doc(slotID)
      .set({
        user: auth().currentUser.uid,
        booked: true,
      });
  });
};
export const updateUserBookings = async (facility, slotIDs) => {
  let slotData = {
    facilityID: facility.id,
    facilityName: facility.name,
    payment: slotIDs.length * 200,
    bookingDate: new Date(),
    sports: facility.sports,
    bookings: {},
    user: auth().currentUser.uid,
  };
  for (const slot of slotIDs) {
    const splittedSlot = slot.split('-');
    const dateTime = `${splittedSlot[0]}`;
    const court = `${splittedSlot[1]}`;
    Object.keys(slotData.bookings).includes(dateTime)
      ? slotData.bookings[dateTime].push(court)
      : (slotData.bookings[dateTime] = [court]);
    console.log(slotData);
  }
  console.log('slotData ', slotData);
  await firestore()
    .collection(`users/${auth().currentUser.uid}/bookings`)
    .doc()
    .set(slotData, {merge: true});
};

export const addUser = async () => {
  let userData = auth().currentUser.toJSON();
  userData.players = [];
  delete userData.providerData;
  userData.location = new firestore.GeoPoint(0.0, 0.0);
  userData.birthday = new Date(946708200000); //1st Jan 2000
  userData.gender = '';
  firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .set(userData)
    .then(() => {
      console.log('User added');
    });
};

export const updateUser = async (data) => {
  firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .update(data)
    .then(() => {
      console.log('Profile Updated!');
    });
  try {
    await auth().currentUser.updateProfile(data);
  } catch (exception) {}
  return data;
};

export const updateUserLocation = async (location) => {
  await updateUser({location: location});
};

export const loginGoogle = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().currentUser.linkWithCredential(googleCredential);
};

export const FBGraphReq = async (accessToken) => {
  return new Promise((resolve, reject) => {
    const graphRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'picture.type(large)',
          },
        },
      },
      async (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
    new GraphRequestManager().addRequest(graphRequest).start();
  });
};

export const loginFacebook = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    console.log('Login was cancelled');
    return null;
  }
  const {accessToken} = await AccessToken.getCurrentAccessToken();
  const graphResult = await FBGraphReq(accessToken);
  const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);
  await auth().currentUser.linkWithCredential(facebookCredential);
  await auth().currentUser.updateProfile({
    photoURL: graphResult.picture.data.url,
  });
};

export const uploadPlayerProfileImage = async (playerID, image) => {
  const RNFS = require('react-native-fs');
  const profileImage = storage().ref(
    'players/' + playerID + '/profileImage.png',
  );
  const imagePath = `${RNFS.DocumentDirectoryPath}/temp.png`;

  await RNFS.writeFile(imagePath, image, 'base64');
  await profileImage.putFile(imagePath);
  const photoURL = await profileImage.getDownloadURL();
  console.log('image', photoURL);

  await updatePlayer({id: playerID, photoURL: photoURL});
};

export const uploadUserProfileImage = async (image, type) => {
  let photoURL = '';
  const RNFS = require('react-native-fs');
  const profileImage = storage().ref(
    'users/' + auth().currentUser.uid + '/profileImage.png',
  );
  const imagePath = `${RNFS.DocumentDirectoryPath}/temp.png`;

  if (type === 'url') {
    const imageUrl = decodeURI(image);
    await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: imagePath,
    })
      .promise.then(() => {})
      .catch(() => {});

    await profileImage.putFile(imagePath);
    photoURL = await profileImage.getDownloadURL();
  }

  if (type === 'base64') {
    await RNFS.writeFile(imagePath, image, 'base64');
    await profileImage.putFile(imagePath);
    photoURL = await profileImage.getDownloadURL();
  }
  await updateUser({photoURL: photoURL});
};

export const addPlayer = async (data, base64) => {
  console.log(data, base64);
  const RNFS = require('react-native-fs');
  const imagePath = `${RNFS.DocumentDirectoryPath}/temp.png`;
  const ref = firestore().collection('players').doc();
  const profileImage = storage().ref('players/' + ref.id + '/profileImage.png');
  if (base64) {
    await RNFS.writeFile(imagePath, data.photoURL, 'base64');
    await profileImage.putFile(imagePath);
    data.photoURL = await profileImage.getDownloadURL();
  }
  await updateUser({players: firestore.FieldValue.arrayUnion(ref)});
  await ref
    .set(data)
    .then(() => {})
    .catch((error) => {
      const {code, message} = error;
      console.warn(code, message);
    });
  return ref.id;
};

export const updatePlayer = async (data) => {
  await firestore().collection('players').doc(data.id).update(data);
  return data;
};

export const updateHomeworkDone = async (classID, studentID) => {
  await firestore()
    .collection(`students/${studentID}/classHistory`)
    .doc(classID.toString())
    .update({homeworkDone: true});
};

export const addStudent = async (data, mode, academyID, payDuration, noOfClasses, layOffClasses) => {
  const studentRef = firestore()
    .collection(`academies/${data.academy.id}/students`)
    .doc();
  const academyRef = firestore().collection('academies').doc(data.academy.id);
  const playerRef = firestore().collection('players').doc(data.player.id);
  const student = {
    timing: data.batch.startTime,
    academyName: data.academy.name,
    academy: academyRef,
    academyAddress: data.academy.address,
    nextClass: data.nextClass,
    nextClassTime: data.nextClassTime,
    player: playerRef,
    user: data.user,
    playerName: data.player.name,
    playerID: data.player.id,
    batch: data.batch,
    skills: data.skills,
    level: data.level,
    status: mode=='trial' ? 'On Trial' : 'Registered',
    sports: data.academy.sports,
    attendance: 0,
    classes: mode=='trial' ? 1 : parseInt(noOfClasses),
    subscriptionEnd: data.subscriptionEnd,
    subscriptionID: '',
    classID: data.classID,
    attendanceType: '',
    isAttendanceDone: false,
    isLayOff: false,
    layOffStartDate: null,
    layOffEndDate: null,
    layOffAvailable: layOffClasses,
    layOffAvailed: 0,
    sportID: data.sportID,
    isRatingDone: false
  };

  studentRef.set(student).catch((error) => {
    const {code, message} = error;
    console.warn(code, message);
  });

  mode=='trial' ? null : await updatePlayer(
    {id: data.player.id, students: firestore.FieldValue.arrayUnion(studentRef)},
    false,
  );
  alert(mode=='trial' ? 'Your trial has been successfully registered.' : 'You have successfully registered.');
//  await firestore()
//    .collection(
//      `academies/${data.academy.id}/students/${studentRef.id}/classHistory`,
//    )
//    .doc(`${data.nextClassTime.getTime()}`)
//    .set({firstClass: true});
  return studentRef.id;
};

export const updateStudent = async (id, academyID, data) => {
  await firestore()
    .collection(`academies/${academyID}/students`)
    .doc(id)
    .update(data);
};

export const updateLayOff = async (academyID, studentID, data) => {
  const update = {
    isLayOff: true,
    layOffStartDate: new Date(data.layOffStartDate),  
    noOfLayOff: data.noOfLayOff  
  }
  await firestore()
  .collection(`academies/${academyID}/students`)
  .doc(studentID)
  .update(update);
}

export const deletePlayer = async (playerID) => {
  let user = await getUser();
  console.log(playerID);
  const players = await user.players.filter((item) => {
    return item.id !== playerID;
  });
  console.log(players);
  await updateUser({players: players});
};
export const addPaymentItem = async (data) => {
  const paymentRef = await firestore()
    .collection(`users/${auth().currentUser.uid}/payments`)
    .doc();
  await paymentRef.set(data);
  return paymentRef.id;
};
export const addSubscriptionItem = async (data) => {
  const subscriptionRef = await firestore()
    .collection(`users/${auth().currentUser.uid}/subscriptions`)
    .doc();
  await subscriptionRef.set(data);
  return subscriptionRef.id;
};
export const addClass = async (data, academyId) => {
  const classRef = await firestore()
    .collection(`academies/${academyId}/classes`)
    .doc();
  await classRef.set({...data, data,uid: classRef.id});
  return classRef.id;
};

export const updatePaymentItem = async (paymentID, data) => {
  await firestore()
    .collection(`users/${auth().currentUser.uid}/payments`)
    .doc(paymentID)
    .update(data);
};
export const updateSubscriptionItem = async (subscriptionID, data) => {
  await firestore()
    .collection(`users/${auth().currentUser.uid}/subscriptions`)
    .doc(subscriptionID)
    .update(data);
};
