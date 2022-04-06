import React from 'react';
import HomeScreen from './homeStack/homeScreen';
import CoursesScreen from './coursesStack/coursesScreen';
import CommunityScreen from './communityScreen';
import ProfileScreen from './profileStack/profileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StyleSheet} from 'react-native';
import {heightToDP} from '../services/utils';
import CoursesTab from '../assets/icons/bottomTab/coursesTab.svg';
import ActiveCoursesTab from '../assets/icons/bottomTab/activeCoursesTab.svg';
import ProfileTab from '../assets/icons/bottomTab/profileTab.svg';
import ActiveProfileTab from '../assets/icons/bottomTab/activeProfileTab.svg';
import HomeTab from '../assets/icons/bottomTab/homeTab.svg';
import ActiveHomeTab from '../assets/icons/bottomTab/activeHomeTab.svg';
import CommunityTab from '../assets/icons/bottomTab/communityTab.svg';
import ActiveCommunityTab from '../assets/icons/bottomTab/activeCommunityTab.svg';
//import {DataStore} from '@aws-amplify/datastore';
//import {User} from './models';
//import Amplify from 'aws-amplify';
//import awsExports from './aws-exports';
//Amplify.configure(awsExports);

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  // DataStore.save(
  //   new User({
  //     name: 'Lorem ipsum dolor sit amet',
  //     phone: 'Lorem ipsum dolor sit amet',
  //   }),
  // );
  // const [initializing, setInitializing] = useState(true);
  return (
    <Tab.Navigator
      activeColor="#F17936"
      inactiveColor="#fff"
      tabBarOptions={{
        showLabel: false,
        // showIcon: true,
      }}
      backBehavior="initialRoute"
      barStyle={styles.color}>
      {/*barStyle={[styles.color, {height: initializing ? 0 : null}]}>*/}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => {
            if (color === '#fff') {
              return <HomeTab />;
            } else {
              return <ActiveHomeTab />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({color}) => {
            if (color === '#fff') {
              return <CoursesTab />;
            } else {
              return <ActiveCoursesTab />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({color}) => {
            if (color === '#fff') {
              return <CommunityTab />;
            } else {
              return <ActiveCommunityTab />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => {
            if (color === '#fff') {
              return <ProfileTab />;
            } else {
              return <ActiveProfileTab />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTab;
const styles = StyleSheet.create({
  color: {
    backgroundColor: '#1C2657',
    height: heightToDP('8%'),
    justifyContent: 'center',
  },
  tabImage: {
    marginBottom: heightToDP('10%'),
  },
});
