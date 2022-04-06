import * as React from 'react';
import {useState} from 'react';
import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {uploadUserProfileImage, addUser} from '../../services/setters';
import firebaseSetup from '../../services/setup';
import {GoogleSignin} from '@react-native-community/google-signin';
import {heightToDP, widthToDP} from '../../services/utils';

GoogleSignin.configure({
  webClientId:
    '344692318079-grlu6kcnnc951ssaf4hok4fj10imbaf6.apps.googleusercontent.com',
});
const {auth} = firebaseSetup();

const UserNameScreen = (props) => {
  const {onAuthStateChanged} = props;
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [activity, setActivity] = useState(false);
  const setUserData = async (provider) => {
    let update = {};
    if (provider === null) {
      update = {
        displayName: userName,
      };
      await auth().currentUser.updateProfile(update);
      console.log(auth().currentUser.toJSON());
    }
    if (provider === 'google.com') {
      let imageFile = '';
      let name = '';
      await auth().currentUser.toJSON();
      // .providerData.forEach((user) => {
      //   if (user.providerId === provider) {
      //     name = user.displayName;
      //   }
      // });
      await uploadUserProfileImage(imageFile, 'url');
      update = {
        displayName: name,
      };
      await auth().currentUser.updateProfile(update);
      console.log(JSON.stringify(auth().currentUser.toJSON(), null, 2));
    }
    if (provider === 'facebook.com') {
      console.log(auth().currentUser.providerData);
      await auth().currentUser.toJSON();
      // .providerData.forEach((user) => {
      //   if (user.providerId === provider) {
      //     update = {
      //       displayName: user.displayName,
      //     };
      //   }
      // });
      console.log(update);
      await auth().currentUser.updateProfile(update);
      console.log(auth().currentUser.toJSON());
    }
    await addUser();
    onAuthStateChanged();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/appB.png')}
          style={styles.logo}>
          <Animatable.Image
            // animation=""
            // duration="1000"
            style={styles.titleLogo}
            resizeMode="center"
            source={require('../../assets/images/splash_title.png')}
          />
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Welcome to Sporbit</Text>
        <Text style={styles.text_footer}>What should we call you?</Text>

        <View style={styles.action}>
          <TextInput
            onChangeText={(text) => setUserName(text)}
            style={styles.textInput}
            autoCapitalize={'words'}
            underlineColorAndroid="#f000"
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              if (!userName) {
                setError('Please enter your name');
              } else {
                Keyboard.dismiss();
                setActivity(true);
                setUserData(null).then(() => {});
              }
            }}
            style={styles.signIn}>
            <Text style={styles.buttonText}> Continue </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorMsg}>{error}</Text>
        {/*<View style={styles.socialMedTextView}>*/}
        {/*  <Text style={styles.socialMedText}>OR CONTINUE WITH</Text>*/}
        {/*</View>*/}

        {/*<View style={styles.socialMedia}>*/}
        {/*  <View style={styles.socialMediaButton}>*/}
        {/*    <TouchableOpacity*/}
        {/*      style={styles.FacebookButton}*/}
        {/*      onPress={() => {*/}
        {/*        loginGoogle().then(() => {*/}
        {/*          setActivity(true);*/}
        {/*          setUserData('google.com').then(() => {*/}
        {/*            Toast.show("You've logged in from Google");*/}
        {/*          });*/}
        {/*        });*/}
        {/*      }}>*/}
        {/*      <Image*/}
        {/*        source={{*/}
        {/*          uri: 'https://img-authors.flaticon.com/google.jpg',*/}
        {/*        }}*/}
        {/*        style={styles.FacebookIcon}*/}
        {/*      />*/}
        {/*      <Text style={styles.FacebookButtonText}>LINK GOOGLE</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*  <View style={styles.socialMediaButton}>*/}
        {/*    <TouchableOpacity*/}
        {/*      style={styles.FacebookButton}*/}
        {/*      onPress={() => {*/}
        {/*        setActivity(true);*/}
        {/*        loginFacebook().then((image) => {*/}
        {/*          setUserData('facebook.com').then(() => {*/}
        {/*            Toast.show("You've logged in from Facebook");*/}
        {/*          });*/}
        {/*        });*/}
        {/*      }}>*/}
        {/*      <Image*/}
        {/*        source={{*/}
        {/*          uri:*/}
        {/*            'https://www.sharethis.com/wp-content/uploads/2017/11/Facebook-share-icon.png',*/}
        {/*        }}*/}
        {/*        style={styles.FacebookIcon}*/}
        {/*      />*/}
        {/*      <Text style={styles.FacebookButtonText}>LINK FACEBOOK</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  </View>*/}
        {/*</View>*/}

        <ActivityIndicator animating={activity} size={50} color="#ff6362" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserNameScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  socialMedTextView: {
    width: '100%',
    height: 40,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMedText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    color: '#707070',
    fontWeight: 'bold',
  },
  socialMedia: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  socialMediaButton: {
    backgroundColor: '#fff',
    height: heightToDP('5%'),
    width: '48%',
    marginHorizontal: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    borderRadius: heightToDP('2.5%'),
  },
  FacebookButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  FacebookIcon: {
    width: widthToDP('7%'),
    height: widthToDP('7%'),
    borderRadius: widthToDP('3.5%'),
    marginHorizontal: 10,
  },
  FacebookButtonText: {
    color: '#292929',
    fontSize: widthToDP('3%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
  },
  text_footer: {
    color: '#05375a',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
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
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  errorMsg: {
    color: '#707070',
    fontSize: widthToDP('3%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  titleLogo: {
    flex: 1,
    marginTop: heightToDP('10%'),
    width: widthToDP('80%'),
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ff6362',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    fontSize: widthToDP('4%'),
    fontWeight: 'bold',
  },
});
