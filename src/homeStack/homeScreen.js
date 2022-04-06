import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {widthToDP, heightToDP} from '../../services/utils';
import SportsCard from './components/homeScreen/sportsCard';
import AnimatedHeader from './components/homeScreen/animatedHeader';
import {getSports} from '../../services/getters';

const HomeScreen = () => {
  const [sportsList, setSportsList] = useState([]);
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSportsList([]);
    getSports().then((sportsData) => {
      setSportsList(sportsData);
    });
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../assets/appB.png')}
      style={styles.logo}>
      <AnimatedHeader offset={offset} />
      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {useNativeDriver: false},
        )}>
        <View>
          <Animatable.View
            style={styles.footer}
            animation="fadeInUpBig"
            duraton="4000">
            {sportsList.length ? (
              sportsList.map((sport) => {
                return <SportsCard key={sport.name} item={sport} />;
              })
            ) : (
              <View style={{height: heightToDP('50%')}} />
            )}
          </Animatable.View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: heightToDP('20%'),
  },
  logo: {
    marginTop: -heightToDP('30%'),
    width: widthToDP('100%'),
    height: heightToDP('130%'),
  },
  footer: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: heightToDP('1%'),
    marginTop: heightToDP('50%'),
    paddingBottom: heightToDP('10%'),
  },
});
