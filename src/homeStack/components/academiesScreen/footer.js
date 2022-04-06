import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getDistance} from 'geolib';
import {useCallback, useContext, useEffect, useState} from 'react';

import {getAcademies, getFacilities} from '../../../../services/getters';
import {locationService} from '../../../../services';
import {AppContext} from '../../../../services/appContext';
import {heightToDP, widthToDP} from '../../../../services/utils';

import ItemRenderer from './itemRenderer';
import FooterSkeleton from './footerSkeleton';
import firebaseSetup from '../../../../services/setup';
const {auth} = firebaseSetup();

const Footer = ({view, sports}) => {
  const {user, updateUserLocationContext} = useContext(AppContext);
  const [academies, setAcademies] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [userLocation, setUserLocation] = useState(user.location);
  const [initializing, setInitializing] = useState(true);

  const Start = useCallback(async () => {
    const facilitiesData = await getFacilities(sports.name);
    console.log('facilitiesData',facilitiesData);
    setFacilities(facilitiesData);
    const academiesData = await getAcademies(sports);
    setAcademies(academiesData);
    const location = await locationService.getLocation();
    console.log('location',location);
    setUserLocation(location);
    await updateUserLocationContext(location);
    setInitializing(false);
  }, [sports.name, updateUserLocationContext]);

  useEffect(Start, [Start]);

  const distanceToUser = async (academy) => {
    if(userLocation==null){
      console.log('ENtered here............');
//      await auth().signOut();
    }
    return getDistance(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      {
        latitude: academy.location.latitude,
        longitude: academy.location.longitude,
      },
    );
  };
  if (initializing) {
    return <FooterSkeleton />;
  }

  if (view === 'academies') {
    return (
      <View style={styles.list}>
        {academies
          .sort((a, b) => {
            return distanceToUser(a) - distanceToUser(b);
          })
          .map((academy) => {
            academy.distanceToUser = distanceToUser(academy);
            console.log(academy.distanceToUser);
            return <ItemRenderer key={academy.id} view={view} sports={sports} item={academy} />;
          })}
      </View>
    );
  }
  if (view === 'trainers') {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyViewText}>Coming Soon</Text>
      </View>
    );
  }
  if (view === 'pay&play') {
    return (
      <View style={styles.list}>
        {facilities
          .sort((a, b) => {
            return distanceToUser(a) - distanceToUser(b);
          })
          .map((facility) => {
            facility.distanceToUser = distanceToUser(facility);
            return (
              <ItemRenderer key={facility.id} item={facility} view={view} />
            );
          })}
      </View>
    );
  }
};
export default Footer;

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    alignSelf: 'center',
  },
  emptyViewText: {
    marginTop: heightToDP('20%'),
    fontSize: widthToDP('6%'),
  },
});
