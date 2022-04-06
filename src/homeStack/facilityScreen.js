import * as React from 'react';
import {useEffect} from 'react';
import {
  Platform,
  Linking,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FacilitiesTab from './components/academyScreen/facilitiesTab';
import RulesTab from './components/academyScreen/rulesTab';
import {widthToDP, heightToDP} from '../../services/utils';
import Star from '../../assets/icons/academies/star.svg';
import Clock from '../../assets/icons/academies/clock.svg';
import Location from '../../assets/icons/academies/location.svg';
import HandWash from '../../assets/icons/academy/handWash.svg';
const Tab = createMaterialTopTabNavigator();

export default function FacilityScreen({route, navigation}) {
  const {facility} = route.params;
  const {safety} = facility;
  useEffect(() => {
    LogBox.ignoreLogs(['Non-serializable']);
  }, []);

  const locationPressed = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${facility.latitude},${facility.longitude}`;
    const label = facility.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url).then();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <SliderBox
            images={facility.images}
            style={styles.imageView}
            dotStyle={styles.dot}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.title}>
            <Text style={styles.name}>{facility.name.toUpperCase()}</Text>
            <View style={styles.rating}>
              <Star />
              <Text style={styles.ratingText}>{facility.rating}/5</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.detailsLine}>
              <Location />
              <TouchableOpacity onPress={() => locationPressed()}>
                <Text
                  numberOfLines={2}
                  style={[styles.textDetails, styles.underline]}>
                  {facility.address}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.detailsLine}>
              <Clock />
              <View>
                <Text style={styles.textDetails}>
                  Mon-Sat 8am - 12pm{'\n'}Sun Closed
                </Text>
              </View>
            </View>
            <View style={styles.detailsLine}>
              <Star />
              <Text style={styles.textDetails}>{facility.description}</Text>
            </View>
            <View style={styles.detailsLine}>
              <HandWash />
              <Text style={styles.textDetails}>{safety}</Text>
            </View>
          </View>
          <View style={styles.tabs}>
            <NavigationContainer independent={true}>
              <Tab.Navigator
                backBehavior="none"
                tabBarOptions={{
                  activeTintColor: 'black',
                  inactiveTintColor: '#5E5E5E',
                  upperCaseLabel: false,
                  labelStyle: {
                    textTransform: 'none',
                    fontSize: widthToDP('3.5%'),
                  },
                  indicatorStyle: {
                    // fontFamily:'Gilroy-SemiBold',
                    // height: '100%',
                    // marginHorizontal: -widthToDP('3.5%'),
                    // width: widthToDP('33%'),
                    backgroundColor: '#FF5959',
                    borderRadius: widthToDP('2%'),
                  },
                  style: {
                    backgroundColor: '#F2F2F2',
                  },
                }}>
                <Tab.Screen
                  name="FACILITIES"
                  component={FacilitiesTab}
                  initialParams={{facilities: facility.facilities}}
                />
                <Tab.Screen name="RULES" component={RulesTab} />
              </Tab.Navigator>
            </NavigationContainer>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.booking}
        onPress={() => {
          navigation.navigate('FacilitySlotSelection', {
            facility: facility,
          });
        }}>
        <Text style={styles.bookingTextLarge}>BOOK NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingBottom: heightToDP('10%'),
  },
  imageView: {
    width: widthToDP('100%'),
    height: heightToDP('35%'),
  },
  dot: {
    marginBottom: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: heightToDP('1%'),
  },
  name: {
    fontSize: widthToDP('6%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('0.5%'),
    // letterSpacing: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 10,
  },
  ratingText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
    color: 'rgba(88, 88, 88, 1)',
    marginLeft: widthToDP('2%'),
  },
  details: {
    margin: widthToDP('4%'),
    justifyContent: 'space-between',
    borderRadius: widthToDP('4%'),
    backgroundColor: 'white',
    elevation: 3,
    padding: widthToDP('3%'),
  },
  detailsLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightToDP('1.5%'),
  },
  textDetails: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    marginLeft: widthToDP('2%'),
    width: widthToDP('80%'),
  },
  tabs: {
    height: heightToDP('50%'),
  },
  tabViews: {
    borderBottomColor: '#ff6362',
    borderBottomWidth: 1,
    height: heightToDP('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  booking: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: heightToDP('2.5%'),
    paddingHorizontal: widthToDP('10%'),
    backgroundColor: '#FF5959',
    marginVertical: heightToDP('5%'),
    borderRadius: widthToDP('5%'),
    // color: '#fff',
  },
  bookingTextLarge: {
    fontSize: widthToDP('5%'),
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    // letterSpacing: 2,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
