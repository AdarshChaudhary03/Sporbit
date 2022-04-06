import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {heightToDP, widthToDP} from '../services/utils';
import Header from './components/header';

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Header text={'Community'} />
      <View style={styles.emptyList}>
        <Text style={styles.emptyListTextA}>Coming Soon!!</Text>
        <Text style={styles.emptyListTextB}>
          Hang tight. We are building something awesome for you. You'll be the
          first to know when we launch
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
    paddingTop: heightToDP('10%'),
  },
  item: {
    marginVertical: 5,
    paddingHorizontal: 5,
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  emptyList: {
    marginTop: 20,
    alignItems: 'center',
    height: heightToDP('50%'),
    justifyContent: 'center',
    marginHorizontal: widthToDP('12%'),
    alignSelf: 'center',
  },
  emptyListTextA: {
    fontSize: widthToDP('5%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyListTextB: {
    textAlign: 'center',
    fontSize: widthToDP('4%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  backgroundImage: {
    width: widthToDP('100%'),
    height: heightToDP('35%'),
    alignItems: 'center',
  },
  titleLogo: {
    flex: 1,
    marginTop: 220,
    width: widthToDP('100%'),
  },
  title: {
    color: '#fff',
    fontSize: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learn: {
    marginTop: 10,
    color: '#fff',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: heightToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightToDP('100%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
