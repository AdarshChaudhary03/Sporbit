import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const configure = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      // console.log('TOKEN:', token);
    },
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // console.log('NOTIFICATION:', notification);
      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID: '344692318079',
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // console.log('ACTION:', notification.action);
      // console.log('NOTIFICATION ACTION:', notification);
      // process the action
    },
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
};

// console.log('Just before get channels');
const getChannels = () => {
  let channels = [];
  PushNotification.getChannels((channelIDs) => {
    console.log('channels',channelIDs)
    if (!channelIDs.includes('LastPageDefault')) {
      addDefaultChannel();
    }
  });
  return channels;
};

const addDefaultChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'LastPageDefault',
      channelName: 'Default Channel',
      channelDescription: 'A channel which is default',
      playSound: true,
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`${created.channelName} created.`),
  );
};

const localNotification = (details)=> {
  PushNotification.localNotificationSchedule(details)
}

export {configure, addDefaultChannel, getChannels, localNotification};
