import Toast from 'react-native-simple-toast';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as React from 'react';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebaseSetup from '../../../../services/setup';
const {auth} = firebaseSetup();

const SignOut = () => {
  const isGoogleSignedIn = async () => {
    return await GoogleSignin.isSignedIn();
  };
  const isFBLoggedIn = () => {
    return AccessToken.getCurrentAccessToken() != null;
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      if (isFBLoggedIn()) {
        await LoginManager.logOut();
      }
      if (await isGoogleSignedIn()) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity
      style={styles.signOut}
      onPress={() => {
        signOut().then(() => {
          Toast.show('You are logged out.');
        });
      }}>
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: '#FF5959',
    paddingVertical: heightToDP('1.1%'),
    paddingHorizontal: widthToDP('17%'),
    margin: 40,
    alignItems: 'center',
    borderRadius: 25,
    elevation: 5,
  },
  signOutText: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
