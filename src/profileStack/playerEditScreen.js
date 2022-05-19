import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {addPlayer, updatePlayer} from '../../services/setters';
import DatePicker from 'react-native-datepicker';
import {Picker} from '@react-native-community/picker';
import {ScrollView} from 'react-native-gesture-handler';
import {heightToDP, widthToDP} from '../../services/utils';
import {AppContext} from '../../services/appContext';
import Header from '../components/header';
import CheckBox from '@react-native-community/checkbox';
import Man from '../../assets/icons/profile/edit/man-user 2.svg';
import Woman from '../../assets/icons/profile/edit/woman 2.svg';
import PlayerImageEdit from './components/playerEditScreen/playerImageEdit';

const PlayerEditScreen = ({route, navigation}) => {
  const {user, players, updateUserContext} = useContext(AppContext);
  let {playerID} = route.params;
  console.log('playerIDDDD ', playerID);
  console.log('player ', players[playerID]);
  const newPlayer = {
    name: '',
    birthday: new Date(2000, 0, 2),
    gender: 'Female',
    relation: 'Child',
  };
  const player = playerID ? players[playerID] : newPlayer;
  const [playerName, setPlayerName] = useState(player.name);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [playerBirthday, setPlayerBirthday] = useState(player.birthday);
  const [playerBirthdayEdit, setPlayerBirthdayEdit] = useState(false);
  const [playerGender, setPlayerGender] = useState(player.gender);
  const [playerRelation, setPlayerRelation] = useState(player.relation);
  const [err, setErr] = useState('');
  const [activity, setActivity] = useState(false);
  const [selfMark, setSelfMark] = useState(false);
  const [showSelfMark, setShowSelfMark] = useState(true);

  console.log('player.birthday',player.birthday);

  const onSubmitPressed = async () => {
    if (selfMark) {
      setActivity(true);
      if (playerID) {
        const update = {
          id: playerID,
          name: user.displayName,
          photoURL: user.photoURL,
          birthday: playerBirthday,
          gender: playerGender,
          relation: 'Self',
        };
        await updatePlayer(update);
        await updateUserContext();
        return true;
      } else {
        const tempPlayer = {
          name: user.displayName,
          photoURL: user.photoURL,
          birthday: playerBirthday,
          gender: playerGender,
          relation: 'Self',
          user: user.uid,
          students: [],
        };
        await addPlayer(tempPlayer, false);
        await updateUserContext();
        return true;
      }
    }

    if (!playerName || !playerRelation || !playerGender) {
      setErr('Please fill all fields.');
      return false;
    }
    if (playerBirthday > new Date()) {
      setErr('Incorrect Date of Birth.');
      return false;
    }
    setActivity(true);
    if (!playerID) {
      const tempPlayer = {
        name: playerName,
        birthday: playerBirthday,
        gender: playerGender,
        relation: playerRelation,
        photoURL: imageUploaded ? imageUploaded : '',
        user: user.uid,
        students: [],
      };
      await addPlayer(tempPlayer, imageUploaded);
      await updateUserContext();
      return true;
    } else {
      const update = {
        id: playerID,
        name: playerName,
        birthday: playerBirthday,
        gender: playerGender,
        relation: playerRelation,
      };
      await updatePlayer(update);
      await updateUserContext();
      return true;
    }
  };

  useEffect(() => {
    Object.keys(players).forEach((playerIDs) => {
      if (players[playerIDs].relation === 'Self') {
        setShowSelfMark(false);
      }
    });
  }, [players]);

  return (
    <View style={styles.container}>
      <Header text={'Player Profile'} />
      <ScrollView>
        <View style={styles.containerBox}>
          <PlayerImageEdit
            playerID={playerID}
            selfMark={selfMark}
            setImageUploaded={setImageUploaded}
          />
          <View style={styles.userDetails}>
            <View style={styles.userDetailsTab}>
              <Text style={styles.userDetailsText}>NAME</Text>
              <TextInput
                editable={!selfMark}
                style={styles.userDetailsTextInput}
                value={selfMark ? user.displayName : playerName}
                autoCapitalize={'words'}
                onChangeText={(text) => setPlayerName(text)}
                underlineColorAndroid="#707070"
                placeholder="Enter Player Name"
              />
            </View>
            <View style={styles.userDetailsTab}>
              <Text style={styles.userDetailsText}>DATE OF BIRTH</Text>
              {playerBirthdayEdit ? (
                <View style={styles.datePicker}>
                  <DatePicker
                    timeZoneOffsetInMinutes={330}
                    mode={'date'}
                    date={playerBirthday}
                    onDateChange={(date) => {
                      console.log('new date: ', new Date(date));
                      setPlayerBirthday(new Date(date))
                    }}
                  />
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    onPress={() => setPlayerBirthdayEdit(false)}>
                    <Text style={styles.datePickerText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setPlayerBirthdayEdit(true)}>
                  <TextInput
                    editable={false}
                    style={styles.userDetailsTextInput}
                    value={playerBirthday
                      .toUTCString()
                      .split(' ')
                      .slice(0, 4)
                      .join(' ')}
                    underlineColorAndroid="#707070"
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.userDetailsTab}>
              <Text style={styles.userDetailsText}>GENDER</Text>
              <View style={styles.genderPicker}>
                <TouchableOpacity
                  onPress={() => {
                    setPlayerGender('Female');
                  }}
                  style={
                    playerGender === 'Female'
                      ? styles.activeGenderPickerOption
                      : styles.genderPickerOption
                  }>
                  <Woman />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPlayerGender('Male');
                  }}
                  style={
                    playerGender === 'Male'
                      ? styles.activeGenderPickerOption
                      : styles.genderPickerOption
                  }>
                  <Man />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.userDetailsTab, styles.userDetailsTabExtra]}>
              <Text style={styles.userDetailsText}>RELATIONSHIP</Text>
              {selfMark || playerRelation === 'Self' ? (
                <Picker
                  enabled={false}
                  defaultValue={'Self'}
                  selectedValue={'Self'}
                  style={styles.addBatchDropDown}
                  itemStyle={styles.addBatchDropDownText}
                  onValueChange={(item) => {
                    setPlayerRelation(item);
                  }}>
                  <Picker.Item label={'Self'} value={'Self'} />
                </Picker>
              ) : (
                <Picker
                  defaultValue={playerRelation}
                  selectedValue={playerRelation}
                  style={styles.addBatchDropDown}
                  itemStyle={styles.addBatchDropDownText}
                  onValueChange={(item) => {
                    setPlayerRelation(item);
                  }}>
                  <Picker.Item label={'Child'} value={'Child'} />
                  <Picker.Item label={'Sibling'} value={'Sibling'} />
                  <Picker.Item label={'Other'} value={'Other'} />
                </Picker>
              )}
            </View>
          </View>
          {showSelfMark && (
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={selfMark}
                onValueChange={() => {
                  setSelfMark(!selfMark);
                  setPlayerGender(user.gender ? user.gender : 'Female');
                  setPlayerBirthday(user.birthday);
                }}
                style={styles.checkbox}
                tintColors={{true: '#ff6362', false: '#ff6362'}}
              />
              <Text style={styles.selfMarkText}>Mark as yourself</Text>
            </View>
          )}
          <Text style={styles.err}>{err}</Text>
          {activity ? (
            <ActivityIndicator animating={activity} size={50} color="#ff6362" />
          ) : (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => {
                onSubmitPressed().then((success) => {
                  if (success) {
                    navigation.navigate('BottomTab');
                  }
                });
              }}>
              <Text style={styles.updateText}>
                {!playerID ? 'ADD PLAYER' : 'SAVE CHANGES'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default PlayerEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightToDP('8%'),
  },
  image: {
    backgroundColor: '#fff',
    height: widthToDP('33%'),
    width: widthToDP('33%'),
    borderRadius: widthToDP('16.5%'),
    marginTop: 30,
    marginBottom: 5,
    overflow: 'hidden',
  },
  profileImage: {
    height: widthToDP('33%'),
    width: widthToDP('33%'),
    borderRadius: widthToDP('16.5%'),
  },
  imageEditButtonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: widthToDP('6.6%'),
    width: widthToDP('33%'),
    marginTop: '-20%',
  },
  imageEditButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
    height: '100%',
    width: '100%',
    marginBottom: 0,
    opacity: 0.7,
  },
  imageEditButtonBlank: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '-20%',
    width: '100%',
  },
  imageEditButtonText: {
    color: '#d0cfcf',
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  addBatchDropDown: {
    flex: 3,
    width: '100%',
  },
  addBatchDropDownStyle: {
    backgroundColor: '#fff',
    textAlign: 'left',
  },
  addBatchDropDownText: {
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  genderPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  genderImage: {},
  genderPickerOption: {
    width: widthToDP('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#b7b7b7',
    borderRadius: widthToDP('5%'),
    marginHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('0.5%'),
    backgroundColor: '#fff',
  },
  selfMarkText: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#6F6F6F',
  },
  activeGenderPickerOption: {
    width: widthToDP('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#ff5959',
    borderRadius: widthToDP('5%'),
    marginHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('0.5%'),
    backgroundColor: '#fff',
  },
  genderPickerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
    width: widthToDP('100%'),
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
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },

  userDetails: {
    width: '80%',
  },
  userDetailsTab: {
    marginVertical: 10,
  },
  userDetailsTabExtra: {
    borderBottomColor: '#292929',
    borderBottomWidth: 1,
  },
  userDetailsText: {
    color: '#292929',
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  userDetailsTextInput: {
    color: '#292929',
    fontSize: 20,
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerButton: {
    backgroundColor: '#ff6362',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 5,
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  updateButton: {
    backgroundColor: '#ff6362',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  updateText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },

  deleteButton: {
    backgroundColor: '#ff6362',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 30,
    alignItems: 'center',
    borderRadius: 40,
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
