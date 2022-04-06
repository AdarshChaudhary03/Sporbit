import * as React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import {heightToDP, widthToDP} from '../../../../services/utils';

const Header = ({sports}) => {
  const {academiesHeaderImage, academiesHeaderQuote, academiesHeaderQuoter} =
    sports;
  return (
    <View style={styles.header}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: academiesHeaderImage}}
        style={styles.headerImage}>
        <View style={styles.headerQuote}>
          <Text style={styles.academiesHeaderQuote}>
            {academiesHeaderQuote}
          </Text>

          <Text style={styles.academiesHeaderQuoter}>
            {academiesHeaderQuoter}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerQuote: {
    marginTop: heightToDP('4%'),
    width: widthToDP('70%'),
  },
  academiesHeaderQuote: {
    color: '#fff',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
    lineHeight: widthToDP('5%'),
    textAlign: 'center',
  },
  academiesHeaderQuoter: {
    color: '#fff',
    fontSize: widthToDP('7%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    lineHeight: heightToDP('10%'),
    textAlign: 'center',
  },
  headerImage: {
    width: widthToDP('100%'),
    height: heightToDP('33%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
