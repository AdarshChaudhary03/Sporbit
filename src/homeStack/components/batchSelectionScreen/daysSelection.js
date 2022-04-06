import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';

const DaysSelection = ({pack, setPack, setBatch, sports, level}) => {
  console.log('levelllllll',level);
  return (
    <View style={styles.container}>
      <View style={styles.frequencyHeaderRow}>
        <Text style={styles.tabHeaderText}>Frequency of Class</Text>
      </View>
      <View style={styles.packSelection}>
      <TouchableOpacity
          onPress={() => {
            setPack((sports.name==='Tennis' && level==='Superbatch') ? 's42' : '2');
            setBatch({key: false});
          }}
          style={(pack === '2' || pack === 's42') ? styles.activePackOptions : styles.packOptions}>
          <Text style={(pack === '2' || pack === 's42') ? styles.activeTabText : styles.tabText}>
            {(sports.name==='Tennis' && level==='Superbatch') ? '4 days-2 hrs/week' : '2 days/week' }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPack((sports.name==='Tennis' && level==='Superbatch') ? 's62' : '3');
            setBatch({key: false});
          }}
          style={(pack === '3' || pack === 's62') ? styles.activePackOptions : styles.packOptions}>
          <Text style={(pack === '3' || pack === 's62') ? styles.activeTabText : styles.tabText}>
            {(sports.name==='Tennis' && level==='Superbatch') ? '6 days-2 hrs/week' : '3 days/week' }
          </Text>
        </TouchableOpacity>
      </View>
      {level!=='Superbatch' ? <View style={styles.packSelection}>
        <TouchableOpacity
          onPress={() => {
            setPack('6');
            setBatch({key: false});
          }}
          style={pack === '6' ? styles.activePackOptions : styles.packOptions}>
          <Text style={pack === '6' ? styles.activeTabText : styles.tabText}>
          6 days/week
          </Text>
        </TouchableOpacity>
      </View> : null}
      {sports.name==='Tennis' && level==='Superbatch' ? <View style={styles.packSelection}>
        <TouchableOpacity
          onPress={() => {
            setPack('s43');
            setBatch({key: false});
          }}
          style={pack === 's43' ? styles.activePackOptions : styles.packOptions}>
          <Text style={pack === 's43' ? styles.activeTabText : styles.tabText}>
          4 days- 3hrs/week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPack('s63');
            setBatch({key: false});
          }}
          style={pack === 's63' ? styles.activePackOptions : styles.packOptions}>
          <Text style={pack === 's63' ? styles.activeTabText : styles.tabText}>
          6 days- 3hrs/week
          </Text>
        </TouchableOpacity>
      </View> : null}
          </View>
  );
};
export default DaysSelection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: heightToDP('3%'),
  },
  frequencyHeaderRow: {
    flexDirection: 'row',
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
  backButton: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 20,
  },
});
