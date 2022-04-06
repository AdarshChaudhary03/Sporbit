import React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import {getBookings} from '../../../services/getters';
import Header from '../../components/header';
import ForwardIcon from '../../../assets/icons/facilitySelection/frontArrow.svg';

export default function BookingsScreen() {
  const [viewBox, setViewBox] = useState('');
  const [bookings, setBookings] = useState({});
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    getBookings().then((bookingData) => {
      setBookings(bookingData);
      setInitializing(false);
    });
  }, []);
  console.log(bookings, viewBox);
  const BookingsDetail = ({bookingID}) => {
    return (
      <ScrollView style={{paddingTop: heightToDP('8%')}}>
        <View style={styles.itemSome}>
          <Text style={styles.textTop}>Venue</Text>
          <Text style={styles.textBottom}>
            {bookings[bookingID].facilityName}
          </Text>
        </View>
        <View style={styles.itemSome}>
          <Text style={styles.textTop}>Sports</Text>
          <Text style={styles.textBottom}>{bookings[bookingID].sports}</Text>
        </View>

        <View style={{paddingHorizontal: widthToDP('4%')}}>
          <View style={styles.someSome}>
            <View style={styles.columnHeaderView}>
              <Text style={styles.columnHeader}>Date</Text>
            </View>
            <View style={styles.columnHeaderView}>
              <Text style={styles.columnHeader}>Time</Text>
            </View>
            <View style={styles.columnHeaderView}>
              <Text style={styles.columnHeader}>Court</Text>
            </View>
          </View>
          {
            //these are the entries just populate Date*, Time*, court*
            Object.keys(bookings[bookingID].bookings)
              .sort()
              .map((dateTime) => {
                const date = new Date(parseInt(dateTime, 10));
                return (
                  <View key={dateTime} style={styles.someSome}>
                    <View style={styles.columnHeaderView}>
                      <Text style={styles.columnHeader}>
                        {date
                          .toLocaleString('en-GB', {timeZone: 'IST'})
                          .split(' ')
                          .splice(0, 3)
                          .join(' ')}
                      </Text>
                    </View>
                    <View style={styles.columnHeaderView}>
                      <Text style={styles.columnHeader}>
                        {date
                          .toLocaleString('en-GB', {timeZone: 'IST'})
                          .split(' ')
                          .splice(3, 1)
                          .join(' ')}
                      </Text>
                    </View>
                    <View style={styles.columnHeaderView}>
                      <Text style={styles.columnHeader}>
                        {bookings[bookingID].bookings[dateTime].join(', ')}
                      </Text>
                    </View>
                  </View>
                );
              })
          }
        </View>
        <View style={styles.itemSome}>
          <Text style={styles.textTop}>Amount</Text>
          <Text style={styles.textBottom}>₹ {bookings[bookingID].payment}</Text>
        </View>
      </ScrollView>
    );
  };
  const Bookings = () => {
    return (
      <ScrollView style={{paddingTop: heightToDP('8%')}}>
        {!Object.keys(bookings).length && !initializing && (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListTextA}>This looks Empty</Text>
            <Text style={styles.emptyListTextB}>
              Book a facility to reflect changes here.
            </Text>
          </View>
        )}
        {Object.keys(bookings).map((bookingID) => {
          const key = bookingID;
          return (
            <View key={key}>
              <TouchableOpacity onPress={() => setViewBox(key)}>
                <View style={styles.paymentBox}>
                  <Text style={styles.dueDate}>
                    {bookings[bookingID].bookingDate
                      .toDate()
                      .toLocaleString('en-GB', {timeZone: 'IST'})
                      .split(' ')
                      .splice(0, 3)
                      .join(' ')}
                  </Text>
                  <View style={styles.description}>
                    <Text style={styles.descText}>
                      {bookings[bookingID].facilityName}
                    </Text>
                  </View>
                  <Text style={styles.amount}>
                    ₹ {bookings[bookingID].payment}
                  </Text>
                  <Text style={styles.mode}>{bookings[bookingID].sports}</Text>
                  <ForwardIcon />
                </View>
                <View style={styles.underline} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        text={'Bookings'}
        backPressed={!viewBox ? null : () => setViewBox('')}
      />
      {!viewBox ? <Bookings /> : <BookingsDetail bookingID={viewBox} />}
    </View>
  );
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
    fontSize: heightToDP('3%'),
    fontFamily: 'Gilroy-SemiBold',
    color: '#E0E0E0',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
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
    width: widthToDP('50%'),
  },
  descText: {
    fontWeight: 'bold',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
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
    fontSize: widthToDP('3.6%'),
    color: '#000000',
    fontFamily: 'Gilroy-Regular',
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
  columnHeader: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
  },
  columnHeaderView: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  textTop: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
  },
  textBottom: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
  },
  itemSome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: widthToDP('4%'),
    marginVertical: heightToDP('1%'),
  },
  someSome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  underline: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'rgba(159, 159, 159, 1)',
  },
});
