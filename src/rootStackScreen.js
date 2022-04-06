import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from './rootStack/splashScreen';
import LoginScreen from './rootStack/loginScreen';
import {StatusBar} from 'react-native';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
