/**
 * @format
 */
console.log('Absolute start');
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const backgroundNotificationHandler = async () => {
  console.log('Received Background Notification', ':satellite:');
  return Promise.resolve();
};
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => backgroundNotificationHandler,
);
AppRegistry.registerComponent(appName, () => App);
