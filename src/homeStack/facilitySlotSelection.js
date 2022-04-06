import React from 'react';
import {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {heightToDP, widthToDP} from '../../services/utils';
import {getFacilityBookings} from '../../services/getters';

import BackArrow from '../../assets/icons/facilitySelection/backArrow.svg';
import FrontArrow from '../../assets/icons/facilitySelection/frontArrow.svg';
import {
  addPaymentItem,
  addSlotBooking,
  updateUserBookings,
} from '../../services/setters';
import RazorpayCheckout from 'react-native-razorpay';
import {AppContext} from '../../services/appContext';
import Header from '../components/header';
import PaymentFooter from '../components/paymentFooter';

const FacilitySlotSelection = (props) => {
  const {route, navigation} = props;
  const {user} = useContext(AppContext);
  const {facility} = route.params;
  const initialDate =
    new Date().getHours() < 12
      ? new Date().getTime()
      : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [dateTimes, setDateTimes] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [initializing, setInitializing] = useState(true);

  const courts = [1, 2, 3, 4, 5];

  const bookSlot = () => {
    let options = {
      description: 'Facility Booking at ' + facility.name,
      currency: 'INR',
      key: 'rzp_live_SdfK6jnDFZivon',
      amount: selectedSlots.length * 20000,
      prefill: {
        email: user.email,
        contact: user.phoneNumber,
        name: user.displayName,
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        //TODO:Check if slot is available
        let payment = {};
        payment.mode = 'razorpay';
        payment.facility = facility.id;
        payment.paymentDate = new Date();
        ({razorpay_payment_id: payment.razorPayID} = data);
        payment.status = 'paid';
        payment.amount = selectedSlots.length * 20000;
        payment.user = user.uid;
        payment.dueDate = new Date();
        payment.description = `Booking at ${facility.name}`;
        addPaymentItem(payment).then(async () => {
          await addSlotBooking(facility.id, selectedSlots);
          await updateUserBookings(facility, selectedSlots);
          navigation.navigate('BottomTab');
        });
      })
      .catch(() => {
        // handle failure
        Alert.alert('Payment Failed');
      });
  };

  useEffect(() => {
    getFacilityBookings(facility.id).then((booked) => {
      setBookedSlots(booked);
      setInitializing(false);
    });
  }, [facility.id]);

  useEffect(() => {
    const times = [8, 9, 10, 11];
    let tempDates = [];
    for (const time of times) {
      const dateTime = new Date(selectedDate);
      dateTime.setHours(time);
      dateTime.setMinutes(0);
      dateTime.setSeconds(0);
      dateTime.setMilliseconds(0);
      if (dateTime.getTime() > new Date().getTime()) {
        tempDates = [...tempDates, dateTime.getTime()];
      }
    }
    setDateTimes(tempDates);
  }, [selectedDate]);
  if (initializing) {
    return <View />;
  }

  const Card = ({slotID, courtName}) => {
    return (
      <TouchableOpacity
        key={slotID}
        disabled={bookedSlots.includes(slotID)}
        onPress={() => {
          if (!selectedSlots.includes(slotID)) {
            const temp = [...selectedSlots];
            if (selectedSlots.length === 5) {
              temp.splice(0, 1);
            }
            setSelectedSlots([...temp, slotID]);
          } else {
            const temp = selectedSlots.filter((item) => {
              return item !== slotID;
            });
            setSelectedSlots(temp);
          }
        }}>
        {bookedSlots.includes(slotID) ? (
          <View style={styles.bookedCard}>
            <Text style={styles.courtNameBookedText}>{courtName}</Text>
          </View>
        ) : (
          <View
            style={
              selectedSlots.includes(slotID) ? styles.selectedCard : styles.card
            }>
            <Text style={styles.courtNameText}>{courtName}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const DateSelector = () => {
    console.log(new Date(selectedDate).getDate());
    return (
      <View style={styles.dayBox}>
        <TouchableOpacity
          onPress={() => {
            console.log(selectedDate);
            if (selectedDate - initialDate < 0) {
              return;
            }
            setSelectedDate(selectedDate - 24 * 60 * 60 * 1000);
          }}>
          <BackArrow height={heightToDP('4%')} style={styles.dayArrows} />
        </TouchableOpacity>
        <Text style={styles.dayText}>
          {new Date(selectedDate)
            .toLocaleString('en-GB', {timeZone: 'IST'})
            .split(' ')

            .splice(0, 2)
            .join(', ')}{' '}
          {new Date(selectedDate).getDate() < 10
            ? new Date(selectedDate)
                .toLocaleString('en-GB', {timeZone: 'IST'})
                .split(' ')
                .splice(3, 1)
                .join(', ')
            : new Date(selectedDate)
                .toLocaleString('en-GB', {timeZone: 'IST'})
                .split(' ')
                .splice(2, 1)
                .join(', ')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(selectedDate + 24 * 60 * 60 * 1000);
          }}>
          <FrontArrow height={heightToDP('4%')} style={styles.dayArrows} />
        </TouchableOpacity>
      </View>
    );
  };

  const CardRow = ({dateTime}) => {
    const hour = new Date(dateTime).getHours();
    return (
      <View key={dateTime} style={styles.cardBox}>
        <View style={styles.dateRow}>
          <Text style={styles.timeText}>
            {hour} am - {hour + 1}
            {hour + 1 === 12 ? 'pm' : 'am'}
          </Text>
        </View>
        <View style={styles.courts}>
          {courts.map((court) => {
            const courtName = `Court ${court}`;
            const slotID = `${dateTime}-${court}`;
            return (
              <View key={slotID} style={{margin: widthToDP('2%')}}>
                <Card slotID={slotID} courtName={courtName} />
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  // <View style={styles.footer}>
  //   <View style={styles.footerButtons}>
  //     <TouchableOpacity style={styles.footerCancel} onPress={() => setSelectedSlots([])}>
  //       <View>
  //         <Text>Cancel</Text>
  //       </View>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.footerContinue} onPress={() => bookSlot()}>
  //       <View >
  //         <Text>Pay ₹{200 * selectedSlots.length}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // </View>

  return (
    <View>
      <View>
        <Header text={'Slot Selection'} />
      </View>
      <ScrollView>
        <DateSelector />
        <View style={{paddingBottom: heightToDP('20%')}}>
          {dateTimes.map((dateTime) => {
            return <CardRow key={dateTime} dateTime={dateTime} />;
          })}
        </View>
      </ScrollView>
      {selectedSlots.length ? (
        <PaymentFooter amount={200 * selectedSlots.length} onPay={bookSlot} />
      ) : null}
    </View>
  );
};

export default FacilitySlotSelection;

const styles = StyleSheet.create({
  cardBox: {
    marginTop: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
  },
  dateRow: {
    borderBottomWidth: 0.5,
    marginBottom: heightToDP('3%'),
  },
  dayBox: {
    alignSelf: 'center',
    paddingTop: heightToDP('15%'),
    paddingBottom: heightToDP('5%'),
    flexDirection: 'row',
  },
  dayArrows: {
    marginHorizontal: widthToDP('5%'),
    marginTop: heightToDP('0.5%'),
    // backgroundColor:'blue'
  },
  dayText: {
    fontSize: widthToDP('6%'),
    fontFamily: 'Gilroy-SemiBOld',
    letterSpacing: 1,
  },
  timeText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    marginRight: widthToDP('2%'),
    fontWeight: 'bold',
    // alignSelf: 'flex-end',
  },
  courtNameText: {
    fontSize: widthToDP('4%'),
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
  },
  courtNameBookedText: {
    fontSize: widthToDP('4%'),
    color: '#5e5e5e',
    fontFamily: 'Gilroy-SemiBold',
  },
  bookedCard: {
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
  },
  selectedCard: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('1%'),
    borderWidth: 1,
    borderRadius: widthToDP('5%'),
    borderColor: '#ff6362',
  },
  card: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('1%'),
    borderRadius: widthToDP('5%'),
    borderWidth: 1,
    borderColor: '#ffff',
  },
  courts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
