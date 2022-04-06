import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {heightToDP, widthToDP} from '../../../../services/utils';
import FacilitiesTab from './facilitiesTab';
import CoachesTab from './coachesTab';
import RulesTab from './rulesTab';
import ReviewsTab from './reviewsTab';

const Tab = createMaterialTopTabNavigator();

const AcademyTabs = ({academy, sports}) => {
  console.log("Sport Updated: "+sports.uid);
  return (
    <View style={styles.tabs}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          swipeEnabled={false}
          backBehavior="none"
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: '#5E5E5E',
            upperCaseLabel: false,
            labelStyle: {
              textTransform: 'none',
              fontSize: widthToDP('3.0%'),
            },
            indicatorStyle: {
              backgroundColor: '#F17936',
              borderRadius: widthToDP('2%'),
            },
            style: {
              backgroundColor: '#F2F2F2',
            },
          }}>
          <Tab.Screen
            name="FACILITIES"
            component={FacilitiesTab}
            initialParams={{facilities: academy.facilities}}
          />
          <Tab.Screen name="COACHES" component={CoachesTab} initialParams={{sports: sports}}/>
          <Tab.Screen name="RULES" component={RulesTab} />
          <Tab.Screen name="REVIEWS" component={ReviewsTab} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AcademyTabs;

const styles = StyleSheet.create({
  tabs: {
    height: heightToDP('50%'),
  },
});
