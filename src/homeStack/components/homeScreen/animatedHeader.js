import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {heightToDP, widthToDP} from '../../../../services/utils';

const AnimatedHeader = ({offset}) => {
  const HEADER_HEIGHT = heightToDP('40%');
  const insets = useSafeAreaInsets();
  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + heightToDP('20%')],
    extrapolate: 'clamp',
  });

  const opacity = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.titleLogoView, {height: headerHeight}]}>
      <Animated.View style={[styles.titleLogoEmpty, {opacity: opacity}]} />
      <Animated.Image
        style={styles.titleLogo}
        resizeMode="center"
        source={require('../../../../assets/images/splash_title.png')}
      />
    </Animated.View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  titleLogo: {
    marginTop: 10,
    paddingTop: 50,
    width: widthToDP('80%'),
    paddingHorizontal: widthToDP('15%'),
    height: heightToDP('10%'),
  },
  titleLogoEmpty: {
    paddingTop: 50,
    width: widthToDP('100%'),
    paddingHorizontal: widthToDP('20%'),
    height: '100%',
    marginBottom: -heightToDP('10%'),
    backgroundColor: 'black',
  },
  titleLogoView: {
    marginTop: heightToDP('20%'),
    width: widthToDP('100%'),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
