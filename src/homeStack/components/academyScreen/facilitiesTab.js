import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {widthToDP, heightToDP} from '../../../../services/utils';

const FacilitiesTab = (facilities) => {
  return (
    <View style={styles.tab}>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
        Come and learn from the best coaches trained under world renowned coaches like India's Davis Cup Player, Vijayant Malik & ITF top Ranker Ajay Yadav.
        </Text>
      </View>
      <View style={styles.bulletPoints}>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>4 clay courts of ITF standard</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            Head balls (ITF approved) provided for coaching and matches
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            Customised jerseys are provided after successful course registration
          </Text>
        </View>
      </View>
    </View>
  );
};
export default FacilitiesTab;

const styles = StyleSheet.create({
  tab: {
    // alignItems: 'center',
  },
  description: {
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    // width: '80%',
    marginVertical: widthToDP('4%'),
  },
  descriptionText: {
    textAlign: 'justify',
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    // letterSpacing: 2,
    lineHeight: heightToDP('2.3%'),
  },
  bulletPoints: {
    // width: '80%',
    paddingHorizontal: widthToDP('5%'),
    marginTop: widthToDP('3.5%'),
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: heightToDP('2%'),
  },
  bulletDot: {
    color: '#F17936',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-SemiBold',
    // marginRight: widthToDP('4%'),
  },
  bulletText: {
    // width: '95%',
    marginLeft: widthToDP('3%'),
    textAlign: 'left',
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    // letterSpacing: 1,
  },
});
