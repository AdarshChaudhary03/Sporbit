/**
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import {Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/BottomTab';
import AcademiesScreen from './src/homeStack/academiesScreen';
import AcademyScreen from './src/homeStack/academyScreen';
import BatchSelectionScreen from './src/homeStack/batchSelectionScreen';
import ConfirmationScreen from './src/homeStack/confirmationScreen';
import CourseScreen from './src/coursesStack/courseScreen';
import CalendarScreen from './src/coursesStack/calendarScreen';
import PlayerEditScreen from './src/profileStack/playerEditScreen';
import PlayerStatsScreen from './src/profileStack/playerStatsScreen';
import PaymentScreen from './src/profileStack/settings/paymentScreen';
import PaymentDetailScreen from './src/profileStack/settings/paymentDetailScreen';
import ReferAndEarn from './src/profileStack/settings/referAndEarn';
import HelpAndSupport from './src/profileStack/settings/helpAndSupport';
import HelpAndSupportDetails from './src/profileStack/settings/helpAndSupportDetails';
import Subscriptions from './src/profileStack/settings/subscriptions';
import BookingsScreen from './src/profileStack/settings/bookingsScreen';
import SubscriptionDetails from './src/profileStack/settings/subscriptionDetails';
import RootStackScreen from './src/rootStackScreen';
import SplashScreen from 'react-native-splash-screen';
import firebaseSetup from './services/setup';
import {AppContextProvider} from './services/appContext';
// import firebase from '@react-native-firebase/app';
import UserNameScreen from './src/rootStack/userNameScreen';
import {reactNavigation, pushNotifications, sentry} from './services/index';
import FacilityScreen from './src/homeStack/facilityScreen';
import {updateUser} from './services/setters';
import FacilitySlotSelection from './src/homeStack/facilitySlotSelection';
import SettingsScreen from './src/profileStack/settings/settingsScreen';
import EditProfileScreen from './src/profileStack/editProfileScreen';
import LayOffScreen from './src/profileStack/settings/layOffScreen';
pushNotifications.configure();
pushNotifications.getChannels();
const Stack = createStackNavigator();
const {auth, messaging, firestore} = firebaseSetup();

async function saveTokenToDatabase(token) {
  const user = auth().currentUser;
  if (!user || !user.displayName) {
    return true;
  }
  await updateUser({
    tokens: firestore.FieldValue.arrayUnion(token),
  });
}

messaging().setBackgroundMessageHandler((remoteMessage) => {
  console.log('Handling background message ', remoteMessage);
  return Promise.resolve();

  // return self.registration.showNotification(payload.data.title, {
  //   body: payload.data.body,
  //   icon: payload.data.icon,
  //   tag: payload.data.tag,
  //   data: payload.data.link
  // });
});
const App = () => {
  console.log('App.js started');
  SplashScreen.hide();
  const [user, setUser] = useState();

  const [initialRoute, setInitialRoute] = useState('BottomTab');
  // const functions = firebase.app().functions('asia-south1');

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
  }
  Text.defaultProps.allowFontScaling = false;
  
  const onAuthStateChanged = useCallback(async (route) => {
    setInitialRoute(route);
    setUser(auth().currentUser);
    console.log('AuthStateChanged');
    console.log('CurrentUser', auth().currentUser);
  }, []);

  useEffect(() => {
    console.log('Entered useEffect 2');
    messaging().onTokenRefresh((token) => {
      console.log('Entered useEffect 21111');
      //      saveTokenToDatabase(token).then();
    });
    // Get the device token

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
  }, [user]);



  useEffect(() => {
    console.log('Entered useEffect 1');
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage);
      if (remoteMessage) {
        reactNavigation.navigate(remoteMessage.data.screen, {
          ...remoteMessage.data,
        });
      }
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(remoteMessage);
        if (remoteMessage) {
          reactNavigation.navigate(remoteMessage.data.screen, {
            ...remoteMessage.data,
          });
        }
      });  
    auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  }, [onAuthStateChanged]);


  if (!user) {
    return <RootStackScreen />;
  }
  if (!user.displayName) {
    return <UserNameScreen onAuthStateChanged={onAuthStateChanged} />;
  }

  return (
    <AppContextProvider user={user}>
      <NavigationContainer
        ref={reactNavigation.navigation}
        onReady={() => {
          reactNavigation.isNavigationReady.current = true;
          sentry.routingInstrumentation.registerNavigationContainer(
            reactNavigation.navigation,
          );
        }}>
        <StatusBar hidden />
        <Stack.Navigator headerMode="none" initialRouteName={initialRoute}>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="AcademiesScreen" component={AcademiesScreen} />
          <Stack.Screen name="AcademyScreen" component={AcademyScreen} />
          <Stack.Screen name="FacilityScreen" component={FacilityScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
            name="FacilitySlotSelection"
            component={FacilitySlotSelection}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
          />
          <Stack.Screen
            name="BatchSelectionScreen"
            component={BatchSelectionScreen}
          />
          <Stack.Screen
            name="PlayerStatsScreen"
            component={PlayerStatsScreen}
          />
          <Stack.Screen name="PlayerEditScreen" component={PlayerEditScreen} />
          <Stack.Screen name="CourseScreen" component={CourseScreen} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen
            name="PaymentDetailScreen"
            component={PaymentDetailScreen}
          />
          <Stack.Screen
            name={'EditProfileScreen'}
            component={EditProfileScreen}
          />
          <Stack.Screen name="ReferAndEarn" component={ReferAndEarn} />
          <Stack.Screen name="Subscriptions" component={Subscriptions} />
          <Stack.Screen name="LayOffScreen" component={LayOffScreen} />
          <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
          <Stack.Screen
            name="HelpAndSupportDetails"
            component={HelpAndSupportDetails}
          />
          <Stack.Screen
            name="SubscriptionDetails"
            component={SubscriptionDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
