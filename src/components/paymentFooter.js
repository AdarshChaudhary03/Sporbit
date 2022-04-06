import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React from 'react';
// import {useContext} from 'react';
import {heightToDP, widthToDP} from '../../services/utils';
import { TextInput } from 'react-native-gesture-handler';
// import {AppContext} from '../../services/appContext';


const handleCoupon = (coupon) => {
  console.log(coupon);
  setCouponCode(coupon);
}

const applyCouponCode = () => {
  Object.keys(coupons).forEach(coupon => {
    if(couponCode===coupons[coupon].couponCode){
      console.log(coupons[coupon].percentOff);
      setPercentOff(coupons[coupon].percentOff);
    }
    else{
      console.log('Invalid Coupon.');
    }
  });
}


const PaymentFooter = ({onPay, amount}) => {
  // const {user} = useContext(AppContext);
  return (
    <View style={styles.footer}>
      {/*<View style={styles.footerHeader}>*/}
      {/*    <View>*/}
      {/*        <Text style={styles.invoiceText}>Get Invoice</Text>*/}
      {/*        <Text style={styles.mailText}>{user.email}</Text>*/}
      {/*    </View>*/}
      {/*    <TouchableOpacity>*/}
      {/*        <Text style={styles.changeText}>Change</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*</View>*/}
      <View style={styles.footerFooter}>
        <View style={styles.subsBox}>
          <Text style={styles.subsText}>₹ {amount}</Text>
          <TouchableOpacity>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.proceedPay} onPress={() => onPay()}>
          <Text style={styles.proceedText}>PROCEED TO PAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  footerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: widthToDP('7%'),
    marginRight: widthToDP('5%'),
  },
  invoiceText: {
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
    fontSize: widthToDP('4%'),
  },
  mailText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  changeText: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  detailsText: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  footerFooter: {
    flexDirection: 'row',
    flex: 1,
    marginTop: heightToDP('0%'),
  },
  subsBox: {
    backgroundColor: 'rgba(242, 242, 242, 1)',
    flex: 1,
    paddingVertical: heightToDP('1%'),
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
    paddingVertical: heightToDP('1%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: widthToDP('100%'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: heightToDP('0%'),
  },
  proceedText: {
    color: 'white',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
});
