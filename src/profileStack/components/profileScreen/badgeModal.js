import * as React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Close from '../../../../assets/icons/registration/close.svg';
import {useContext} from 'react';
import {AppContext} from '../../../../services/appContext';
import badgeData from './badgeData';
import Badges from './badges';

const BadgeModal = ({badgeID, modalVisible, setModalVisible}) => {
  const {user} = useContext(AppContext);
  const {badge, badgeHeader, badgeText} = badgeData[badgeID];
  let header = badgeHeader.split(' ');
  header.splice(0, 1);
  header = header.join(' ');
  const color = badgeHeader.charAt(0).toUpperCase();
  StatusBar.setHidden(true);

  const badgeHeaderText = () => {
    switch (color) {
      case 'G':
        return <Text style={styles.badgeGold}>Gold </Text>;
      case 'S':
        return <Text style={styles.badgeSilver}>Silver </Text>;
      case 'B':
        return <Text style={styles.badgeBronze}>Bronze </Text>;
    }
  };

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <View style={styles.badge}>
            <Badges type={badge} />
            <View style={styles.badgeFooter}>
              <Text style={{fontSize: widthToDP('4%')}}>
                {badgeHeaderText()}
                {header}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}>
              <Close />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>{badgeText}</Text>
          <View style={styles.modalFooter}>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.modalCertificate}>Get Certificate</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BadgeModal;
const styles = StyleSheet.create({
  modalCertificate: {
    marginLeft: 'auto',
    color: '#FF5959',
    fontSize: widthToDP('4%'),
  },
  modalFooter: {
    flexDirection: 'row',
    marginBottom: heightToDP('1.5%'),
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
    paddingVertical: heightToDP('1.5%'),
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: widthToDP('5%'),
    marginHorizontal: widthToDP('6%'),
  },
  modalText: {
    fontFamily: 'Gilroy-Regular',
    lineHeight: widthToDP('5.5%'),
    fontSize: widthToDP('4.5%'),
    marginVertical: heightToDP('2%'),
    color: 'rgba(90, 90, 90, 1)',
  },
  modalClose: {
    marginLeft: 'auto',
  },
  emailText: {
    color: '#5A5A5A',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  badgeFooter: {
    alignSelf: 'center',
    marginLeft: widthToDP('3%'),
  },
  badgeGold: {
    color: '#ECDD56',
  },
  badgeSilver: {
    color: '#AAAAAA',
  },
  badgeBronze: {
    color: '#6C5959',
  },
});
