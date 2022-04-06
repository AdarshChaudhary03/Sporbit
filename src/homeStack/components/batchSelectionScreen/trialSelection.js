import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {getBatches} from '../../../../services/getters';
import DatePicker from 'react-native-datepicker'
import moment from "moment";

const getFilteredBatches = (batches, level, sportName) => {
  return Object.keys(batches).filter((batch) => {
    batch = batches[batch];
    const {days} = batch;
        return batch.level === level && batch.sport === sportName && days.length === 6;
  });
};

const disabledDate = (current) => {
    console.log(moment(current).day());
    return moment(current).day() === 0
  }


const TrialSelection = ({academyID, pack, level, batch, sport, setBatch, setErr, setNextClassDate,nextClassDate, setNextClassTimings}) => {
  console.log("pack: "+pack);
  console.log(sport.name);
  const [includesMonday, setIncludesMonday] = useState(true);
  const [batches, setBatches] = useState(false);
  const [date, setDate] = useState(new Date());
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const checkDate = (current) => {
    console.log('current',current);
    console.log(date);
    console.log(moment(current).day());
if(moment(current).day()===0){
        alert('Trials not available on Sundays.');
        const prevDate = new Date(current);
        prevDate.setDate(prevDate.getDate()-1);
            setDate(prevDate);
        setNextClassDate(prevDate);
    }
    else{
        setDate(current);
        setNextClassDate(current);
    }
}  
  
  useEffect(() => {
    getBatches(academyID).then((batchesData) => {
//      console.log(Object.keys(batchesData));
      setBatches(batchesData);
    });
  }, [academyID]);

  return (
    <View style={styles.batchSelection}>
      <View style={styles.batchSelectionRow}>
        <Text style={styles.tabHeaderText}>Trial Class Selection</Text>
      </View>
      <View style={styles.batchOptionsContainer}>
      <Text style={styles.dateHeaderText}>Trial Date: </Text>
      <DatePicker 
date={date} 
mode='date'
textColor='rgba(255, 89, 89, 1)'
disabledDate={disabledDate}
onDateChange={checkDate} 
minDate={new Date()}
maxDate={new Date("2025-01-01")}
/>
</View>
      <View style={styles.batchOptionsContainer}>
        {getFilteredBatches(batches, level, sport.name)
          .sort((a, b) => {
            return batches[a].id.localeCompare(batches[b].id);
          })
          .filter((batchKey) => {
            if (pack === '6') {
              return true;
            }
            const {days} = batches[batchKey];
            return includesMonday
              ? days.includes('Mon')
              : !days.includes('Mon');
          })
          .map((batchKey) => {
            const batchData = batches[batchKey];
            const {days, timings} = batchData;
            console.log('days', days.join(', '));
            console.log(batchData);
            return (
              <TouchableOpacity
                key={batchKey}
                style={
                  batch.key === batchKey
                    ? styles.activeBatchOptionsHeader
                    : styles.batchOptionsHeader
                }
                onPress={() => {
                  setBatch(batches[batchKey]);
                  setNextClassTimings(
                    timings.startTime.toString().substr(0, 2)
                    +':'
                    +timings.startTime.toString().substr(2, 2)
                    +'-'
                    +timings.endTime.toString().substr(0, 2)
                    +':'
                    +timings.endTime.toString().substr(2, 2)
                    )
                  setErr('');
                }}>
                <View style={styles.batchItem}>
                  <Text
                    style={
                      batch === batchKey
                        ? styles.activeBatchOptionsText
                        : styles.batchOptionsText
                    }>
                    {timings.startTime.toString().substr(0, 2)}
                    {':'}
                    {timings.startTime.toString().substr(2, 2)}
                    {' - '}
                    {timings.endTime.toString().substr(0, 2)}
                    {':'}
                    {timings.endTime.toString().substr(2, 2)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default TrialSelection;
const styles = StyleSheet.create({
  batchSelection: {
    justifyContent: 'center',
    marginTop: heightToDP('4%'),
    alignItems: 'center',
  },
  batchItem: {
    flexDirection: 'row',
  },
  batchSelectionRow: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    marginBottom: heightToDP('3%'),
    width: widthToDP('60%'),
    justifyContent: 'center',
  },
  tabHeaderText: {
    fontSize: widthToDP('5.5%'),
    fontFamily: 'Gilroy-Regular',
    marginBottom: heightToDP('1.5%'),
    marginRight: widthToDP('2%'),
    fontWeight: 'bold',
  },
  dateHeaderText: {
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-Regular',
    marginBottom: heightToDP('1.5%'),
    marginRight: widthToDP('2%'),
    marginTop: widthToDP('2%'),
    fontWeight: 'bold',
  },
  batchOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: widthToDP('5%'),
    marginTop: widthToDP('5%')
  },
  activeBatchOptions: {
    backgroundColor: '#fff',
    height: widthToDP('29%'),
    marginVertical: heightToDP('2%'),
    width: widthToDP('29%'),
    marginHorizontal: widthToDP('0.4%'),
    alignItems: 'center',
    borderColor: '#ff6362',
    borderWidth: 1,
    borderRadius: widthToDP('6%'),
    overflow: 'hidden',
  },
  batchOptionsHeader: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('45%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('1%'),
    marginVertical: widthToDP('1%'),
    borderRadius: widthToDP('5%'),
    borderWidth: 1,
    borderColor: '#ffff',
  },
  activeBatchOptionsHeader: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('45%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    marginVertical: widthToDP('1%'),
    borderWidth: 1,
    borderRadius: widthToDP('5%'),
    borderColor: '#ff6362',
  },
  batchOptionsText: {
    fontSize: widthToDP('4.5%'),
    color: 'rgba(94, 94, 94, 1)',
    fontFamily: 'Gilroy-Regular',
  },
  activeBatchOptionsText: {
    fontSize: widthToDP('4.5%'),
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
  },
  activeTabText: {
    fontSize: widthToDP('5%'),
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
  },
  tabText: {
    fontSize: widthToDP('5%'),
    color: 'rgba(94, 94, 94, 1)',
    fontFamily: 'Gilroy-Regular',
  },
  packSelection: {
    width: widthToDP('90%'),
    paddingBottom: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  packOptions: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('42%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
    borderWidth: 1,
    borderColor: '#ffff',
  },
  activePackOptions: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('42%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    borderWidth: 1,
    borderRadius: widthToDP('5%'),
    borderColor: '#ff6362',
  },
});
