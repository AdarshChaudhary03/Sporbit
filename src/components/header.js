import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React from 'react';
import {heightToDP, widthToDP} from '../../services/utils';
import {reactNavigation} from '../../services/index';
import BackButton from '../../assets/icons/header/backButton.svg';

const Header = ({text, backPressed}) => {
  return (
    <View style={styles.heading}>
      <View style={styles.headingIcon}>
        {text === 'Courses' || text === 'Community' ? null : (
          <View style={styles.backButton}>
            <TouchableOpacity
              onPress={backPressed ? backPressed : reactNavigation.goBack}>
              <BackButton />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.headingText}>{text}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: widthToDP('100%'),
    backgroundColor: 'rgba(28, 38, 87, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
    zIndex: 1000,
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
    fontFamily: 'Gilroy-SemiBold',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
});
