import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {AppContext} from '../../../../services/appContext';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Add from '../../../../assets/icons/registration/add.svg';
import {Avatar} from 'react-native-elements';
import AddPlayer from './addPlayer';

const PlayerSelection = (props) => {
  let {user, players} = useContext(AppContext);
  const [addScreen, setAddScreen] = useState(false);
  const {player, setPlayer} = props;

  useEffect(() => {
    console.log('Enter here.............');
    console.log(players);
    Object.keys(players).map((playerID) => {
      if (players[playerID].status === 'Unregistered' || players[playerID].status === 'Approved') {
        setPlayer(playerID);
      }
    });
  }, [players, setPlayer]);

  const PlayerItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          console.log(item.id);
          setPlayer(item.id);
        }}
        style={
          player === item.id ? styles.activePlayerItem : styles.playerItem
        }>
        <View style={player === item.id ? styles.activePlayerContainer : null}>
          <Avatar
            rounded
            size={player === item.id ? widthToDP('20%') : widthToDP('15%')}
            title={item.initials}
            source={{
              uri: item.photoURL ? item.photoURL : 'avatar',
            }}
          />
        </View>
        <Text style={styles.playerText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  if (addScreen) {
    return <AddPlayer setAddScreen={setAddScreen} />;
  }
  return (
    <View style={styles.playerSelection}>
      <SafeAreaView style={styles.playerList}>
        {Object.keys(players)
          .filter((playerID) => {
            const playerData = players[playerID];
            console.log(playerData.status);
            return (playerData.status === 'Unregistered' || playerData.status === 'Approved');
          })
          .map((playerID) => {
            console.log("PlayerID: "+playerID);
            return <PlayerItem key={playerID} item={players[playerID]} />;
          })}
      </SafeAreaView>
      {user.players.length < 3 ? (
        <View style={styles.addPlayerRow}>
          <Text style={styles.buttonText}>Add Player</Text>
          <TouchableOpacity
            style={{marginTop: heightToDP('0.4%')}}
            onPress={() => {
              setAddScreen(true);
              setPlayer('');
            }}>
            <Add />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default PlayerSelection;

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
    textAlign: 'justify',
    marginBottom: 20,
  },
  tabHeaderText: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  playerSelection: {
    paddingTop: 20,
    margin: widthToDP('5%'),
    alignItems: 'center',
  },
  tabEmptyHeaderText: {
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  playerEmptySelection: {
    marginTop: 10,
    alignItems: 'center',
  },
  addPlayerButton: {
    alignItems: 'center',
    backgroundColor: '#ff6362',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    margin: 10,
  },
  playerList: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  playerItem: {
    marginHorizontal: widthToDP('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlayerItem: {
    marginHorizontal: widthToDP('5%'),
    paddingBottom: heightToDP('2%'),
    borderBottomWidth: 2,
    borderBottomColor: '#ff5959',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePlayerContainer: {
    borderRadius: widthToDP('20%'),
    borderWidth: 2,
    borderColor: '#ff5959',
  },
  playerImage: {
    height: widthToDP('15%'),
    width: widthToDP('15%'),
    borderRadius: widthToDP('50%'),
  },
  activePlayerImage: {
    height: widthToDP('20%'),
    width: widthToDP('20%'),
    borderRadius: widthToDP('50%'),
  },
  playerText: {
    marginTop: heightToDP('1%'),
    color: 'black',
    fontSize: widthToDP('3%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
  },
  addPlayerRow: {
    flexDirection: 'row',
    marginTop: heightToDP('3%'),
  },
  buttonText: {
    fontSize: widthToDP('6%'),
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    marginRight: widthToDP('3%'),
  },
  playerButton: {
    width: widthToDP('6%'),
    height: widthToDP('6%'),
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
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
});
