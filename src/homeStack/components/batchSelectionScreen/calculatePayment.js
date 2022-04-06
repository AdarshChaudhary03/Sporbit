import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {widthToDP, heightToDP} from '../../../../services/utils';
const CalculatePayment = (props) => {
  const {level, pack, payDuration} = props;
  console.log(level, pack, payDuration);
  const durationRelation = {
    Monthly: 1,
    Quarterly: 3,
    'Half Yearly': 6,
    Yearly: 12,
  };
  let payment = 2000;
  let discount = 0;
  let paymentTotal;
  const levelDetails = {
    Beginner: 2000,
    Intermediate: 3000,
    Advanced: 7000,
    Professional: 10000,
  };
  for (let key in levelDetails) {
    if (key === level) {
      payment = levelDetails[key];
    }
  }
  if (pack === '6') {
    payment = payment * 2;
    discount = 0.1 * payment;
  }
  paymentTotal = payment - discount;
  return (
    <View style={styles.paymentDetails}>
      <Text style={styles.tabHeaderText}> PAYMENT </Text>
      <View style={styles.paymentDetailsLine}>
        <View style={styles.paymentText}>
          <Text>SUBTOTAL</Text>
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.paymentAmountText}>{payment}</Text>
        </View>
      </View>
      <View style={styles.paymentDetailsLine}>
        <View style={styles.paymentText}>
          <Text>DISCOUNT</Text>
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.paymentAmountText}>{discount}</Text>
        </View>
      </View>
      <View style={styles.paymentDetailsLine}>
        <View style={styles.paymentText}>
          <Text>TOTAL</Text>
        </View>
        <View style={styles.paymentAmount}>
          <Text style={styles.paymentAmountText}>
            {paymentTotal * durationRelation[payDuration]}/{' '}
            {durationRelation[payDuration]} month(s)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalculatePayment;

const styles = StyleSheet.create({
  tabHeaderText: {
    fontSize: widthToDP('5%'),
    marginBottom: 10,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  paymentSelection: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    marginLeft: 50,
  },
  paymentOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderColor: '#000000',
  },
  activePaymentOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: widthToDP('100%'),
    margin: 10,
    borderColor: '#ff6362',
  },
  paymentDetails: {
    alignItems: 'center',
    paddingTop: 20,
    width: widthToDP('100%'),
    overflow: 'hidden',
  },
  paymentDetailsLine: {
    height: heightToDP('8%'),
    paddingHorizontal: 50,
    alignItems: 'center',
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  paymentText: {
    flex: 1,
    color: '#000000',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    fontSize: widthToDP('6%'),
  },
  paymentAmount: {
    flex: 2,
    color: '#b5b5b5',
    textAlign: 'right',
  },
  paymentAmountText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    color: '#000',
  },
  paymentButton: {
    justifyContent: 'center',
    height: heightToDP('6%'),
    width: widthToDP('60%'),
    paddingHorizontal: widthToDP('6%'),
    alignItems: 'center',
    marginVertical: heightToDP('6%'),
    backgroundColor: '#ff6362',
    borderRadius: 30,
  },
  paymentButtonText: {
    fontSize: widthToDP('6%'),
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
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
