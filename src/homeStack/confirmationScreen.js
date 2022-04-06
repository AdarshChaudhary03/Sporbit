import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAcademy, getClass} from '../../services/getters';
import {
  addClass,
  addPaymentItem,
  addStudent,
  addSubscriptionItem,
  updateStudent,
  updateSubscriptionItem,
} from '../../services/setters';

import {AppContext} from '../../services/appContext';
import {heightToDP, widthToDP} from '../../services/utils';

import {pushNotifications} from '../../services';
import Header from '../components/header';
import PackageCards3 from './components/batchSelectionScreen/packageCards3';
import moment from "moment";
import DatePicker from "react-native-datepicker";

export default function ConfirmationScreen({route, navigation}) {
  const {user, players, updateUserContext} = useContext(AppContext);
  const [ payDuration, setPayDuration ] = useState("");
  const [nextClass, setNextClass] = useState(new Date());
  const [ payment, setPayment ] = useState("");
  const [date, setDate] = useState(new Date())
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let {academy, player, batch, sports, pack, nextClassDate, nextClassTimings, mode} = route.params;

  console.log('nextClassDate',nextClassDate);
  console.log("Payment:"+payment);
  const levelDetails = {
    Beginner: 5000,
    Intermediate: 6000,
    Advanced: 7500,
    Professional: 10000,
  };

  const disabledDate = (current) => {
    console.log(moment(current).day());
    return moment(current).day() === 0
  }

  const checkDate = (current) => {
    console.log('Checking date.....');
    console.log(moment(current).day());
    if(moment(current).day()===0){
        alert('Classes not available on Sundays.');
        const prevDate = new Date(current);
        prevDate.setDate(prevDate.getDate()-1);
        setDate(prevDate);
        setNextClass(prevDate);
    }
    else{
        setDate(current);
        setNextClass(current);
    }
}  

  player = players[player];
  const today = new Date();
  let skills = academy.skills;
  console.log(skills);
  Object.keys(skills).filter((skill) => skills[skill].sport!==sports.uid).forEach((skill) => {
    delete skills[skill];
  });

const prompt = () => {
   Alert.alert(
    'Confirmation',
    mode!=='trial' ? 'Are you sure to register for this course?' : 'Are you sure to register for this trial?',
    [
      {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
      {text: 'YES', onPress: () => confirmPressed()},
    ]
  );
}

  const confirmPressed = async () => {
//    return;
    const classData = {
      player: player,
      user: user.uid,
      sports: sports.uid,
//      academy: academy,
      academyName: academy.name,
      batch: batch.key,
      level: batch.level,
      skills: skills,
      videos: [],
      nextClass: mode=='trial' ? new Date(nextClassDate) : new Date(date),
      nextClassTime: mode=='trial' ? nextClassTimings : batch.timings.startTime.substring(0,2)+':'+batch.timings.startTime.substring(2,4)+'-'+batch.timings.endTime.substring(0,2)+':'+batch.timings.endTime.substring(2,4),
      subscriptionID: '',
      coachAssigned:'',
      status: mode=='trial' ? 'On Trial' : 'Registered'
    };
    const classID = await addClass(classData,academy.id);
    const data = {
      player: player,
      user: user.uid,
      academy: academy,
      academyName: academy.name,
      batch: batch.key,
      level: batch.level,
      skills: skills,
      videos: [],
      nextClass: mode=='trial' ? new Date(nextClassDate) : new Date(date),
      nextClassTime: mode=='trial' ? nextClassTimings : batch.timings.startTime.substring(0,2)+':'+batch.timings.startTime.substring(2,4)+'-'+batch.timings.endTime.substring(0,2)+':'+batch.timings.endTime.substring(2,4),
      subscriptionID: '',
      classID: classID,
      sportID: sports.uid
    };  
    const studentID = await addStudent(data, mode,academy.id,payDuration,academy.totalClasses[payDuration],academy.layOffClasses[payDuration]);
    const subscriptionData = {
      studentName: player.name,
      paymentID: '',
      startDate: today,
      lastPaidDate: null,
      type: 'academy',
      academy: academy.id,
      status: mode=='trial' ? 'On Trial': 'Registered',
      dueDate: mode=='trial' ? nextClassDate : new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      ),
      studentID: studentID,
      playerID: player.id,
      academyName: academy.name,
      payDuration: mode=='trial' ? null : payDuration,
      monthlyFees: mode=='trial' ? 0 : payment,
      amount: mode=='trial' ? 0 : payment,
//      amount: payment * durationRelation[payDuration] * 100,
      discount: 0,
      sportID: sports.uid,
      sportName: sports.name
    };
    const subscriptionID = await addSubscriptionItem(subscriptionData);

    const paymentData = {
      studentID: studentID,
      playerID: player.id,
      subscriptionID: subscriptionID,
      dueDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7,
      ),
      description: `Fees at ${academy.name}`,
      amount: payment,
//      amount: payment * durationRelation[payDuration] * 100,
      user: user.uid,
      academy: academy.id,
      status: 'Unpaid',
      mode: '',
      razorPayID: 'rzp_live_SdfK6jnDFZivon',
      paymentDate: null,
      previousPayment: '',
    };
    const paymentID = mode=='trial' ? null : await addPaymentItem(paymentData);
    mode=='trial' ? null :  await updateSubscriptionItem(subscriptionID, {paymentID: paymentID});
    mode=='trial' ? null : await updateStudent(studentID, academy.id, {
      subscriptionID: subscriptionID,
      uid: studentID
    }).then(() => {
      navigation.navigate(mode=='trial' ? 'BottomTab' : 'PaymentScreen');
    });
    navigation.navigate(mode=='trial' ? 'BottomTab' : 'PaymentScreen');

    pushNotifications.localNotification({
      //... You can use all the options from localNotifications
      channelId: 'LastPageDefault',
      message: mode=='trial' ? `${player.name} has been booked for a trial class in ${academy.name}.` : `${player.name} has been booked for the class in ${academy.name}.`, // (required)
      date: new Date(Date.now() + 1000), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      data: {screen: 'CourseScreen', playerID: player.id},
    });
    pushNotifications.localNotification({
      //... You can use all the options from localNotifications
      channelId: 'LastPageDefault',
      message: mode=='trial' ? `${player.name}'s class at ${academy.name} on ${nextClassDate}` : `${player.name}'s class at ${academy.name} begins in 30 mins.`, // (required)
      date: mode=='trial' ? new Date(nextClassDate) : new Date(nextClass), // in 30 mins
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      data: {screen: 'CourseScreen', playerID: player.id},
    });
    await updateUserContext();
};

//  useEffect(() => {
//    console.log('USe effect called');
//    console.log(nextClassDate);
//    getClass(academy.id, batch.nextClass).then((classData) => {
//      setNextClass(classData);
//    });
//  }, [academy.id, batch.nextClass]);

  return (
    <ScrollView style={styles.container}>
      <Header text={'Confirmation'} />
      <View style={{height: heightToDP('8%')}} />
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Student</Text>
        <Text style={styles.itemRowTextSub}>{player.name}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Academy</Text>
        <Text style={styles.itemRowTextSub}>{academy.name}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Level</Text>
        <Text style={styles.itemRowTextSub}>{mode=='trial' ? 'Beginner (Trial)' : batch.level}</Text>
      </View>
      {mode=='trial' ? null : <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Days</Text>
        <Text style={styles.itemRowTextSub}>
          {pack=='3' ? '3 Days/week' :
          (pack==='6' ? '6 Days/week' : 
          (pack==='2' ? '2 Days/week' : 
          (pack==='s42' ? '4 Days- 2 hrs/week' :
          (pack==='s43' ? '4 Days- 3 hrs/week' :
          (pack==='s62' ? '6 Days- 2 hrs/week' :
          (pack==='s63' ? '6 Days- 3 hrs/week' :
          null))))))  
        }
        </Text>
      </View>}
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Status</Text>
        <Text style={styles.itemRowTextSub}>{mode=='trial' ? 'On-Trial' : 'Registered'}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Next Class</Text>
        <Text style={styles.itemRowTextSub}>
          {mode!=='trial'
            ?         <DatePicker 
            date={date} 
            mode='date'
            textColor='black'
            disabledDate={disabledDate}
            onDateChange={checkDate} 
            minimumDate={new Date()}
            maximumDate={new Date("2025-01-01")}
            />            
            : 
            nextClassDate.toString().substring(0,10)
            + ' ' + nextClassTimings + '\n'}
        </Text>
      </View>
      {mode=='trial' ? null : <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Due Date</Text>
        <Text style={styles.itemRowTextSub}>
          {new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
            .toUTCString()
            .split(' ')
            .slice(0, 3)
            .join(' ')}
        </Text>
      </View>}
      {false ? <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>Due Amount</Text>
        <Text style={styles.itemRowTextSub}>
          {payment} {payDuration}
        </Text>
      </View>: null}

      {mode=='trial' ? null : <View style={styles.itemRow}>
              <PackageCards3 batch={batch} pack={pack} onConfirm={prompt} setPayDuration={setPayDuration} setPayment={setPayment} sports={sports} academy={academy}/>
              </View>
              }
      {mode=='trial' ? <View style={styles.paymentButtonView}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={prompt}>
          <Text style={styles.paymentButtonText}>Register</Text>
        </TouchableOpacity>
      </View>: null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
    fontFamily: 'Gilroy-SemiBold',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
  itemRow: {
    paddingVertical: heightToDP('2%'),
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('7%'),
    flexDirection: 'row',
  },
  itemRowTextMain: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('1%'),
  },
  itemRowTextSub: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-Regular',
    marginBottom: heightToDP('1%'),
  },
  body: {
    // alignItems:'center',
  },
  gridTop: {
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  rowDetailsTop: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  columnStaticTop: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '35%',
  },
  columnStaticTextTop: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  columnDynamicTop: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '60%',
    marginLeft: 20,
  },
  columnDynamicTextTop: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  gridBottom: {
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    elevation: 3,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  rowDetailsBottom: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  columnStaticBottom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '40%',
  },
  columnStaticTextBottom: {
    fontSize: widthToDP('3%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  columnDynamicBottom: {
    paddingHorizontal: widthToDP('3%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  columnDynamicTextBottom: {
    fontSize: 20,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  paymentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightToDP('6%'),
    width: '60%',
    paddingHorizontal: 50,
    marginVertical: 40,
    backgroundColor: '#FF5959',
    borderRadius: 30,
  },
  paymentButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
  },
});
