import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {Avatar} from 'react-native-elements';
import * as React from 'react';
import {useContext} from 'react';
import {AppContext} from '../../../../services/appContext';

const PlayerSelector = ({selectedPlayer, setSelectedPlayer}) => {
  const {players} = useContext(AppContext);
  return (
    <View style={styles.container}>
      {Object.keys(players).map((playerID) => {
        const playerData = players[playerID];
        return (
          <View
            key={playerID}
            style={selectedPlayer === playerID ? styles.underline : null}>
            <TouchableOpacity
              style={
                selectedPlayer === playerID
                  ? styles.selectedPlayerListItem
                  : styles.playerListItem
              }
              key={playerID}
              onPress={() => setSelectedPlayer(playerID)}>
              <Avatar
                rounded
                size={
                  selectedPlayer === playerID
                    ? widthToDP('20%')
                    : widthToDP('15%')
                }
                title={playerData.initials}
                source={{
                  uri: playerData.photoURL ? playerData.photoURL : 'avatar',
                }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default PlayerSelector;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  underline: {
    paddingBottom: heightToDP('2%'),
    borderBottomWidth: 2,
    borderBottomColor: '#ff6362',
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
});
