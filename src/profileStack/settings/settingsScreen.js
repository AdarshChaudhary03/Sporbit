import React, {useState} from 'react';
import {
  Linking,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header';
let pkg = require('../../../package.json');
import Expand from '../../../assets/icons/courses/expand.svg';

const SettingsScreen = () => {
  const [view, setView] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationExpanded, setNotificationExpanded] = useState(false);

  const Footer = () => {
    return (
      <View style={styles.footer}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{flexDirection: 'row', margin: heightToDP('1%')}}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.mylastpage.in/terms')}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: widthToDP('3.5%'),
                fontFamily: 'Gilroy-SemiBold',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              padding: 1,
              fontSize: widthToDP('3.5%'),
              fontFamily: 'Gilroy-Regular',
            }}>
            {' '}
            and{' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.mylastpage.in/privacy')
            }>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontSize: widthToDP('3.5%'),
                fontFamily: 'Gilroy-SemiBold',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{color: '#7A7A7A'}}>App Version {pkg.version}</Text>
      </View>
    );
  };
  if (view === 'privacy') {
    return (
      <View style={styles.container}>
        <Header text={'Settings'} backPressed={() => setView('')} />
        <View style={styles.body}>
          <View style={styles.itemRow}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{flexDirection: 'row', width: '100%'}}>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text style={[styles.itemRowTextMain, {flex: 1}]}>
                Location Access
              </Text>
              <Switch
                value={locationEnabled}
                thumbColor={'#FF0000'}
                onValueChange={() => setLocationEnabled(!locationEnabled)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => setNotificationExpanded(!notificationExpanded)}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text style={[styles.itemRowTextMain, {flex: 1}]}>
                Notifications
              </Text>
              <Expand />
            </View>
            {notificationExpanded && (
              <View>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: widthToDP('10%'),
                  }}>
                  <Text
                    style={[
                      styles.itemRowTextMain,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {flex: 1, fontSize: widthToDP('4.5%')},
                    ]}>
                    Players Update
                  </Text>
                  <Switch
                    value={true}
                    thumbColor={'#FF0000'}
                    onChange={() => Toast.show('Coming Soon')}
                  />
                </View>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingLeft: widthToDP('10%'),
                  }}>
                  <Text
                    style={[
                      styles.itemRowTextMain,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {flex: 1, fontSize: widthToDP('4.5%')},
                    ]}>
                    Discount In Use
                  </Text>
                  <Switch
                    value={true}
                    thumbColor={'#FF0000'}
                    onChange={() => Toast.show('Coming Soon')}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => {
              Toast.show('Coming Soon');
            }}>
            <Text style={styles.itemRowTextMain}>Account Deactivation</Text>
            <Text style={styles.itemRowTextSub}>
              You can reactivate your account by logging with same number{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (view === 'security') {
    return (
      <View style={styles.container}>
        <Header text={'Settings'} backPressed={() => setView('')} />
        <View style={styles.body}>
          <View style={styles.itemRow}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{flexDirection: 'row', width: '100%'}}>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text style={[styles.itemRowTextMain, {flex: 1}]}>
                2 Step Verification
              </Text>
              <Switch
                value={false}
                thumbColor={'#FF0000'}
                onChange={() => Toast.show('Coming Soon')}
              />
            </View>
            <Text style={styles.itemRowTextSub}>
              When this is on, you will be asked for your password and
              verification code when you sign in to your account
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Header text={'Settings'} />
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => setView('privacy')}>
          <Text style={styles.itemRowTextMain}>Privacy</Text>
          <Text style={styles.itemRowTextSub}>
            Manage the data you share with us{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemRow}
          onPress={() => setView('security')}>
          <Text style={styles.itemRowTextMain}>Security</Text>
          <Text style={styles.itemRowTextSub}>
            Control your account security with 2-step verification{' '}
          </Text>
        </TouchableOpacity>
        <View style={styles.itemRow}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{flexDirection: 'row', width: '100%'}}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={[styles.itemRowTextMain, {flex: 1}]}>
              Autoplay Videos
            </Text>
            <Switch
              thumbColor={'#FF0000'}
              onChange={() => {
                Toast.show('Coming Soon');
              }}
            />
          </View>
          <Text style={styles.itemRowTextSub}>
            This will help you control whether or not, the videos in app should
            autoplay{' '}
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Course Feedback</Text>
          <Text style={styles.itemRowTextSub}>
            We are here to help answer any questions you have about the courses
            on Sporbit{' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'mailto:info@sporbit.in?subject=Course Feedback&body',
              )
            }>
            <Text style={styles.contactButton}>CONTACT US</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>App Feedback</Text>
          <Text style={styles.itemRowTextSub}>
            Please let us know if something isn’t working or you have general
            feedback
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'mailto:info@sporbit.in?subject=Android Application Feedback&body',
              )
            }>
            <Text style={styles.contactButton}>REPORT A PROBLEM</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  contactButton: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#ff5959',
    marginTop: heightToDP('1%'),
    fontSize: widthToDP('3%'),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: heightToDP('10%'),
    width: widthToDP('100%'),
    alignItems: 'center',
  },
  body: {
    paddingTop: heightToDP('8%'),
  },
  itemRow: {
    paddingVertical: heightToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    justifyContent: 'center',
    paddingHorizontal: widthToDP('5%'),
  },
  itemRowTextMain: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('1%'),
  },
  itemRowTextSub: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    color: '#777777',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
  },
  backButton: {
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('4%'),
  },
  headingIcon: {
    position: 'absolute',
    left: 0,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
    fontFamily: 'Gilroy-Regular',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
});
