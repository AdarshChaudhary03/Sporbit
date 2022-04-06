import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Subscription from '../../../../assets/icons/profile/footer/subscription.svg';
import Payments from '../../../../assets/icons/profile/footer/payments.svg';
import Booking from '../../../../assets/icons/profile/footer/booking.svg';
import Discount from '../../../../assets/icons/profile/footer/discount.svg';
import Setting from '../../../../assets/icons/profile/footer/setting.svg';
import HelpAndSupport from '../../../../assets/icons/profile/footer/helpAndSupport.svg';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {reactNavigation} from '../../../../services';

const Settings = () => {
  return (
    <View style={styles.settings}>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('Subscriptions')}>
        <Subscription />
        <Text style={styles.settingsTabText}>Subscriptions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('PaymentScreen')}>
        <Payments />
        <Text style={styles.settingsTabText}>Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('BookingsScreen')}>
        <Booking />
        <Text style={styles.settingsTabText}>Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('ReferAndEarn')}>
        <Discount />
        <Text style={styles.settingsTabText}>Avail Discount</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('SettingsScreen')}>
        <Setting />
        <Text style={styles.settingsTabText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsTab}
        onPress={() => reactNavigation.navigate('HelpAndSupport')}>
        <HelpAndSupport />
        <Text style={styles.settingsTabText}>Help & Support</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  settings: {
    paddingTop: heightToDP('1%'),
    paddingBottom: heightToDP('5%'),
    alignSelf: 'center',
  },
  settingsTab: {
    width: widthToDP('65%'),
    alignItems: 'center',
    marginRight: widthToDP('10%'),
    paddingVertical: heightToDP('1%'),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  settingsTabText: {
    marginVertical: heightToDP('1.5%'),
    fontSize: widthToDP('5%'),
    color: '#2C2C2C',
    fontFamily: 'Gilroy-Regular',
    marginLeft: widthToDP('8%'),
  },
  settingsTabArrow: {
    marginVertical: 15,
    fontSize: 16,
    color: '#ff6362',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    textAlign: 'right',
  },
});
