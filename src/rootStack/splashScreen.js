import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../assets/icons/facilitySelection/frontArrow.svg';

import {heightToDP, widthToDP} from '../../services/utils';
import LoginFooter from './components/loginFooter';

const SplashScreen = () => {
  const [footer, setFooter] = useState('');
  const footerFlex = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(footerFlex, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setFooter('splash'));
  }, [footerFlex]);

  const phoneScreen = async () => {
    setFooter('');
    Animated.spring(footerFlex, {
      toValue: 4,
      speed: 10,
      bounciness: 15,
      useNativeDriver: false,
    }).start(() => {});

    setFooter('phone');
  };

  const SplashFooter = () => {
    return (
      <View style={styles.splashFooter}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>START PLAYING TODAY</Text>
        <Animatable.View
          style={styles.button}
          animation={'tada'}
          duration={1000}>
          <TouchableOpacity onPress={() => phoneScreen()}>
            <LinearGradient
              colors={['#ff6369', '#ff6362']}
              style={styles.signIn}>
              <Text style={styles.textSign}>{'GET PLAYING'}</Text>
              <Arrow />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  };

  const Footer = () => {
    switch (footer) {
      case 'splash':
        return <SplashFooter />;
      case 'phone':
        return <LoginFooter />;
      default:
        return <View />;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar hidden />
      <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/appB.png')}
          style={styles.logo}>
          <Image
            style={styles.titleLogo}
            resizeMode="center"
            source={require('../../assets/images/splash_title.png')}
          />
        </ImageBackground>
      </View>

      <Animated.View style={[styles.footer, {flex: footerFlex}]}>
        <Footer />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  splashFooter: {
    marginTop: 40,
    paddingHorizontal: 40,
  },
  phoneFooter: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  titleLogo: {
    flex: 1,
    marginTop: heightToDP('10%'),
    width: '80%',
  },
  title: {
    color: '#05375a',
    fontSize: widthToDP('7%'),
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  text: {
    color: 'grey',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: widthToDP('35%'),
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontSize: widthToDP('3.5%'),
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
    color: '#05375a',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  phoneButton: {
    alignItems: 'center',
    marginTop: 40,
  },
  phoneSignIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff6362',
  },
  phoneTextSign: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
