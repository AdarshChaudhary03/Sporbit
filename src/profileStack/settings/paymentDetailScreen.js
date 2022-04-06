import React from 'react';
import {useContext} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import {AppContext} from '../../../services/appContext';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header';
import Email from '../../../assets/icons/payments/email 1.svg';
import Running from '../../../assets/icons/payments/running 1.svg';

export default function PaymentDetailScreen({route}) {
  const {payment} = route.params;
  const {user, players} = useContext(AppContext);
  console.log(payment);

  return (
    <View style={styles.container}>
      <Header text={'Payment'} />
      <ScrollView style={{paddingTop: heightToDP('8%')}}>
        {payment.playerID && (
          <View style={{paddingHorizontal: widthToDP('5%')}}>
            <View style={styles.studentNameBox}>
              <Text style={styles.studentNameText}>
                {players[payment.playerID].name}
              </Text>
            </View>
            <View style={styles.bigBox}>
              <Text style={styles.rowTextKey}>Academy</Text>
              <Text style={styles.rowTextValue}>
                {players[payment.playerID].academyName}
              </Text>
            </View>
            <View style={styles.bigBox}>
              <Text style={styles.rowTextKey}>Sports</Text>
              <Text style={styles.rowTextValue}>
                {players[payment.playerID].sports}
              </Text>
            </View>
            <View style={styles.bigBox}>
              <Text style={styles.rowTextKey}>Batch</Text>
              <Text style={styles.rowTextValue}>
                {players[payment.playerID].batchName}
              </Text>
            </View>
            <View style={styles.border} />
          </View>
        )}
        <View style={{paddingHorizontal: widthToDP('5%')}}>
          <View style={styles.smallBox}>
            <Text style={styles.rowTextKey}>Order ID</Text>
            <Text style={styles.rowTextValue}>{payment.key}</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.smallBox}>
            <Text style={styles.rowTextKey}>Transaction No.</Text>
            <Text style={styles.rowTextValue}>
              {payment.razorPayID ? payment.razorPayID.slice(4) : 'N/A'}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.smallBox}>
            <Text style={styles.rowTextKey}>Order Date</Text>
            <Text style={styles.rowTextValue}>
              {payment.paymentDate
                .toDate()
                .toLocaleString('en-GB', {timeZone: 'IST'})
                .split(' ')
                .splice(0, 3)
                .join(' ')}{' '}
              {payment.paymentDate
                .toDate()
                .toLocaleString('en-GB', {timeZone: 'IST'})
                .split(' ')[3]
                .split(':')
                .splice(0, 2)
                .join(':')}
            </Text>
          </View>
          <View style={styles.border} />
          <View style={styles.smallBox}>
            <Text style={styles.rowTextKey}>Payment Mode</Text>
            <Text style={styles.rowTextValue}>{payment.mode}</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.emailBox}>
            <Email />
            <View style={{marginHorizontal: widthToDP('2%')}} />
            <View style={styles.flexOne}>
              <Text style={styles.rowTextKey}>Email</Text>
              <Text style={styles.rowEmailValue}>{user.email}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Toast.show('Invoice has been sent.');
              }}>
              <Text style={styles.invoiceText}>Get Invoice</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.border} />
          <View style={styles.priceBox}>
            <Running />
            <View style={{marginHorizontal: widthToDP('2%')}} />
            <View style={styles.flexOne}>
              <Text style={styles.rowTextKey}>Price</Text>
              <Text style={styles.discountText}>Discount</Text>
              <Text style={styles.rowTextValue}>GST @ 18%</Text>
            </View>
            <View>
              <Text style={styles.rowTextValue}>₹ {payment.amount / 100}</Text>
              <Text style={styles.discountText}>₹ ---</Text>
              <Text style={styles.rowTextValue}>₹ ---</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.totalAmountBox}>
            <Text style={styles.rowTextValue}>Total Amount</Text>
            <Text style={styles.rowTextValue}>₹ {payment.amount / 100}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  flexOne: {
    flex: 1,
  },
  studentNameBox: {
    margin: heightToDP('2%'),
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('2.5%'),
    paddingVertical: heightToDP('0.5%'),
    backgroundColor: 'rgba(255, 89, 89, 1)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentNameText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  bigBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: heightToDP('1%'),
  },
  rowTextKey: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: widthToDP('4.2%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  rowTextValue: {
    color: 'black',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-Regular',
  },
  rowEmailValue: {
    color: 'black',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-Regular',
  },
  smallBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightToDP('2%'),
    marginHorizontal: heightToDP('1%'),
  },
  emailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightToDP('2%'),
  },
  priceBox: {
    flexDirection: 'row',
    marginTop: heightToDP('2%'),
    marginBottom: heightToDP('1%'),
  },
  discountText: {
    color: 'black',
    fontSize: widthToDP('4.5%'),
    marginVertical: widthToDP('2%'),
    fontFamily: 'Gilroy-Regular',
  },
  totalAmountBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: widthToDP('11%'),
    marginVertical: heightToDP('0.5%'),
  },
  invoiceText: {
    color: '#FF5959',
    fontSize: widthToDP('4.5%'),
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
  },
  border: {
    borderBottomWidth: 0.7,
    borderStyle: 'solid',
    borderColor: 'rgba(159, 159, 159, 1)',
  },
});
