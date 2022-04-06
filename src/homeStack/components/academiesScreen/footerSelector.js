import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {heightToDP, widthToDP} from '../../../../services/utils';

const FooterSelector = ({view, setView}) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={view === 'academies' ? styles.activeTabButton : styles.tabButton}
        onPress={() => {
          setView('academies');
        }}>
        <Text
          style={
            view === 'academies'
              ? styles.activeTabButtonText
              : styles.tabButtonText
          }>
          ACADEMIES
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={view === 'trainers' ? styles.activeTabButton : styles.tabButton}
        onPress={() => {
          setView('trainers');
        }}>
        <Text
          style={
            view === 'trainers'
              ? styles.activeTabButtonText
              : styles.tabButtonText
          }>
          TRAINERS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={view === 'pay&play' ? styles.activeTabButton : styles.tabButton}
        onPress={() => {
          setView('pay&play');
        }}>
        <Text
          style={
            view === 'pay&play'
              ? styles.activeTabButtonText
              : styles.tabButtonText
          }>
          PAY & PLAY
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default FooterSelector;
const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: heightToDP('6%'),
    marginTop: heightToDP('2%'),
    overflow: 'hidden',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: '100%',
    borderColor: 'rgba(159, 159, 159, 1)',
    borderBottomWidth: 0.5,
  },
  activeTabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '34%',
    height: '100%',
    borderColor: 'rgba(241, 121, 54, 1)',
    borderBottomWidth: 2,
  },
  tabButtonText: {
    color: 'rgba(94, 94, 94, 1)',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
  },
  activeTabButtonText: {
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
  },
});
