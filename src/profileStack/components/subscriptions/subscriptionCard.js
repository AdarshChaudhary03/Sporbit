import React from 'react';
import {useContext, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {AppContext} from '../../../../services/appContext';
import Toast from 'react-native-simple-toast';
import PackageCards3 from '../../../homeStack/components/batchSelectionScreen/packageCards3';
import RenewCard from './renewCard';
import firebaseSetup from '../../../../services/setup';
import { addPaymentItem, addSubscriptionItem, updateStudent, updateSubscriptionItem } from '../../../../services/setters';
import { pushNotifications } from '../../../../services';
const {firestore} = firebaseSetup();



const SubscriptionCard = ({navigation, subscription, subscriptionID}) => {
  const {players, updateUserContext} = useContext(AppContext);

  const [ toggleRenew, setToggleRenew ] = useState(false);
  const [ level, setLevel] = useState();
  const [ duration, setDuration ] = useState();
  const [ pack, setPack] = useState();
  const [ batch, setBatch ] = useState();
  console.log(subscription.type);
  console.log('key',subscriptionID);


  const prompt = () => {
    Alert.alert(
     'Confirmation',
    'Are you sure to renew for this course?',
     [
       {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
       {text: 'YES', onPress: () => confirmPressed()},
     ]
   );
 }

 const confirmPressed = async () => {
   console.log(subscription.studentName);
  let payment = 0;
   let academyRef = firestore().collection('academies').doc(subscription.academy);
   console.log(subscription.sportName);
   console.log(academyRef);
  await firestore().collection('packages')
   .where("sports",'==',subscription.sportName)
   .where("academy",'==',academyRef)
   .get().then((querySnapshot) => {
    for(const docSnapshot of querySnapshot.docs){
      console.log('pack',pack);
      console.log('level',level);
      console.log('duration',duration);
//      console.log(academyRef.totalClasses[duration]);
      switch(pack){
           case '3 days/week':
             if(level=='Beginner'){
               if(duration==='Monthly'){
                payment = docSnapshot.data().packageDetails[0].monthly;
               }
               if(duration==='Quaterly'){
                payment = docSnapshot.data().packageDetails[0].quaterly;
               }
               if(duration==='Semi Annual'){
                payment = docSnapshot.data().packageDetails[0].semiAnnual;
               }
               if(duration==='Annual'){
                payment = docSnapshot.data().packageDetails[0].annually;
               }
              }
             if(level=='Intermediate'){
              if(duration==='Monthly'){
                payment = docSnapshot.data().packageDetails[1].monthly;
               }
               if(duration==='Quaterly'){
                payment = docSnapshot.data().packageDetails[1].quaterly;
               }
               if(duration==='Semi Annual'){
                payment = docSnapshot.data().packageDetails[1].semiAnnual;
               }
               if(duration==='Annual'){
                payment = docSnapshot.data().packageDetails[1].annually;
               }
             }
             if(level=='Advanced'){
              if(duration==='Monthly'){
                payment = docSnapshot.data().packageDetails[2].monthly;
               }
               if(duration==='Quaterly'){
                payment = docSnapshot.data().packageDetails[2].quaterly;
               }
               if(duration==='Semi Annual'){
                payment = docSnapshot.data().packageDetails[2].semiAnnual;
               }
               if(duration==='Annual'){
                payment = docSnapshot.data().packageDetails[2].annually;
               }
             }
             if(level=='Professional'){
              if(duration==='Monthly'){
                payment = docSnapshot.data().packageDetails[3].monthly;
               }
               if(duration==='Quaterly'){
                payment = docSnapshot.data().packageDetails[3].quaterly;
               }
               if(duration==='Semi Annual'){
                payment = docSnapshot.data().packageDetails[3].semiAnnual;
               }
               if(duration==='Annual'){
                payment = docSnapshot.data().packageDetails[3].annually;
               }
             }
               break;
           case '6 days/week':
            if(level=='Beginner'){
              if(duration==='Monthly'){
               payment = docSnapshot.data().packageDetails1[0].monthly;
              }
              if(duration==='Quaterly'){
               payment = docSnapshot.data().packageDetails1[0].quaterly;
              }
              if(duration==='Semi Annual'){
               payment = docSnapshot.data().packageDetails1[0].semiAnnual;
              }
              if(duration==='Annual'){
               payment = docSnapshot.data().packageDetails1[0].annually;
              }
             }
            if(level=='Intermediate'){
             if(duration==='Monthly'){
               payment = docSnapshot.data().packageDetails1[1].monthly;
              }
              if(duration==='Quaterly'){
               payment = docSnapshot.data().packageDetails1[1].quaterly;
              }
              if(duration==='Semi Annual'){
               payment = docSnapshot.data().packageDetails1[1].semiAnnual;
              }
              if(duration==='Annual'){
               payment = docSnapshot.data().packageDetails1[1].annually;
              }
            }
            if(level=='Advanced'){
             if(duration==='Monthly'){
               payment = docSnapshot.data().packageDetails1[2].monthly;
              }
              if(duration==='Quaterly'){
               payment = docSnapshot.data().packageDetails1[2].quaterly;
              }
              if(duration==='Semi Annual'){
               payment = docSnapshot.data().packageDetails1[2].semiAnnual;
              }
              if(duration==='Annual'){
               payment = docSnapshot.data().packageDetails1[2].annually;
              }
            }
            if(level=='Professional'){
             if(duration==='Monthly'){
               payment = docSnapshot.data().packageDetails1[3].monthly;
              }
              if(duration==='Quaterly'){
               payment = docSnapshot.data().packageDetails1[3].quaterly;
              }
              if(duration==='Semi Annual'){
               payment = docSnapshot.data().packageDetails1[3].semiAnnual;
              }
              if(duration==='Annual'){
               payment = docSnapshot.data().packageDetails1[3].annually;
              }
            }
                break;
         }
     }
   });

   console.log('payment',payment);
   let additionalClasses = 0;
//   console.log(academyRef.data());
await firestore().collection('academies').doc(subscription.academy).get().then(academy => {
  if(duration==='Semi Annual'){
    additionalClasses = academy.data().totalClasses['semiAnnual'];
}
else if(duration==='Annual'){
  additionalClasses = academy.data().totalClasses['annually'];
}
else{
  additionalClasses = academy.data().totalClasses[duration];
}

console.log('additionalClasses',additionalClasses);

});
   const today = new Date();
      const paymentData = {
        studentID: subscription.studentID,
        playerID: subscription.playerID,
        subscriptionID: subscriptionID,
        dueDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 7,
        ),
        description: `Fees at ${subscription.academyName}`,
        amount: payment,
  //      amount: payment * durationRelation[payDuration] * 100,
        user: players[subscription.playerID].user,
        academy: subscription.academy,
        status: 'Unpaid',
        mode: '',
        razorPayID: 'rzp_live_SdfK6jnDFZivon',
        paymentDate: null,
        previousPayment: '',
      };
      const paymentID = await addPaymentItem(paymentData);
      await updateSubscriptionItem(subscriptionID, 
        {
          paymentID: paymentID,
          dueDate:  new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7,
          ),
          payDuration: duration,
          monthlyFees: payment,
          amount: payment
                    });
      await updateStudent(subscription.studentID, subscription.academy, {
        subscriptionID: subscriptionID,
        uid: subscription.studentID,
        classes: parseInt(players[subscription.playerID].classes) + parseInt(additionalClasses)
      }).then(() => {
        alert('Renewed successfully.');
        navigation.navigate('PaymentScreen');
      });
      navigation.navigate('PaymentScreen');
  
      pushNotifications.localNotification({
        //... You can use all the options from localNotifications
        channelId: 'LastPageDefault',
        message: `${subscription.studentName} has renewed his/her course in ${subscription.academyName}.`, // (required)
        date: new Date(Date.now() + 1000), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
        data: {screen: 'CourseScreen', playerID: subscription.playerID},
      });
      await updateUserContext();
  };
  
 


  const TimeBar = () => {
    const widthFilled = `${
      (100 * (new Date() - subscription.startDate)) /
      (subscription.dueDate - subscription.startDate)
    }%`;
    return (
      <View>
        <View style={styles.containerBox} />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: heightToDP('1%'),
            width: widthFilled,
            backgroundColor: '#ff5959',
            marginTop: -heightToDP('0.75%'),
            borderRadius: heightToDP('1%'),
          }}
        />
      </View>
    );
  };
  const AcademyCard = () => {
    return (
      <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/images/subscription/academy.png')}
            style={styles.subsIcon}
          />
          <View style={styles.flexOne}>
            <View style={styles.flexRowSpaced}>
              <View style={styles.flexRow}>
                <Text style={styles.subsHeaderText}>{subscription.studentName}</Text>
                {players[subscription.playerID].status === 'On Trial' ? (
                  <Text style={[styles.subsActivity, styles.colorBack]}>
                    ON TRIAL
                  </Text>
                ) : (
                  <Text style={styles.subsActivity}>ACTIVE</Text>
                )}
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  onPress={() => {
                    setToggleRenew(!toggleRenew);
//                    navigation.navigate('PaymentScreen') 
                    }}>
                  <Text style={styles.renewText}>Renew</Text>
                </TouchableOpacity>
                <Text style={styles.divisionText}>|</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubscriptionDetails', {
                      subscription: subscription,
                    })
                  }>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startEndRow}>
              <Text style={styles.startedText}>Started</Text>
              <Text style={styles.endText}>Ends</Text>
            </View>
            <View style={styles.datesRow}>
              <Text style={styles.dueDate}>
                {subscription.startDate
                  .toLocaleString('en-GB', {timeZone: 'IST'})
                  .split(' ')
                  .splice(0, 3)
                  .join(' ')}
              </Text>
              <Text style={styles.dueDate}>
                {subscription.dueDate
                  .toUTCString()
                  .split(' ')
                  .splice(0, 3)
                  .join(' ')}
              </Text>
            </View>
            <TimeBar />
          </View>
        </View>
        { toggleRenew ? <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <RenewCard level={level} setLevel={setLevel} duration={duration} setDuration={setDuration} batch={batch} setBatch={setBatch} pack={pack} setPack={setPack}/>
          </View>
          <View style={styles.flexRow}>
          <TouchableOpacity
        style={styles.booking}
        onPress={prompt}>
        <Text style={styles.bookingTextLarge}>RENEW</Text>
      </TouchableOpacity>

          </View>
          </View>: null}
      </View>
    );
  };

  const VideoCard = () => {
    return (
      <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/images/subscription/video.png')}
            style={styles.subsIcon}
          />
          <View style={styles.flexOne}>
            <View style={styles.flexRowSpaced}>
              <View style={styles.flexRow}>
                <Text style={styles.subsHeaderText}>Video Course</Text>
                <Text style={styles.subsActivity}>ACTIVE</Text>
              </View>
              <View style={styles.flexRow}>
                <TouchableOpacity>
                  <Text style={styles.renewText}>Renew</Text>
                </TouchableOpacity>
                <Text style={styles.divisionText}>|</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubscriptionDetails', {
                      subscription: subscription,
                    })
                  }>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startEndRow}>
              <Text style={styles.startedText}>Started</Text>
              <Text style={styles.endText}>Ends</Text>
            </View>
            <View style={styles.datesRow}>
              <Text style={styles.dueDate}>
                {subscription.startDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
              <Text style={styles.dueDate}>
                {subscription.dueDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
            </View>
            <TimeBar />
          </View>
        </View>
      </View>
    );
  };

  const HealthCard = () => {
    return (
      <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/images/subscription/health.png')}
            style={styles.subsIcon}
          />
          <View style={styles.flexOne}>
            <View style={styles.flexRowSpaced}>
              <View style={styles.flexRow}>
                <Text style={styles.subsHeaderText}>Health Course</Text>
                <Text style={styles.subsInactivity}>INACTIVE</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.renewText}>Renew</Text>
                <Text style={styles.divisionText}>|</Text>
                <TouchableOpacity onPress={() => Toast.show('Coming Soon')}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startEndRow}>
              <Text style={styles.startedText}>Started</Text>
              <Text style={styles.endText}>Ends</Text>
            </View>
            <View style={styles.datesRow}>
              <Text style={styles.dueDate}>
                {subscription.startDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
              <Text style={styles.dueDate}>
                {subscription.dueDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
            </View>
            <TimeBar />
          </View>
        </View>
      </View>
    );
  };

  const PhysioCard = () => {
    return (
      <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/images/subscription/physio.png')}
            style={styles.subsIcon}
          />
          <View style={styles.flexOne}>
            <View style={styles.flexRowSpaced}>
              <View style={styles.flexRow}>
                <Text style={styles.subsHeaderText}>Physio</Text>
                <Text style={styles.subsInactivity}>INACTIVE</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.renewText}>Renew</Text>
                <Text style={styles.divisionText}>|</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubscriptionDetails', {
                      subscription: subscription,
                    })
                  }>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startEndRow}>
              <Text style={styles.startedText}>Started</Text>
              <Text style={styles.endText}>Ends</Text>
            </View>
            <View style={styles.datesRow}>
              <Text style={styles.dueDate}>
                {subscription.startDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
              <Text style={styles.dueDate}>
                {subscription.dueDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
            </View>
            <TimeBar />
          </View>
        </View>
      </View>
    );
  };

  const DietCard = () => {
    return (
      <View key={subscription.id} style={styles.subsBox}>
        <View style={styles.flexRow}>
          <Image
            source={require('../../../../assets/images/subscription/diet.png')}
            style={styles.subsIcon}
          />
          <View style={styles.flexOne}>
            <View style={styles.flexRowSpaced}>
              <View style={styles.flexRow}>
                <Text style={styles.subsHeaderText}>Diet Course</Text>
                <Text style={styles.subsInactivity}>INACTIVE</Text>
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.renewText}>Renew</Text>
                <Text style={styles.divisionText}>|</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubscriptionDetails', {
                      subscription: subscription,
                    })
                  }>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startEndRow}>
              <Text style={styles.startedText}>Started</Text>
              <Text style={styles.endText}>Ends</Text>
            </View>
            <View style={styles.datesRow}>
              <Text style={styles.dueDate}>
                {subscription.startDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
              <Text style={styles.dueDate}>
                {subscription.dueDate
                  .toUTCString()
                  .split(' ')
                  .splice(1, 3)
                  .join(' ')}
              </Text>
            </View>
            <TimeBar />
          </View>
        </View>
      </View>
    );
  };

  switch (subscription.type) {
    case 'academy':
      return <AcademyCard />;
    case 'video':
      return <VideoCard />;
    case 'physio':
      return <PhysioCard />;
    case 'health':
      return <HealthCard />;
    case 'diet':
      return <DietCard />;
  }
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
  },
  backButton: {
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('4%'),
  },
  headingIcon: {
    position: 'absolute',
    left: 0,
  },
  headingText: {
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
  playerImage: {
    height: widthToDP('20%'),
    width: widthToDP('20%'),
    borderRadius: widthToDP('50%'),
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
  },
  selectedPlayerImage: {
    height: widthToDP('25%'),
    width: widthToDP('25%'),
    borderRadius: widthToDP('50%'),
    borderWidth: 2,
    borderColor: '#ff6362',
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
  },
  scrollPage: {
    width: widthToDP('100%'),
    padding: widthToDP('3%'),
  },
  subsBox: {
    borderRadius: widthToDP('4%'),
    backgroundColor: '#ffff',
    elevation: 5,
    padding: widthToDP('4%'),
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('3%'),
  },
  subsIcon: {
    width: widthToDP('7%'),
    height: widthToDP('7%'),
    marginRight: widthToDP('3%'),
  },
  subsHeaderText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
  },
  renewText: {
    color: '#FF5959',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
  },
  divisionText: {
    color: '#898989',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-Regular',
    marginHorizontal: widthToDP('1%'),
  },
  changeText: {
    color: '#FF5959',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
  },
  startedText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('3.6%'),
  },
  endText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('3.6%'),
  },
  subsActivity: {
    left: widthToDP('0.8%'),
    top: heightToDP('0.6%'),
    color: '#ffff',
    height: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('1.2%'),
    fontSize: widthToDP('3%'),
    backgroundColor: 'rgba(20, 154, 25, 0.61)',
  },
  subsInactivity: {
    left: widthToDP('0.8%'),
    top: heightToDP('0.6%'),
    color: '#ffff',
    height: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('1.2%'),
    fontSize: widthToDP('3%'),
    backgroundColor: 'rgba(255, 1, 1, 1)',
  },
  startEndRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: heightToDP('0.5%'),
    marginRight: widthToDP('14%'),
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: heightToDP('0.5%'),
  },
  dueDate: {
    color: 'black',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  studentNameBox: {
    borderRadius: widthToDP('2%'),
    paddingHorizontal: widthToDP('0.5%'),
    paddingVertical: heightToDP('0.5%'),
    backgroundColor: 'rgba(20, 154, 25, 0.61)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentNameText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: widthToDP('2.5%'),
  },
  horizontalScroll: {
    height: heightToDP('0.1%'),
    borderRadius: widthToDP('0.1%'),
    borderStyle: 'solid',
    backgroundColor: '#FF5959',
    marginVertical: 5,
  },
  paymentItem: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderColor: '#fff',
    borderRadius: 50,
    zIndex: 10,
    borderWidth: 2,
    margin: 5,
    padding: 30,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentStatus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6362',
    borderBottomWidth: 1,
    width: '50%',
    borderBottomColor: '#707070',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  paymentButtonText: {
    marginVertical: 15,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  item: {
    marginVertical: 5,
    paddingHorizontal: 5,
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleLogo: {
    flex: 1,
    marginTop: 220,
    width: widthToDP('100%'),
  },
  title: {
    color: '#fff',
    fontSize: 52,
    fontFamily: 'Gilroy-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  learn: {
    marginTop: 10,
    color: '#fff',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: heightToDP('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: heightToDP('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-SemiBold',
  },
  subHeader: {
    height: heightToDP('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: heightToDP('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-SemiBold',
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
  },
  footer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: heightToDP('90%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  settingsTab: {},
  settingsTabText: {},
  paymentDescriptionText: {
    fontSize: widthToDP('3%'),
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  settingsTabArrow: {
    fontSize: widthToDP('1%'),
    color: '#ff6362',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    textAlign: 'right',
  },
  flexOne: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBox: {
    height: heightToDP('0.5%'),
    width: '100%',
    backgroundColor: '#BBBBBB',
    borderRadius: heightToDP('1%'),
  },
  colorBack: {backgroundColor: 'rgba(255, 1, 1, 1)'},
  booking: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    backgroundColor: '#ff6362',
    marginVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
  },
  bookingTextLarge: {
    fontSize: widthToDP('5%'),
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  bookingTextSmall: {
    fontSize: widthToDP('5%'),
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
    marginTop: heightToDP('-2%')
  },
});
