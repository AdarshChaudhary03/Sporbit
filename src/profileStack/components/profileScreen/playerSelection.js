import * as React from 'react';
import {useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../../../../services/appContext';
import {heightToDP} from '../../../../services/utils';
import AddButton from '../../../../assets/icons/profile/others/addButton.svg';
import PlayerCard from './playerCard';
import PlayerSelector from './playerSelector';
import {reactNavigation} from '../../../../services';
const PlayerSelection = () => {
  const {user, players} = useContext(AppContext);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  if (
    Object.keys(players).length &&
    !Object.keys(players).includes(selectedPlayer)
  ) {
    setSelectedPlayer(Object.keys(players)[0]);
  }
  const AddSelfButton = () => {
    return (
      <View style={styles.emptyPlayerSelection}>
        <Text style={styles.emptyTabHeaderText}>
          No player profiles created
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.playerSelection}>
      <View style={styles.playerView}>
        <Text style={styles.tabHeaderText}>PLAYERS </Text>
        {user.players.length < 3 && (
          <TouchableOpacity
            onPress={() => {
              reactNavigation.navigate('PlayerEditScreen', {
                player: null,
              });
            }}>
            <AddButton />
          </TouchableOpacity>
        )}
      </View>
      <PlayerSelector
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
      <SafeAreaView style={styles.playerList}>
        {Object.keys(players).length ? (
          <PlayerCard playerID={selectedPlayer} />
        ) : (
          <AddSelfButton />
        )}
      </SafeAreaView>
    </View>
  );
};

export default PlayerSelection;

const styles = StyleSheet.create({
  tabHeaderText: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyTabHeaderText: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  emptyPlayerSelection: {
    alignItems: 'center',
    padding: heightToDP('5%'),
    width: '100%',
  },
  playerSelection: {
    margin: 10,
    alignItems: 'center',
    paddingTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  addPlayerButton: {
    alignItems: 'center',
    backgroundColor: '#ff6362',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    margin: 10,
  },
  playerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
