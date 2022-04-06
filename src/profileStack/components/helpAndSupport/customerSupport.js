import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/header';
import {heightToDP, widthToDP} from '../../../../services/utils';
export default function HelpAndSupportDetails() {
  return (
    <ScrollView>
      <Header text={'Customer Support'} />
      <View style={styles.itemRow}>
        <Text style={styles.itemRowTextMain}>
          For any queries:{'\n\n'}
          You can mail us your queries at:{'  '}
          <Text style={styles.themeColor}>info@sporbit.in{'\n\n'}</Text>
          Alternately, you can also call us at
          <Text style={styles.themeColor}>+91 8448495757</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  itemRow: {
    marginVertical: heightToDP('10%'),
    paddingVertical: heightToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
  },
  itemRowTextMain: {
    letterSpacing: 1,
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('3%'),
  },
  themeColor: {
    color: '#FF5959',
  },
});
