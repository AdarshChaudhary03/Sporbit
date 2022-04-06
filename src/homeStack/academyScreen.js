import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {widthToDP, heightToDP} from '../../services/utils';
import Star from '../../assets/icons/academies/star.svg';
import AcademyTabs from './components/academyScreen/academyTabs';
import AcademyCard from './components/academyScreen/academyCard';
import { getPrevTrials } from '../../services/getters';
import { useEffect, useState } from 'react';

const AcademyScreen = ({route, navigation}) => {
  const {academy, sports} = route.params;
  const [ hasTrial, setHasTrial ] = useState(false);
  const [ trialCompleted, setTrialCompleted ] = useState(false);
  

  useEffect(() => {
    console.log("Ac ID: "+academy.id);
    getPrevTrials(academy.id).then((data) => {
      if(Object.keys(data).length>0){
        setHasTrial(true);
        console.log(data);
        console.log(data[academy.id].status);
        if(data[academy.id].status==='Rejected' || data[academy.id].status==='Approved')
              setTrialCompleted(true);
        else
              setTrialCompleted(false);
      }
      else{
        setHasTrial(false);
      }
});
  });

  window.academyID = academy.id;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <SliderBox
            images={academy.images}
            style={styles.imageView}
            dotStyle={styles.dot}
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.title}>
            <Text style={styles.name}>{academy.name.toUpperCase()}</Text>
            <View style={styles.rating}>
              <Star />
              <Text style={styles.ratingText}>{academy.rating}/5</Text>
            </View>
          </View>
          <AcademyCard academy={academy} />
          <AcademyTabs academy={academy} sports={sports} />
        </View>
      </ScrollView>
      {!trialCompleted ? <TouchableOpacity
        style={styles.booking}
        onPress={() =>          
            hasTrial ? alert('You have already opted for Trial. Kindly visit the academy for the trial.') :
            navigation.navigate('BatchSelectionScreen', {
              academy: academy,
             sports: sports,
              mode: 'trial'
            })
        }>
        <Text style={styles.bookingTextLarge}>BOOK TRIAL</Text>
        <Text style={styles.bookingTextSmall}>(Free Trial)</Text>
      </TouchableOpacity> :
      <TouchableOpacity
        style={styles.booking}
        onPress={() =>
          navigation.navigate('BatchSelectionScreen', {
            academy: academy,
            sports: sports,
            mode: 'booking'
          })
        }>
        <Text style={styles.bookingTextLarge}>BOOK NOW</Text>
        <Text style={styles.bookingTextSmall}>(No Trial)</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default AcademyScreen;
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
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
    color: 'rgba(88, 88, 88, 1)',
    marginLeft: widthToDP('2%'),
  },
  booking: {
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: heightToDP('1%'),
    paddingHorizontal: widthToDP('10%'),
    backgroundColor: '#F17936',
    marginVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
  },
  bookingTextLarge: {
    fontSize: widthToDP('6%'),
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
  },
  bookingTextSmall: {
    fontSize: widthToDP('5%'),
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
  },
});
