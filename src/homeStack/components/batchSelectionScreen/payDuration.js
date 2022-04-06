import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthToDP, heightToDP} from '../../../../services/utils';

const PayDuration = ({payDuration, setPayDuration}) => {
  return (
    <View style={styles.payDurationSelection}>
      <View style={styles.planHeaderRow}>
        <Text style={styles.tabHeaderText}>Plan</Text>
      </View>
      <View style={styles.payDurationSelectionTabs}>
        <TouchableOpacity
          onPress={() => {
            setPayDuration('Monthly');
          }}
          style={
            payDuration === 'Monthly'
              ? styles.activeLevelOptions
              : styles.payDurationOptions
          }>
          <Text
            style={
              payDuration === 'Monthly' ? styles.activeTabText : styles.tabText
            }>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPayDuration('Quarterly');
          }}
          style={
            payDuration === 'Quarterly'
              ? styles.activeLevelOptions
              : styles.payDurationOptions
          }>
          <Text
            style={
              payDuration === 'Quarterly'
                ? styles.activeTabText
                : styles.tabText
            }>
            Quarterly
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.payDurationSelectionTabs}>
        <TouchableOpacity
          onPress={() => {
            setPayDuration('Half Yearly');
          }}
          style={
            payDuration === 'Half Yearly'
              ? styles.activeLevelOptions
              : styles.payDurationOptions
          }>
          <Text
            style={
              payDuration === 'Half Yearly'
                ? styles.activeTabText
                : styles.tabText
            }>
            Half Yearly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={false}
          onPress={() => {
            setPayDuration('Yearly');
          }}
          style={
            payDuration === 'Yearly'
              ? styles.activeLevelOptions
              : styles.payDurationOptions
          }>
          <Text
            style={
              payDuration === 'Yearly' ? styles.activeTabText : styles.tabText
            }>
            Yearly
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PayDuration;
const styles = StyleSheet.create({
  planHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginBottom: heightToDP('3%'),
    width: widthToDP('60%'),
    justifyContent: 'center',
  },
  tabHeaderText: {
    fontSize: widthToDP('5.5%'),
    fontFamily: 'Gilroy-Regular',
    // letterSpacing: 1,
    marginBottom: heightToDP('1.5%'),
    marginRight: widthToDP('2%'),
    fontWeight: 'bold',
  },
  activeTabText: {
    fontSize: widthToDP('5%'),
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    // letterSpacing: 1,
  },
  tabText: {
    fontSize: widthToDP('5%'),
    color: 'rgba(94, 94, 94, 1)',
    fontFamily: 'Gilroy-Regular',
    // letterSpacing: 1,
  },
  payDurationSelection: {
    justifyContent: 'center',
    marginTop: heightToDP('4%'),
    alignItems: 'center',
  },
  payDurationSelectionTabs: {
    height: heightToDP('7%'),
    width: widthToDP('90%'),
    marginBottom: heightToDP('2%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  payDurationOptions: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('42%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    // marginHorizontal: widthToDP('3%'),
    borderRadius: widthToDP('5%'),
    borderWidth: 1,
    borderColor: '#ffff',
  },
  activeLevelOptions: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('42%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    // marginHorizontal: widthToDP('3%'),
    borderWidth: 1,
    borderRadius: widthToDP('5%'),
    // flexDirection: 'row',
    borderColor: '#ff6362',
  },
});
