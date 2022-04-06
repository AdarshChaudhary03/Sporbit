import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {getBatches} from '../../../../services/getters';

const getFilteredBatches = (batches, pack, level) => {
  return Object.keys(batches).filter((batch) => {
    batch = batches[batch];
    const {days} = batch;
    console.log('batch.level', batch.level);
    console.log('batch.level', level);
    console.log('batch.level', pack);
    console.log('batch.level', days.length);
      return (batch.level === level || level === 'Superbatch' || level === 'Munchkin') && (parseInt(pack, 10) === days.length || days.length === 4);
  });
};

const BatchSelection = ({academyID, pack, level, batch, setBatch, setErr}) => {
  console.log("pack: "+pack);
  const [includesMonday, setIncludesMonday] = useState(true);
  const [batches, setBatches] = useState(false);
  useEffect(() => {
    getBatches(academyID).then((batchesData) => {
      console.log(Object.keys(batchesData));
      setBatches(batchesData);
    });
  }, [academyID]);

  return (
    <View style={styles.batchSelection}>
      <View style={styles.batchSelectionRow}>
        <Text style={styles.tabHeaderText}>Batch Selection</Text>
      </View>
      {pack === '3' ? (
        <View style={styles.packSelection}>
          <TouchableOpacity
            onPress={() => {
              setIncludesMonday(true);
            }}
            style={
              includesMonday ? styles.activePackOptions : styles.packOptions
            }>
            <Text
              style={includesMonday ? styles.activeTabText : styles.tabText}>
              {level==='Superbatch' ? 'Mon Wed Fri Sat': 'Mon Wed Fri'}
            </Text>
          </TouchableOpacity>
          {level!=='Superbatch' ? <TouchableOpacity
            onPress={() => {
              setIncludesMonday(false);
            }}
            style={
              !includesMonday ? styles.activePackOptions : styles.packOptions
            }>
            <Text
              style={!includesMonday ? styles.activeTabText : styles.tabText}>
              Tue Thu Sat
            </Text>
          </TouchableOpacity> : null}
        </View>
      ) : null}

{pack === '2' ? (
        <View style={styles.packSelection}>
          <TouchableOpacity
            onPress={() => {
              setIncludesMonday(true);
            }}
            style={
              includesMonday ? styles.activePackOptions : styles.packOptions
            }>
            <Text
              style={includesMonday ? styles.activeTabText : styles.tabText}>
              {level==='Superbatch' ? 'Mon Wed Fri Sat' : 'Sat Sun'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

{(pack === 's42' || pack === 's62' || pack === 's43' || pack === 's63') ? (
        <View style={styles.packSelection}>
          <TouchableOpacity
            onPress={() => {
              setIncludesMonday(true);
            }}
            style={
              includesMonday ? styles.activePackOptions : styles.packOptions
            }>
            <Text
              style={includesMonday ? styles.activeTabText : styles.tabText}>
              Mon Wed Fri Sat
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}


{pack === '6' ? (
        <View style={styles.packSelection}>
          <TouchableOpacity
            onPress={() => {
              setIncludesMonday(true);
            }}
            style={
              includesMonday ? styles.activePackOptions : styles.packOptions
            }>
            <Text
              style={includesMonday ? styles.activeTabText : styles.tabText}>
              Mon Tue Wed Thu Fri Sat
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}


      <View style={styles.batchOptionsContainer}>
        {getFilteredBatches(batches, pack, level)
          .sort((a, b) => {
            return batches[a].id.localeCompare(batches[b].id);
          })
/*          .filter((batchKey) => {
            if (pack === '6' || pack === '2') {
              return true;
            }
            const {days} = batches[batchKey];
            return includesMonday
              ? days.includes('Mon')
              : !days.includes('Mon');
          })*/
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
                  console.log('batches[batchKey]');
                  console.log(batches[batchKey]);
                  setBatch(batches[batchKey]);
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

export default BatchSelection;
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
  batchOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: widthToDP('5%'),
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
