import {StyleSheet, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import * as React from 'react';
import {Calendar} from 'react-native-calendars';

const calcFormat = (date) => {
  let month;
  if (date.split(' ')[1] === 'Jan') {
    month = '01';
  }
  if (date.split(' ')[1] === 'Feb') {
    month = '02';
  }
  if (date.split(' ')[1] === 'Mar') {
    month = '03';
  }
  if (date.split(' ')[1] === 'Apr') {
    month = '04';
  }
  if (date.split(' ')[1] === 'May') {
    month = '05';
  }
  if (date.split(' ')[1] === 'Jun') {
    month = '06';
  }
  if (date.split(' ')[1] === 'Jul') {
    month = '07';
  }
  if (date.split(' ')[1] === 'Aug') {
    month = '08';
  }
  if (date.split(' ')[1] === 'Sep') {
    month = '09';
  }
  if (date.split(' ')[1] === 'Oct') {
    month = '10';
  }
  if (date.split(' ')[1] === 'Nov') {
    month = '11';
  }
  if (date.split(' ')[1] === 'Dec') {
    month = '12';
  }
  return '2022-' + month + '-' + date.split(' ')[2];
};

const CalendarView = ({setDay, classHistory}) => {
  const startDate = new Date(2022, 1, 1);
  const endDate = new Date(2022, 2, 1);
  let date = startDate;
  let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
  console.log('classHistory');
  console.log(currentDate.getTime());
  while (date.getTime() < endDate.getTime()) {
    const dateFormatted = calcFormat(date.toDateString());
    if (!Object.keys(classHistory).includes(dateFormatted)) {
      classHistory[dateFormatted] = {
        color: 'black',
        disabledColor: 'black',
        selectedColor: 'rgba(242, 242, 242, 1)',
        disableTouchEvent: true,
      };
    }
    date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
//    console.log(date);
  }
  return (
    <View style={styles.calendar}>
      <Calendar
        theme={{
          backgroundColor: 'white',
          calendarBackground: '#F2F2F2',
          textSectionTitleColor: '#6F6F6F', //dayHeaderTextColor
          selectedDayTextColor: 'black',
          dayTextColor: '#ff5959', //other month day text color
          arrowColor: 'black',
          todayTextColor: '#FF5959',
          monthTextColor: 'black',
          textDayFontFamily: 'Gilroy-SemiBold',
          textMonthFontFamily: 'Gilroy-Regular',
          textDayHeaderFontFamily: 'Gilroy-Regular',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'normal',
          textDayFontSize: 16,
          textMonthFontSize: widthToDP('7%'),
          textDayHeaderFontSize: 14,
        }}
        hideExtraDays={true}
        minDate={'2022-01-01'}
        maxDate={'2055-12-30'}
        onDayPress={(selectedDay) => {
          setDay(selectedDay);
          console.log('selected day', selectedDay);
        }}
        monthFormat={'MMM yyyy'}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        markedDates={classHistory}
        enableSwipeMonths={true}
        markingType={'custom'}
        style={styles.calendarItem}
      />
    </View>
  );
};
export default CalendarView;
const styles = StyleSheet.create({
  calendarItem: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: heightToDP('8%'),
  },
});
