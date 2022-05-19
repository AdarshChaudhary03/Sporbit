import * as React from 'react';
import {useState, useContext, useCallback, useRef} from 'react';
import {ScrollView, RefreshControl, Animated} from 'react-native';

import PlayerSelection from './components/profileScreen/playerSelection';
import {AppContext} from '../../services/appContext';
import Settings from './components/profileScreen/settings';
import SignOut from './components/profileScreen/signOut';
import AnimatedHeader from './components/profileScreen/animatedHeader';
import ProfileSkeleton from './components/profileScreen/profileSkeleton';

import firebaseSetup from '../../services/setup';
const {auth} = firebaseSetup();

const ProfileScreen = () => {
  const {user, updateUserContext} = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(async () => {
    console.log('Entered...');
    setRefreshing(true);
    await updateUserContext();
    setRefreshing(false);
  }, [updateUserContext]);


  if(user.players==null){
    console.log('Null User');
    return null;
    }
//  if (!user.players.length) {
//    return <ProfileSkeleton />;
//  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
        useNativeDriver: false,
      })}>
      <AnimatedHeader />
      <PlayerSelection />
      <Settings />
      <SignOut />
    </ScrollView>
  );
};
export default ProfileScreen;
