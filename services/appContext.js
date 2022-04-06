import React from 'react';
import {useEffect, useReducer, useCallback} from 'react';
import {getUser} from './getters';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {updateUser, updateUserLocation} from './setters';
const AppContext = React.createContext();
const actions = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_LOCATION: 'UPDATE_USER_LOCATION',
  UPDATE_PLAYERS: 'UPDATE_PLAYERS',
  UPDATE_PAYMENTS: 'UPDATE_PAYMENTS',
  UPDATE_SUBSCRIPTIONS: 'UPDATE_SUBSCRIPTIONS',
};

async function saveTokenToDatabase(token) {
  await updateUser({
    tokens: firestore.FieldValue.arrayUnion(token),
  });
}

function reducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case actions.UPDATE_USER:
      return {...state, user: action.value};
    case actions.UPDATE_USER_LOCATION:
      return {...state, user: {...state.user, location: action.value}};
    case actions.UPDATE_PLAYERS:
      return {...state, players: action.value};
    case actions.UPDATE_PAYMENTS:
      return {...state, payments: action.value};
    default:
      return state;
  }
}

const AppContextProvider = (props) => {
  // console.log('Start');
  const initialState = {
    user: {},
    players: {},
    payments: {},
    //students: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updatePlayersContext = async ({players}) => {
    let tempPlayers = {};
    // console.log('Current State', state);
    for await (const playerRef of players) {
      const playerData = await playerRef.get();
      if (playerData.data().students.length) {
        const studentData = await playerData.data().students[0].get();
        const batchData = await firestore()
          .collection(`academies/${studentData.data().academy.id}/batches`)
          .doc(studentData.data().batch)
          .get();
        tempPlayers[playerData.id] = {
          ...playerData.data(),
          ...studentData.data(),
          birthday: playerData.data().birthday.toDate(),
          batchName: batchData.data().id,
          nextClassTime: studentData.data().nextClassTime ? studentData.data().nextClassTime : null,
          id: playerData.id,
          initials: playerData
            .data()
            .name.split(' ')
            .map((n, index) => {
              if (index < 2) {
                return n[0];
              }
            })
            .join(''),
        };
      } else {
        tempPlayers[playerData.id] = {
          ...playerData.data(),
          birthday: playerData.data().birthday.toDate(),
          status: 'Unregistered',
          id: playerData.id,
          initials: playerData
            .data()
            .name.split(' ')
            .map((n, index) => {
              if (index < 2) {
                return n[0];
              }
            })
            .join(''),
        };
      }
    }
    dispatch({type: 'UPDATE_PLAYERS', value: tempPlayers});
  };

  const updateUserLocationContext = useCallback(async (location) => {
    location = new firestore.GeoPoint(location.latitude, location.longitude);
    await dispatch({type: 'UPDATE_USER_LOCATION', value: location});
    updateUserLocation(location).then(() => {});
  }, []);

  const updateUserContext = useCallback(async () => {
    let tempUser = await getUser();
    console.log('tempUserDetails...', tempUser);
    const token = await messaging().getToken();
    console.log('token...', token);
    if (!tempUser.tokens || !tempUser.tokens.includes(token)) {
      await saveTokenToDatabase(token);
    }
    await updatePlayersContext(tempUser);
    await dispatch({type: 'UPDATE_USER', value: tempUser});
    return tempUser;
  }, []);

  const updateUserContext2 = (async () => {
    let tempUser = await getUser();
    const token = await messaging().getToken();
    if (!tempUser.tokens || !tempUser.tokens.includes(token)) {
      const token = await saveTokenToDatabase(token);
    }
    const playerContext = await updatePlayersContext(tempUser);
    await dispatch({type: 'UPDATE_USER', value: tempUser});
//    return tempUser;
  }, []);

//  const start = useCallback(async () => {
//    await updateUserContext();
//    return true;
//  }, [updateUserContext]);


//  useEffect(start, [start]);
  
useEffect(() => {
  console.log('Entered useEffect 3');
    async function fetchData(){
      let tempUser = await getUser();
      const token = await messaging().getToken();
      if (!tempUser.tokens || !tempUser.tokens.includes(token)) {
        const token = await saveTokenToDatabase(token);
      }
      const playerContext = await updatePlayersContext(tempUser);
      await dispatch({type: 'UPDATE_USER', value: tempUser});  
    }
    fetchData();
  },[]);

  const value = {
    user: state.user,
    players: state.players,
    payments: state.payments,
    updateUserContext: updateUserContext,
    updateUserLocationContext: updateUserLocationContext,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export {AppContext, AppContextProvider};
