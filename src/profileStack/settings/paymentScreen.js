import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import RazorpayCheckout from 'react-native-razorpay';
import {AppContext} from '../../../services/appContext';
import {getCoupons, getPayments, getSubscription} from '../../../services/getters';
import {
  addPaymentItem,
  updatePaymentItem,
  updateSubscriptionItem,
} from '../../../services/setters';
import Header from '../../components/header';
import PaymentFooter from '../../components/paymentFooter';
import FrontArrow from '../../../assets/icons/facilitySelection/frontArrow.svg';
import { TextInput } from 'react-native-gesture-handler';

export default function PaymentScreen({navigation}) {
  const {user, players} = useContext(AppContext);
  const [paymentsList, setPaymentsList] = useState({});
  const [paymentFooter, setPaymentFooter] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [past, setPast] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [ couponCode , setCouponCode ] = useState("");
  const [ coupons, setCoupons ] = useState({});
  const [ percentOff, setPercentOff ] = useState("");
  const [ couponValid, setCouponValid ] = useState(false);
  const [ currentPayment, setCurrentPayment ] = useState('');
  const [ showCoupon, setShowCoupon ] = useState(false);
  const [ currentPaymentID, setCurrentPaymentId ] = useState("");

  const handleCoupon = (coupon) => {
//    console.log(coupon);
    setCouponCode(coupon);
    setPercentOff("");
  }

  const removeCouponCode = () => {
//    console.log(currentPayment.amount);
    setPercentOff("");
    setCouponCode("");    
    setCouponValid(false);
    if(currentPayment.amount!=null)
    setPaymentFooter({...paymentFooter, amount: currentPayment.amount});
  }

  const applyCouponCode = (payment) => {
    console.log(payment);
    Object.keys(coupons).forEach(coupon => {
      if(couponCode===coupons[coupon].couponCode){
        console.log(coupons[coupon].percentOff);
        let paymentInfo = payment - ((coupons[coupon].percentOff/100)*payment);
//        paymentFooter['amount'] = paymentInfo;
        setPaymentFooter({...paymentFooter, amount: paymentInfo});
        setPercentOff(coupons[coupon].percentOff);
        setCouponValid(true);
      }
      else{
        alert('Invalid Coupon.');
//        paymentFooter['amount'] = payment.amount;
        setPaymentFooter({...paymentFooter, amount: payment});
        setCouponValid(false);
        setPercentOff("fail");
      }
    });
  }

  const durationRelation = {
    Monthly: 1,
    Quarterly: 3,
    'Half Yearly': 6,
    Yearly: 12,
  };
  // const offset = useRef(new Animated.Value(0)).current

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const paymentData = await getPayments();
    setPaymentsList(paymentData);
    setRefreshing(false);
  }, []);

  const paymentSuccess = async (payment) => {
    console.log("Entered paymentSuccess function");
    console.log(payment.key);
    console.log(currentPaymentID);
    await updatePaymentItem(currentPaymentID, payment);
//    await updatePaymentItem(payment.key, payment);
    let subscriptionData = await getSubscription(payment.subscriptionID);
    console.log(subscriptionData.dueDate);
    const date = new Date(
      subscriptionData.dueDate.setMonth(
        subscriptionData.dueDate.getMonth() +
          durationRelation[subscriptionData.payDuration],
      ),
    );
    const paymentData = {
      playerID: payment.playerID,
      subscriptionID: payment.subscriptionID,
      dueDate: date,
      description: payment.description,
      amount: payment.amount,
      user: user.uid,
      academy: payment.academy,
      status: 'Unpaid',
      mode: '',
      razorPayID: 'rzp_live_SdfK6jnDFZivon',
      paymentDate: null,
      previousPayment: payment.key,
    };
//    const paymentID = await addPaymentItem(paymentData);
    await updateSubscriptionItem(payment.subscriptionID, {
      dueDate: date,
      paymentID: currentPaymentID,
      status: 'active',
    });
    await onRefresh();
  };

  const pay = (payment) => {
    let options = {
      description: payment.description,
      // image:
      //   'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/assets_temp%2Fic_launcher.png?alt=media&token=7191e51f-e954-4c57-8ea9-24145dadcb9d',
      currency: 'INR',
      key: 'rzp_live_SdfK6jnDFZivon',
      amount: payment.amount * 100,
      // name: 'LastPage',
      //order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: user.email,
        contact: user.phoneNumber,
        name: user.displayName,
      },
      theme: {color: '#53a20e'},
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        payment.mode = 'razorpay';
        payment.paymentDate = new Date();
        const {razorpay_payment_id} = data;
        payment.razorPayID = razorpay_payment_id;
        payment.status = 'paid';
        // eslint-disable-next-line no-alert
        paymentSuccess(payment).then(() => {
          alert('Payment was successful');
          navigation.navigate('BottomTab');
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Payment was not successful');
      });
  };
  useEffect(() => {
    console.log('welcome');
    console.log(players);
    getCoupons().then(coupon => setCoupons(coupon));
    getPayments().then(async (paymentData) => {
      setPaymentsList(paymentData);
      setInitializing(false);
    });
    console.log('pays');
  }, []);

  return (
    <View style={styles.container}>
      <Header text={'Payments'} />
      <View style={styles.subHeading}>
        <TouchableOpacity
          onPress={() => setPast(!past)}
          style={past ? styles.subHeadingBoxActive : styles.subHeadingBox}>
          <View>
            <Text
              style={
                past ? styles.subHeadingTextActive : styles.subHeadingText
              }>
              {'Past '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPast(!past)}
          style={!past ? styles.subHeadingBoxActive : styles.subHeadingBox}>
          <View>
            <Text
              style={
                !past ? styles.subHeadingTextActive : styles.subHeadingText
              }>
              Upcoming
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {!Object.keys(paymentsList).length && !initializing && (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListTextA}>This looks Empty</Text>
          <Text style={styles.emptyListTextB}>
            You don't have any payments listed.
          </Text>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {past ? (
          <View>
            {Object.values(paymentsList)
              .filter((payment) => {
                return payment.status === 'paid';
              })
              .sort((a, b) => {
                return (
                  a.dueDate.toDate().getTime() - b.dueDate.toDate().getTime()
                );
              })
              .map((payment, index) => {
                console.log('das', payment.paymentDate);
                // payment.description = `Fees at ${payment.academyName}`;
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PaymentDetailScreen', {
                          payment: payment,
                        })
                      }>
                      <View style={styles.paymentBox}>
                        <Text style={styles.dueDate}>
                          {payment.paymentDate
                            .toDate()
                            .toLocaleString('en-GB', {timeZone: 'IST'})
                            .split(' ')
                            .splice(0, 3)
                            .join(' ')}
                        </Text>
                        <View style={styles.description}>
                          <Text style={styles.descText}>
                            {payment.description}
                          </Text>
                        </View>
                        <View style={styles.studentNameBox}>
                        <Text style={styles.studentNameText}>
                          {players[payment.playerID].name}
                        </Text>
                      </View>
                        <Text style={styles.amount}>
                          ₹ {percentOff ? (payment.amount - ((percentOff/100)*payment.amount)): payment.amount}
                        </Text>
                        <Text style={styles.mode}>{payment.mode}</Text>
                        <FrontArrow />
                        {/*<Text style={{flex: 1, textAlign: 'center'}}>*/}
                        {/*  {payment.paymentDate*/}
                        {/*    .toDate()*/}
                        {/*    .toUTCString()*/}
                        {/*    .split(' ')*/}
                        {/*    .splice(1, 2)*/}
                        {/*    .join(' ')}*/}
                        {/*</Text>*/}
                      </View>
                      <View style={styles.underline} />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        ) : (
          <View>
            {Object.values(paymentsList)
              .filter((payment) => {
                return (
                  payment.status === 'Unpaid'
                  // && payment.dueDate.toDate() - new Date() < 10 * 24 * 60 * 60 * 1000
                );
              })
              .sort((a, b) => {
                return (
                  a.dueDate.toDate().getTime() - b.dueDate.toDate().getTime()
                );
              })
              .map((payment, index) => {
                return (
                  <View key={index}>
                    <View style={styles.paymentBox}>
                      <Text style={styles.dueDate}>
                        {payment.dueDate
                          .toDate()
                          .toLocaleString('en-GB', {timeZone: 'IST'})
                          .split(' ')
                          .splice(0, 3)
                          .join(' ')}
                      </Text>
                      <View style={styles.description}>
                        <Text style={styles.descText}>
                          {payment.description}
                        </Text>
                      </View>
                      <View style={styles.studentNameBox}>
                        <Text style={styles.studentNameText}>
                          {players[payment.playerID].name}
                        </Text>
                      </View>
                      <Text style={styles.amount}>
                        ₹ {payment.amount}
                      </Text>
                      <Text style={styles.mode}>
                        {payment.mode.charAt(0).toUpperCase() +
                          payment.mode.slice(1)}
                      </Text>
                      <View style={styles.renewChangeBox}>
                        <TouchableOpacity
                          onPress={() => {
                            const tempPayment = {...payment};
                            setPaymentFooter(tempPayment);
                            setCurrentPayment(tempPayment);
                            setShowCoupon(true);
                            setCurrentPaymentId(payment.key);
                            removeCouponCode();
                          }}>
                          <Text style={styles.renewText}>Pay |</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('Subscriptions', {
                              playerID: payment.playerID,
                            });
                          }}>
                          <Text style={styles.changeText}> Change</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.underline} />                    
                  </View>
                );
              })}
                    {showCoupon ? <View style={styles.subsBox}>
      <TextInput style = {styles.input}
               underlineColorAndroid = "#FF5959"
               width="60%"
               placeholder = "Apply Coupon Code"
               placeholderTextColor = "#FF5959"
               autoCapitalize = "characters"
               value={couponCode}
               onChangeText = {handleCoupon}/>       
        {!percentOff ? <TouchableOpacity
          style={styles.couponButton}
          onPress={() => applyCouponCode(paymentFooter.amount)}>
          <Text style={styles.couponButtonText}>Apply Coupon</Text>
        </TouchableOpacity>:
        <TouchableOpacity
          onPress={() => removeCouponCode()}>
                          <View style={styles.applyText}>                          
                            <Text style={styles.couponFailue}>Remove</Text>
              </View>
              </TouchableOpacity>
              }                       
      </View> : null}
      {couponValid ? <View style={styles.applyText}>
        <Text style={styles.couponSuccess}>Coupon applied successfully.</Text>
        </View>: null}                    
        {percentOff=='fail' && !couponValid ? <View style={styles.applyText}>
        <Text style={styles.couponFailue}>Coupon is invalid/expired.</Text>
        </View> : null}                   
          </View>
        )}
      </ScrollView>
      {paymentFooter ? (
        <PaymentFooter
          onPay={() => pay(paymentFooter)}
          amount={paymentFooter.amount}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  subHeading: {
    paddingTop: heightToDP('8%'),
    flexDirection: 'row',
    marginBottom: heightToDP('1%'),
  },
  subHeadingBox: {
    paddingVertical: heightToDP('1%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(159, 159, 159, 1)',
  },
  subHeadingBoxActive: {
    borderBottomWidth: 1.5,
    borderStyle: 'solid',
    borderColor: 'rgba(255, 89, 89, 1)',
    borderRadius: 1,
    paddingVertical: heightToDP('1%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeadingText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginVertical: heightToDP('0.5%'),
    color: 'rgba(94, 94, 94, 1)',
  },
  subHeadingTextActive: {
    fontSize: widthToDP('5%'),
    marginVertical: heightToDP('0.5%'),
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
  },
  emptyList: {
    marginTop: 20,
    alignItems: 'center',
    height: heightToDP('50%'),
    justifyContent: 'center',
    marginHorizontal: widthToDP('12%'),
    alignSelf: 'center',
  },
  emptyListTextA: {
    fontSize: widthToDP('5%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyListTextB: {
    textAlign: 'center',
    fontSize: widthToDP('4%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  studentNameBox: {
    position: 'absolute',
    alignItems: 'center',
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('2%'),
    paddingVertical: heightToDP('0.2%'),
    backgroundColor: 'rgba(255, 89, 89, 1)',
    width: widthToDP('25%'),
    top: 0,
    left: widthToDP('35%'),
  },
  studentNameText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
  },
  paymentBox: {
    height: heightToDP('12%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: widthToDP('4%'),
    marginVertical: heightToDP('1.2%'),
  },
  dueDate: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    fontSize: widthToDP('3.8%'),
    color: '#000000',
  },
  description: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: widthToDP('30%'),
  },
  descText: {
    fontWeight: 'bold',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
  },
  amount: {
    position: 'absolute',
    top: 0,
    right: widthToDP('5%'),
    fontSize: widthToDP('4.5%'),
    color: '#5F5F5F',
    fontFamily: 'Gilroy-Regular',
  },
  mode: {
    position: 'absolute',
    bottom: 0,
    right: widthToDP('5%'),
    fontWeight: 'bold',
    fontSize: widthToDP('3.6%'),
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
  },
  renewChangeBox: {
    position: 'absolute',
    bottom: 0,
    right: widthToDP('5%'),
    flexDirection: 'row',
  },
  renewText: {
    fontWeight: 'bold',
    fontSize: widthToDP('3.6%'),
    color: 'rgba(255, 89, 89, 1)',
    fontFamily: 'Gilroy-SemiBold',
  },
  changeText: {
    fontWeight: 'bold',
    fontSize: widthToDP('3.6%'),
    color: 'rgba(255, 89, 89, 1)',
    fontFamily: 'Gilroy-SemiBold',
  },
  underline: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'rgba(159, 159, 159, 1)',
  },
  couponButtonText: {
    fontSize: 17,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
  },
  couponButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightToDP('5%'),
    width: '38%',
    backgroundColor: '#FF5959',
    borderRadius: 10,
  },
  subsBox: {
    paddingVertical: heightToDP('2%'),
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('7%'),
    flexDirection: 'row',
  },
  applyText: {
    paddingHorizontal: widthToDP('7%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  couponSuccess: {
    fontSize: 17,
    color: 'green',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
  },
  couponFailue: {
    fontSize: 17,
    color: 'red',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
  },

});
