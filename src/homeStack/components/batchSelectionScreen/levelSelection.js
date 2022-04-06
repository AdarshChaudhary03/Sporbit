import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import {widthToDP, heightToDP} from '../../../../services/utils';
import Info from '../../../../assets/icons/registration/info.svg';
import Close from '../../../../assets/icons/registration/close.svg';

const LevelSelection = ({level, setLevel, setBatch, sports}) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('sports.name', sports.name);
  const levels = ['Beginner', 'Intermediate', 'Advanced', sports.name==='Tennis' ? 'Superbatch' : (sports.name==='Cricket' ? 'Munchkin' : 'Professional')];
  return (
    <View style={styles.levelSelection}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <View style={styles.modalClose}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Close />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>
              Use your best guess in deciding the current level. Final level
              will be determined during your trial class.
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.levelHeaderRow}>
        <Text style={styles.tabHeaderText}>Level of Student</Text>
        <TouchableOpacity
          style={{marginTop: widthToDP('1.3%'), marginLeft: widthToDP('1%')}}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Info />
        </TouchableOpacity>
      </View>
      <View style={styles.levelSelectionTabs}>
        {levels.map((levelData) => {
          return (
            <TouchableOpacity
              disabled={levelData === 'Professionals'}
              key={levelData}
              onPress={() => {
                setLevel(levelData);
                setBatch({key: true});
              }}
              style={
                level === levelData
                  ? styles.activeLevelOptions
                  : styles.levelOptions
              }>
              <Text
                style={
                  level === levelData ? styles.activeTabText : styles.tabText
                }>
                {levelData}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default LevelSelection;
const styles = StyleSheet.create({
  tabHeaderText: {
    fontSize: widthToDP('5.5%'),
    fontFamily: 'Gilroy-Regular',
    marginBottom: heightToDP('1.5%'),
    marginRight: widthToDP('2%'),
    fontWeight: 'bold',
  },
  levelSelection: {
    justifyContent: 'center',
    marginTop: heightToDP('2%'),
    alignItems: 'center',
  },
  levelHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginBottom: heightToDP('3%'),
    width: widthToDP('60%'),
    justifyContent: 'center',
  },
  levelSelectionTabs: {
    height: heightToDP('14%'),
    width: widthToDP('90%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  levelOptions: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: widthToDP('42%'),
    alignItems: 'center',
    paddingHorizontal: widthToDP('4%'),
    paddingVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
    borderWidth: 1,
    borderColor: '#ffff',
    marginBottom: heightToDP('2%'),
  },
  activeLevelOptions: {
    marginBottom: heightToDP('2%'),
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
  modalBackground: {
    flex: 1,
    opacity: 0.94,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalBox: {
    borderWidth: 1,
    paddingHorizontal: widthToDP('5%'),
    paddingTop: heightToDP('2%'),
    marginBottom: heightToDP('2%'),
    elevation: 5,
    backgroundColor: 'white',
    paddingBottom: heightToDP('5%'),
    borderRadius: widthToDP('5%'),
    marginHorizontal: widthToDP('6%'),
  },
  modalText: {
    fontFamily: 'Gilroy-Regular',
    lineHeight: widthToDP('5.5%'),
    fontSize: widthToDP('4.5%'),
    marginVertical: heightToDP('2%'),
  },
  modalClose: {
    alignItems: 'flex-end',
  },
});
