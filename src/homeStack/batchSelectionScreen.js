import * as React from 'react';
import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {widthToDP, heightToDP} from '../../services/utils';
import PlayerSelection from './components/batchSelectionScreen/playerSelection';
import DaysSelection from './components/batchSelectionScreen/daysSelection';
import LevelSelection from './components/batchSelectionScreen/levelSelection';
import PayDuration from './components/batchSelectionScreen/payDuration';
import Header from '../components/header';
import BatchSelection from './components/batchSelectionScreen/batchSelection';
import TrialSelection from './components/batchSelectionScreen/trialSelection';
import PackageCards from './components/batchSelectionScreen/packageCards';
import PackageCards2 from './components/batchSelectionScreen/packageCards2';

export default function BatchSelectionScreen({route, navigation}) {
  const {academy,sports, mode} = route.params;
  const [player, setPlayer] = useState('');
  const [batch, setBatch] = useState({key: true});
  const [pack, setPack] = useState('3');
  const [level, setLevel] = useState('Beginner');
  const [payDuration, setPayDuration] = useState('Quarterly');
  const [err, setErr] = useState('');
  const [ nextClassDate, setNextClassDate ] = useState(new Date());
  const [ nextClassTimings, setNextClassTimings ] = useState(''); 

  const onSubmitPressed = () => {
    console.log('levellllllllllll',level);
    if(level==='Superbatch'){
      batch.level=level;
    }
    if(level==='Munchkin'){
      batch.level=level;
    }
    if (!player) {
      setErr('Please select a player first');
      return;
    }
    if (!batch.key) {
      setErr('Please select a batch first');
      return;
    }
    if (batch.id==null && mode=='trial') {
      setErr('Please select the timeslot first');
      return;
    }
    
    navigation.navigate('ConfirmationScreen', {
      academy: academy,
      player: player,
      batch: batch,
      payDuration: payDuration,
      sports: sports,
      pack: pack,
      nextClassDate: nextClassDate,
      mode: mode,
      nextClassTimings: nextClassTimings
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header text={'Registration'} />
      <View style={styles.body}>
        <PlayerSelection setPlayer={setPlayer} player={player} />
        { mode=='booking' ? <LevelSelection level={level} setLevel={setLevel} sports={sports} setBatch={setBatch} />: null}
        { mode=='booking' ? <DaysSelection sports={sports} pack={pack} level={level} setPack={setPack} setBatch={setBatch} />: null}
        {mode=='booking' ? <BatchSelection
          pack={pack}
          level={level}
          batch={batch}
          setBatch={setBatch}
          setErr={setErr}
          academyID={academy.id}
        />:
        <TrialSelection
          level='Beginner'
          batch={batch}
          setBatch={setBatch}
          setErr={setErr}
          academyID={academy.id}
          sport={sports}
          nextClassDate={nextClassDate}
          setNextClassDate={setNextClassDate}
          nextClassTimings={nextClassTimings}
          setNextClassTimings={setNextClassTimings}
        />
        }
        
        {false ? <PayDuration
          payDuration={payDuration}
          setPayDuration={setPayDuration}
        />: null}
        <Text style={styles.errText}>{err}</Text>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => onSubmitPressed()}>
          <Text style={styles.paymentButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: heightToDP('8%'),
  },
  paymentButton: {
    paddingHorizontal: widthToDP('25%'),
    paddingVertical: widthToDP('3%'),
    alignItems: 'center',
    marginVertical: heightToDP('5%'),
    backgroundColor: 'rgba(255, 89, 89, 1)',
    borderRadius: widthToDP('8%'),
    alignSelf: 'center',
  },
  paymentButtonText: {
    fontSize: widthToDP('6%'),
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
  },
  errText: {
    alignSelf: 'center',
    fontSize: widthToDP('3%'),
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
  },
});
