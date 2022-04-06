import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {widthToDP, heightToDP} from '../../../../services/utils';

const RulesTab = () => {
  return (
    <View style={styles.tab}>
      <View style={styles.bulletPoints}>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            No entry after 5 minutes from start of Class (We do this to ensure
            safety and reduce injuries, the warm up starts after 5 minutes of
            class start)
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            Sports shoes and attire mandatory - Non marking shoes preferred
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            Students should bring their own racquet (Sporbit racquet available
            during trial period)
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>{'\u2B24'}</Text>
          <Text style={styles.bulletText}>
            Tennis balls and other training material is provided
          </Text>
        </View>
      </View>
    </View>
  );
};
export default RulesTab;

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },
  bulletPoints: {
    paddingVertical: widthToDP('5%'),
    marginHorizontal: widthToDP('2%'),
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: heightToDP('2%'),
    paddingHorizontal: widthToDP('2%'),
  },
  bulletDot: {
    color: '#FF5959',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginRight: widthToDP('3%'),
  },
  bulletText: {
    width: widthToDP('85%'),
    textAlign: 'left',
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
  },
});
