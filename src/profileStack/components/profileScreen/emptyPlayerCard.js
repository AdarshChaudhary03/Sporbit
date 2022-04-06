import * as React from 'react';
import {useContext} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {deletePlayer} from '../../../../services/setters';
import {AppContext} from '../../../../services/appContext';
import {reactNavigation} from '../../../../services';
import Profile from '../../../../assets/icons/profile/others/profile.svg';
import Delete from '../../../../assets/icons/profile/others/delete.svg';
import Stats from '../../../../assets/icons/profile/others/stats.svg';

const EmptyPlayerCard = ({player}) => {
  const {updateUserContext} = useContext(AppContext);
  const onDeletePressed = async () => {
    await deletePlayer(player.id);
    await updateUserContext();
  };
  return (
    <View key={player.id} style={styles.playerItem}>
      <View style={styles.playerItemTop}>
        <Avatar
          rounded
          size={widthToDP('15%')}
          title={player.initials}
          source={{
            uri: player.photoURL ? player.photoURL : 'avatar',
          }}
        />
        <View style={styles.playerBrief}>
          <Text numberOfLines={2} style={styles.playerText}>
            {player.name}
          </Text>
          <TouchableOpacity
            style={styles.showProfile}
            onPress={() => {
              reactNavigation.navigate('PlayerEditScreen', {
                playerID: player.id,
              });
            }}>
            <Profile />
            <Text style={styles.playerTextBottom}>Show Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteButton}>
          <TouchableOpacity
            onPress={() => {
              console.log('Delete ', player.id);
              Alert.alert(
                'Delete Player Profile',
                'Are you sure you want to delete this player profile?',
                [
                  {
                    text: 'Yes',
                    onPress: onDeletePressed,
                  },
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                ],
                {cancelable: true},
              );
            }}>
            <Delete />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.playerItemBottom}>
        <Text style={styles.playerTextTop}>
          Register in a course to view details.
        </Text>
        <TouchableOpacity
          style={styles.showStats}
          onPress={() => {
            Toast.show('Please book a course first.');
          }}>
          <View style={{marginRight: widthToDP('2%')}}>
            <Stats />
          </View>
          <Text style={styles.playerTextBottom}>View Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EmptyPlayerCard;
const styles = StyleSheet.create({
  playerItem: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: widthToDP('4%'),
    padding: 5,
    marginVertical: heightToDP('2%'),
    marginHorizontal: widthToDP('1%'),
    alignItems: 'center',
    width: widthToDP('90%'),
  },
  playerItemTop: {
    padding: 5,
    marginVertical: 5,
    flexDirection: 'row',
    width: widthToDP('80%'),
  },
  playerBrief: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  deleteButton: {
    alignItems: 'flex-end',
    marginRight: widthToDP('5%'),
  },
  playerImage: {
    borderRadius: 75,
    alignItems: 'center',
  },
  playerText: {
    marginLeft: widthToDP('3%'),
    color: '#000000',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  playerItemBottom: {
    padding: 5,
    marginVertical: 5,
    width: '90%',
    marginBottom: 30,
  },
  playerTextTop: {
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    color: 'black',
    fontWeight: 'bold',
  },
  playerTextBottom: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    color: '#ff6362',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
  playerListItem: {
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
  },
  selectedPlayerListItem: {
    marginTop: heightToDP('3%'),
    borderRadius: widthToDP('50%'),
    borderWidth: 2,
    borderColor: '#ff5959',
  },
  showProfile: {
    flexDirection: 'row',
    marginLeft: widthToDP('3%'),
  },
  showStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
