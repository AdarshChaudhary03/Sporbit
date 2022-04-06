import * as React from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Details from '../../../../assets/icons/courses/details.svg';
import Whatsapp from '../../../../assets/icons/courses/whatsapp.svg';
import Clock from '../../../../assets/icons/academies/clock.svg';
import Location from '../../../../assets/icons/academies/location.svg';
import {reactNavigation} from '../../../../services';
import firebaseSetup from '../../../../services/setup';
import {Avatar} from 'react-native-elements';
const {firestore} = firebaseSetup();

const CourseCard = ({item}) => {
  const getAcademies = async (academyID) => {
    const academyRef = await firestore()
      .collection('academies')
      .doc(academyID)
      .get();
    const academyData = academyRef.data();
    locationPressed(academyData);
  };
  const locationPressed = (academyData) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${academyData.latitude},${academyData.longitude}`;
    const label = academyData.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url).then(() => {});
  };
  console.log('Entered1');
//  console.log(item.nextClassTime);
//  console.log(
//    item.nextClassTime!=null ?
//    (item.nextClassTime
//      .toLocaleString('en-GB', {timeZone: 'IST'})
//      .split(' ')
//      .slice(0, 4)
 //     .join(' ')): null,
 // );
  return (
    <View style={styles.renderBox}>
      <TouchableOpacity
        style={styles.renderHeader}
        onPress={() => {
          reactNavigation.navigate('CourseScreen', {playerID: item.id})
        }
        }>
        <Avatar
          rounded
          size={widthToDP('12%')}
          title={item.initials}
          source={{
            uri: item.photoURL ? item.photoURL : 'avatar',
          }}
        />
        {/*TODO: Figure out academy getting logic*/}
        <View style={styles.headerSubBox}>
          <View style={{width: widthToDP('45%')}}>
            <Text style={styles.playerName}>{item.name.toUpperCase()}</Text>
            <View style={styles.detailsView}>
              <Details />
              <Text style={styles.detailsText}>More Details</Text>
            </View>
          </View>
          {item.status === 'On Trial' ? (
            <Text style={[styles.statusText, styles.statusColorB]}>
              On - Trial
            </Text>
          ) : (
            <Text style={[styles.statusText, styles.statusColor]}>
              Registered
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.footerFooterBox}>
        <TouchableOpacity
          style={styles.whatsapp}
          onPress={() => {
            Linking.openURL('whatsapp://send?phone=+918448495757').then();
          }}>
          <Whatsapp />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBox}
          onPress={() =>
            reactNavigation.navigate('CourseScreen', {playerID: item.id})
          }>
          <Text style={styles.contentTextHeader}>Class @</Text>
          <Text style={styles.contentText}>{item.academyName}</Text>
        </TouchableOpacity>
        <View style={styles.contentBox}>
          <Text style={styles.contentTextHeader}>Next Class</Text>
          <View style={styles.flexRow}>
            <Clock />
            <Text style={styles.nextClassDate}>
              {item.nextClassDate===null ? '' : item.nextClassTime}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerFooter}>
        <TouchableOpacity
          style={styles.batchBox}
          onPress={() =>
            reactNavigation.navigate('CourseScreen', {playerID: item.id})
          }>
          <Text style={styles.contentTextHeader}>Batch</Text>
          <Text style={styles.contentText}>{item.batchName}</Text>
        </TouchableOpacity>
        <View style={styles.addressBox}>
          <TouchableOpacity onPress={() => getAcademies(item.academy.id)}>
            <Location />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getAcademies(item.academy.id)}>
            <Text style={[styles.nextClassDate, styles.underline]}>
              {item.academyAddress}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  renderBox: {
    margin: widthToDP('3%'),
    backgroundColor: '#ffff',
    elevation: 5,
    borderRadius: widthToDP('4%'),
    paddingBottom: heightToDP('2%'),
  },
  renderHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: 'rgba(183, 183, 183, 1)',
    paddingHorizontal: widthToDP('5%'),
    paddingTop: widthToDP('5%'),
    paddingBottom: heightToDP('1%'),
  },
  profileImage: {
    width: widthToDP('12%'),
    height: widthToDP('13%'),
    borderRadius: widthToDP('50%'),
  },
  headerSubBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: widthToDP('3%'),
  },
  playerName: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
  },
  detailsView: {
    flexDirection: 'row',
    marginTop: heightToDP('1%'),
  },
  detailsText: {
    color: 'rgba(255, 89, 89, 1)',
    marginLeft: widthToDP('2%'),
  },
  statusText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: widthToDP('1.5%'),
    color: 'white',
    paddingHorizontal: widthToDP('3%'),
    fontFamily: 'Gilroy-Regular',
    fontWeight: 'bold',
    paddingVertical: heightToDP('0.1%'),
  },
  whatsapp: {
    position: 'absolute',
    right: widthToDP('0%'),
    top: widthToDP('2%'),
  },
  footerFooterBox: {
    flexDirection: 'row',
    paddingLeft: widthToDP('5%'),
  },
  contentBox: {
    flex: 1,
    marginTop: heightToDP('2%'),
  },
  contentText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
  },
  contentTextHeader: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4.3%'),
    marginBottom: heightToDP('0.8%'),
    fontWeight: 'bold',
  },
  nextClassDate: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
    marginLeft: widthToDP('2%'),
  },
  addressBox: {
    flex: 1,
    flexDirection: 'row',
  },
  emptyList: {
    marginTop: 20,
    alignItems: 'center',
    height: heightToDP('50%'),
    justifyContent: 'center',
  },
  emptyListTextA: {
    fontSize: widthToDP('5%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyListTextB: {
    fontSize: widthToDP('4%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  footerFooter: {
    flexDirection: 'row',
    marginTop: heightToDP('2%'),
  },
  batchBox: {
    flex: 1,
    paddingLeft: widthToDP('5%'),
  },
  statusColor: {
    backgroundColor: 'rgba(20, 154, 25, 1)',
  },
  statusColorB: {
    backgroundColor: 'rgba(255, 1, 1, 1)',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
