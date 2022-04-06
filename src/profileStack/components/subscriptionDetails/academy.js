import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {AppContext} from '../../../../services/appContext';
import Toast from 'react-native-simple-toast';
import Header from '../../../components/header';

export default function Academy(props) {
  const {players} = useContext(AppContext);
  console.log(props);
  const {subscription} = props;
  const [academy, setAcademy] = useState(subscription.academyName);
  const [sports, setSports] = useState(subscription.sportName);
  const [batch, setBatch] = useState('TTS-B');
  const [plan, setPlan] = useState(subscription.payDuration);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Non']);
    setButtonPressed(false);
  }, []);

  console.log(subscription.studentName);
  if (buttonPressed) {
    return (
      <View style={styles.container}>
        <Header text={'Academy'} />
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {subscription.type.toUpperCase()}
          </Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.rowTextHeader}>Academy</Text>
          <Text style={styles.rowText}>{academy}</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.rowTextHeader}>Sport</Text>
          <Text style={styles.rowText}>{sports}</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.rowTextHeader}>Batch</Text>
          <Text style={styles.rowText}>{batch}</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.rowTextHeader}>Plan</Text>
          <Text style={styles.rowText}>{plan}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerHeader}>
            <View>
              <Text style={styles.invoiceText}>Get Invoice</Text>
              <Text style={styles.mailText}>dhruv@gmail.com</Text>
            </View>
            <Text style={styles.changeText}>Change</Text>
          </View>
          <View style={styles.footerFooter}>
            <View style={styles.subsBox}>
              <Text style={styles.subsText}>₹ {subscription.amount}</Text>
            </View>
            <TouchableOpacity style={styles.proceedPay}>
              <Text style={styles.proceedText}>PROCEED TO PAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header text={'Academy'} />
        <ScrollView style={{paddingTop: heightToDP('8%')}}>
          <View style={styles.referralPara}>
            <Text style={styles.referText}>Academy</Text>
            <TextInput
              editable={false}
              style={styles.referText1}
              defaultValue={players[subscription.playerID].academyName}
              onChangeText={(text) => setAcademy(text)}
            />
            <View style={styles.referCode}>
              <Text style={styles.rowTextKey}>_</Text>
            </View>
          </View>
          <View style={styles.referralPara}>
            <Text style={styles.referText}>Sports</Text>
            <TextInput
              editable={false}
              style={styles.referText1}
              defaultValue={subscription.sportName}
              onChangeText={(text) => setSports(text)}
            />
            <View style={styles.referCode}>
              <Text style={styles.rowTextKey}>_</Text>
            </View>
          </View>
          <View style={styles.referralPara}>
            <Text style={styles.referText}>Select Batch</Text>
            <TextInput
              editable={false}
              style={styles.referText1}
              defaultValue={players[subscription.playerID].batchName}
              onChangeText={(text) => setBatch(text)}
            />
            <TouchableOpacity
              style={styles.referCode}
              onPress={() =>
                Toast.show('Contact academy management to change batch.')
              }>
              <Text style={styles.rowTextKey}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.referralPara}>
            <Text style={styles.referText}>Select Plan</Text>
            <TextInput
              editable={false}
              style={styles.referText1}
              defaultValue={plan}
              onChangeText={(text) => setPlan(text)}
            />
            <TouchableOpacity
              style={styles.referCode}
              onPress={() => Toast.show('To be implemented')}>
              <Text style={styles.rowTextKey}>Change</Text>
            </TouchableOpacity>
          </View>
          {/*<TouchableOpacity onPress={() => setButtonPressed(true)}>*/}
          {/*  <Text style={styles.saveChangesButton}>Save Changes</Text>*/}
          {/*</TouchableOpacity>*/}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
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
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
  referralPara: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthToDP('6%'),
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: widthToDP('1.5%'),
    marginTop: heightToDP('5%'),
    height: heightToDP('8%'),
  },
  referText: {
    color: 'rgba(95, 95, 95, 1)',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-SemiBold',
    position: 'absolute',
    top: 0,
    left: widthToDP('2%'),
  },
  referText1: {
    color: '#5F5F5F',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  referCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextKey: {
    top: heightToDP('1%'),
    fontWeight: 'bold',
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('3.2%'),
    fontFamily: 'Gilroy-Regular',
  },
  saveChangesButton: {
    backgroundColor: 'rgba(255, 89, 89, 1)',
    color: 'white',
    paddingVertical: widthToDP('4%'),
    marginTop: heightToDP('10%'),
    alignSelf: 'center',
    borderRadius: widthToDP('10%'),
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    paddingHorizontal: widthToDP('13%'),
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    marginTop: heightToDP('3%'),
    borderBottomColor: 'rgba(159, 159, 159, 1)',
    marginHorizontal: widthToDP('6%'),
    paddingBottom: heightToDP('1%'),
  },
  rowTextHeader: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
    color: 'black',
  },
  rowText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4.5%'),
    color: 'black',
  },
  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: widthToDP('7%'),
    marginRight: widthToDP('5%'),
  },
  invoiceText: {
    fontFamily: 'Gilroy-SemiBold',
  },
  mailText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
  },
  changeText: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  footerFooter: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: heightToDP('2%'),
  },
  subsBox: {
    backgroundColor: 'rgba(242, 242, 242, 1)',
    flex: 1,
    paddingVertical: heightToDP('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subsText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  proceedPay: {
    backgroundColor: 'rgba(20, 154, 25, 0.61)',
    flex: 1,
    paddingVertical: heightToDP('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: widthToDP('100%'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: heightToDP('3%'),
  },
  proceedText: {
    color: 'white',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
});
