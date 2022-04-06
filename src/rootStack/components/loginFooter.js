import * as React from 'react';
import {useState} from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import {View, TextInput, KeyboardAvoidingView} from 'react-native';
import firebaseSetup from '../../../services/setup';
import {heightToDP, widthToDP} from '../../../services/utils';

const LoginFooter = () => {
  const [error, setError] = useState('');
  const {auth} = firebaseSetup();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activity, setActivity] = useState(false);

  const signInWithPhoneNumber = async () => {
    if (phoneNumber.length !== 13) {
      setError('Please enter a valid Phone Number');
      return;
    }
    Keyboard.dismiss();
    setActivity(true);

    setError('');
    console.log(phoneNumber);
    console.log("Entered");
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("Confirmation: "+confirmation);
    setConfirm(confirmation);
    setActivity(false);
  };

  const confirmCode = async () => {
    console.log('Entered confirmCode(0 function');
    Keyboard.dismiss();
//    setActivity(true);
    try {
      console.log('Entered confirmCode(0 function 2');
      setError('');
      const confirmCode = await confirm.confirm(code);
 //     setActivity(false);
      Toast.show('You are logged in.');
      console.log('Entered confirmCode(0 function 3');
    } catch (err) {
      setError('Invalid OTP');
      setActivity(false);
    }
  };

  // const testRobo = async () =>{
  //   setPhoneNumber('+919999999999')
  //   setCode('999999')
  //   await signInWithPhoneNumber();
  //   await confirmCode()
  // }
  //
  // useEffect(()=>{testRobo()},[])

  if (!confirm) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Please Log in</Text>
          <View style={styles.action}>
            <TextInput
              onChangeText={(text) => setPhoneNumber('+91' + text)}
              style={styles.textInput}
              keyboardType="numeric"
              underlineColorAndroid="#f000"
              placeholder="Enter Phone Number"
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => signInWithPhoneNumber()}
              style={styles.signIn}>
              <Text style={styles.textSign}> Get OTP </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.errorMsg}>
            <Text> {error} </Text>
          </View>
          <ActivityIndicator animating={activity} size={50} color="#ff6362" />
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Please Log in</Text>
        <View style={styles.action}>
          <TextInput
            value={code}
            onChangeText={(text) => setCode(text)}
            keyboardType="numeric"
            style={styles.textInput}
            underlineColorAndroid="#f000"
            placeholder="Enter OTP"
          />
        </View>

        {activity ? (
          <ActivityIndicator animating={activity} size={50} color="#ff6362" />
        ) : (
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => confirmCode()}
              style={styles.signIn}>
              <Text style={styles.textSign}> Submit OTP </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.errorMsg}> {error} </Text>
      </View>
    </View>
  );
};
export default LoginFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
    color: '#05375a',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
    alignItems: 'center',
    paddingBottom: 50,
  },
  titleLogo: {
    flex: 1,
    marginTop: 100,
    width: widthToDP('80%'),
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff6362',
  },
  textSign: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
