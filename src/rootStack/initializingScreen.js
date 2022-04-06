import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Animated, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import {heightToDP, widthToDP} from '../../services/utils';

const InitializingScreen = (props) => {
  const {animation} = props;
  console.log(animation);
  return (
    <Animated.View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../../assets/appB.png')}
        style={styles.logo}>
        {animation ? (
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1000"
            style={styles.titleLogo}
            resizeMode="center"
            source={require('../../assets/images/splash_title.png')}
          />
        ) : (
          <Animatable.Image
            style={styles.titleLogo}
            resizeMode="center"
            source={require('../../assets/images/splash_title.png')}
          />
        )}
      </ImageBackground>
    </Animated.View>
  );
};
export default InitializingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: '10%',
    borderColor: '#ff6362',
    borderWidth: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogo: {
    flex: 1,
    marginTop: heightToDP('10%'),
    width: '80%',
  },
});
