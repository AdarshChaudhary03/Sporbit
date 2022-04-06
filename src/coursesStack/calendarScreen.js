import * as React from 'react';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CalendarView from './components/calendarScreen/calendarView';
import DaySchedule from './components/calendarScreen/daySchedule';
import Header from '../components/header';
import {getClassHistory} from '../../services/getters';

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
  return date.split(' ')[3]+'-' + month + '-' + date.split(' ')[2];
};

const CalendarScreen = (props) => {
  const [initializing, setInitializing] = useState(true);
  const {classHistoryAddress} = props.route.params;
  const [day, setDay] = useState('');

  const [classHistory, setClassHistory] = useState({});
  useEffect(() => {
    getClassHistory(classHistoryAddress).then((classHistoryData) => {
      for (const classHistoryID of Object.keys(classHistoryData)) {
        const classDate = new Date(parseInt(classHistoryID, 10));
        const classDateString = calcFormat(classDate.toDateString());
        const classData = {
          ...classHistoryData[classHistoryID],
          selected: true,
          selectedColor: classHistoryData[classHistoryID].attendance
            ? '#06a02a'
            : classHistoryData[classHistoryID].firstClass
            ? '#ff5959'
            : classHistoryData[classHistoryID].nextClass
            ? 'yellow'
            : 'red',
        };
        setClassHistory((old) => {
          old[classDateString] = classData;
          return old;
        });
      }
      const recentClassDate = new Date(
        parseInt(Object.keys(classHistoryData).pop(), 10),
      );
      console.log(recentClassDate);
      setDay({
        dateString: calcFormat(recentClassDate.toDateString()),
        day: recentClassDate.getDate(),
        month: recentClassDate.getMonth(),
        timestamp: recentClassDate.getTime(),
        year: recentClassDate.getFullYear(),
      });
      setInitializing(false);
    });
  }, [classHistoryAddress]);

  if (initializing) {
    return <View />;
  }
  // const {skillType} = classHistory[day.dateString];
  return (
    <ScrollView>
      <Header text={'Your Calendar'} />
      <CalendarView classHistory={classHistory} setDay={setDay} />
      <DaySchedule day={day} classData={classHistory[day.dateString]} />
    </ScrollView>
  );
};
export default CalendarScreen;
