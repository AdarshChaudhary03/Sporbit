import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {heightToDP, widthToDP} from '../../../../services/utils';
import * as React from 'react';
import {reactNavigation} from '../../../../services';
import {useContext} from 'react';
import {AppContext} from '../../../../services/appContext';

const AnimatedHeader = () => {
  const {user} = useContext(AppContext);
  return (
    <View style={styles.headerProfile}>
      <View style={styles.image}>
        <Avatar
          rounded
          overlayContainerStyle={styles.avatarContainer}
          size={widthToDP('18%')}
          title={user.initials}
          source={{
            uri: user.photoURL ? user.photoURL : 'avatar',
          }}
        />
      </View>
      <View style={styles.profileBrief}>
        <Text style={styles.nameText}>{user.displayName}</Text>
        <TouchableOpacity
          onPress={() => {
            reactNavigation.navigate('EditProfileScreen');
          }}>
          <Text style={styles.editButtonText}>Show Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnimatedHeader;
const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: widthToDP('18%'),
    width: widthToDP('18%'),
    // borderRadius: widthToDP('10%'),
  },
  headerProfile: {
    alignItems: 'center',
    flexDirection: 'row',
    width: widthToDP('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: heightToDP('2%'),
    marginTop: 5,
    marginBottom: 5,
  },
  profileBrief: {
    paddingHorizontal: heightToDP('2%'),
    justifyContent: 'center',
  },
  nameText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    color: '#707070',
  },
  emailText: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    color: '#707070',
  },
  editButtonText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    color: '#FF5959',
  },
  avatarContainer: {
    backgroundColor: '#ff5959',
  },
});
