import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Location from '../../../../assets/icons/academies/location.svg';
import Clock from '../../../../assets/icons/academies/clock.svg';
import Star from '../../../../assets/icons/academies/star.svg';
import HandWash from '../../../../assets/icons/academy/handWash.svg';
import * as React from 'react';
import {heightToDP, widthToDP} from '../../../../services/utils';

const AcademyCard = ({academy}) => {
  const locationPressed = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${academy.latitude},${academy.longitude}`;
    const label = academy.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url).then((r) => console.log(r));
  };

  return (
    <View style={styles.details}>
      <View style={styles.detailsLine}>
        <Location />
        <TouchableOpacity onPress={() => locationPressed()}>
          <Text numberOfLines={2} style={styles.textDetailsUnderline}>
            {academy.address}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsLine}>
        <Clock />
        <View>
          <Text style={styles.textDetails}>
            Mon-Sat 4pm - 7pm{'\n'}Sun Closed
          </Text>
        </View>
      </View>
      <View style={styles.detailsLine}>
        <Star />
        <Text style={styles.textDetails}>{academy.description}</Text>
      </View>
      <View style={styles.detailsLine}>
        <HandWash />
        <Text style={styles.textDetails}>
          Proper Hygiene standards{'\n'}Coaches sanitized before all classes
        </Text>
      </View>
    </View>
  );
};

export default AcademyCard;
const styles = StyleSheet.create({
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
  },
  textDetailsUnderline: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    marginLeft: widthToDP('2%'),
    textDecorationLine: 'underline',
  },
});
