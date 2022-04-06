import * as React from 'react';
import {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {addPlayer} from '../../../../services/setters';
import firebaseSetup from '../../../../services/setup';
import {AppContext} from '../../../../services/appContext';
import {widthToDP} from '../../../../services/utils';

const {auth} = firebaseSetup();

const AddPlayer = (props) => {
  const {setAddScreen} = props;
  const {updateUserContext} = useContext(AppContext);
  const [activity, setActivity] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerAge, setPlayerAge] = useState('');
  const [err, setErr] = useState('');
  return (
    <View style={styles.playerSelection}>
      <Text style={styles.tabHeaderText}>Add Player</Text>
      <View style={styles.addPlayerDetailsContainer}>
        <View style={styles.addPlayerDetails}>
          <Text style={styles.staticText}>Name</Text>
          <TextInput
            autoCapitalize={'words'}
            onChangeText={(text) => {
              setPlayerName(text);
            }}
            style={styles.textInput}
            placeholder=" Player Name"
          />
        </View>
        <View style={styles.addPlayerDetails}>
          <Text style={styles.staticText}>Age</Text>
          <TextInput
            onChangeText={(text) => {
              setPlayerAge(text);
            }}
            keyboardType="numeric"
            style={styles.textInput}
            placeholder="Player Age"
          />
        </View>

        <TouchableOpacity
          style={styles.addPlayerButton}
          disabled={activity}
          onPress={() => {
            if (!playerName || !playerAge || parseInt(playerAge, 10) > 80) {
              setErr('Please fill all details');
            } else {
              setErr('Done');
              setErr(auth().currentUser.uid);
//              return;
              setActivity(true);
              const data = {
                name: playerName,
                birthday: new Date(2021 - playerAge, 1, 2),
                gender: '',
                user: auth().currentUser.uid,
                students: [],
              };
              addPlayer(data, false).then((id) => {
                data.id = id;
                data.academyName = '';
                data.academy = '';
                data.status = 'Unregistered';
                data.level = '';
                data.batch = '';
                updateUserContext().then(() => setAddScreen(false));
              });
            }
          }}>
          <Text style={styles.addPlayerButtonText}>Add Player</Text>
        </TouchableOpacity>
        <ActivityIndicator animating={activity} size={50} color="#ff6362" />
      </View>
    </View>
  );
};
export default AddPlayer;

const styles = StyleSheet.create({
  tabHeaderText: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  textInput: {
    flex: 3,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  staticText: {
    textAlign: 'right',
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  addPlayerButton: {
    alignItems: 'center',
    backgroundColor: '#ff6362',
    width: widthToDP('40%'),
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,
  },
  addPlayerButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  updateProfile: {
    backgroundColor: '#ff6362',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    margin: 40,
  },
  signOut: {
    backgroundColor: '#ff6362',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    margin: 40,
  },
  playerSelection: {
    paddingTop: 20,
    margin: 10,
    alignItems: 'center',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
  },
  addPlayerDetailsContainer: {
    margin: 10,
  },
  addPlayerDetails: {
    width: widthToDP('100%'),
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 5,
  },
  errText: {
    marginLeft: 50,
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
});
