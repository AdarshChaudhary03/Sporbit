import {StyleSheet, Text, View} from 'react-native';
import {heightToDP, widthToDP} from '../../../../services/utils';
import * as Progress from 'react-native-progress';
import * as React from 'react';

const DaySchedule = ({day, classData}) => {
  if (!classData) {
    return null;
  }
  const {skillType} = classData;
  console.log('classData');
  console.log(classData);
  return (
    <View style={styles.schedule}>
      <View style={styles.oldClass}>
        <Text style={styles.dateHeaderText}>
          {new Date(day.timestamp)
            .toUTCString()
            .split(' ')
            .slice(0, 3)
            .join(' ')}
        </Text>
        <Text style={styles.dayDescription}>
          {skillType ? skillType.join(' & ') : null}{' '}
          {classData.firstClass ? 'FIRST CLASS ' : 'DAY'}
        </Text>
        <View style={styles.oldClassHeader}>
          <View style={[styles.oldClassColumnHeader, styles.flexOne]}>
            <Text style={styles.oldClassHeaderText}>Time</Text>
          </View>
          <View style={[styles.oldClassColumnHeader, styles.flexOne]}>
            <Text style={styles.oldClassHeaderText}>Task</Text>
          </View>
          <View style={[styles.oldClassColumnHeader, styles.flexTwo]}>
            <Text style={styles.oldClassHeaderText}>Performance</Text>
          </View>
        </View>
        {classData.attendanceType==='Present' ? (
          <View style={styles.oldClassFooter}>
            <View style={styles.oldClassRow}>
              <View style={styles.oldClassRowTime}>
                <Text style={styles.oldClassRowTimeText} numberOfLines={1}>
                  6:05 pm
                </Text>
              </View>
              <View style={styles.oldClassRowTask}>
                <Text style={styles.oldClassRowTaskTextMain}>Warmup</Text>
                <Text style={styles.oldClassRowTaskTextSub}>
                  Shadow Strokes
                </Text>
              </View>
              <View style={styles.progressBar}>
                      <Progress.Bar
                        progress={100}
                        width={widthToDP('40%')}
                        height={heightToDP('0.8%')}
                        borderRadius={widthToDP('5%')}
                        color={'rgba(255, 4, 4, 1)'}
/>
                    </View>
            </View>
            {Object.keys(classData.curriculum)
             .sort((a, b) => {
                return a.localeCompare(b);
              })
            .map((item,index) => {
              return (
                <>
                                  <View key={item} style={styles.oldClassRow}>
                    <View style={styles.oldClassRowTime}>
                      {index < 10 ? (
                        <Text
                          style={styles.oldClassRowTimeText}
                          numberOfLines={1}>
                          6:{(index + 2) * 5} pm
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.oldClassRowTask}>
                      <Text style={styles.oldClassRowTaskTextMain}>
                        {classData.curriculum[item].id}
                      </Text>
                      {Object.keys(classData.curriculum[item].value).map(skill => {
                       return <Text style={styles.oldClassRowTaskTextSub}>
                         {classData.curriculum[item].value[skill]}
                      </Text>
                      })}
                    </View>
                    <View style={styles.progressBar}>
                      <Progress.Bar
                        progress={100}
                        width={widthToDP('40%')}
                        height={heightToDP('0.8%')}
                        borderRadius={widthToDP('5%')}
                        color={'rgba(255, 4, 4, 1)'}
/>
                    </View>
                  </View>
                </>
              );                
            })
              }
            {/*Object.keys(classData)
              .sort((a, b) => {
                return a.localeCompare(b);
              })
              .map((drill, index) => {
                if (
                  drill === 'selected' ||
                  drill === 'selectedColor' ||
                  drill === 'timestamp' ||
                  drill === 'disabled' ||
                  drill === 'disableTouchEvent' ||
                  drill === 'attendance' ||
                  drill === 'homework' ||
                  drill === 'feedback' ||
                  drill === 'skillType' ||
                  drill === 'homeworkDone' ||
                  drill === 'textColor' ||
                  drill === 'curriculum' ||
                  drill === 'attendanceType' ||
                  drill === 'batch' ||
                  drill === 'classDate' ||
                  drill === 'classTimings' ||
                  drill === 'feedback' ||
                  drill === 'media' ||
                  drill === 'id'
                ) {
                  return null;
                }
                drill = {
                  id: drill,
                  value: classData[drill],
                };
                return (
                  <View key={drill.id} style={styles.oldClassRow}>
                    <View style={styles.oldClassRowTime}>
                      {index < 10 ? (
                        <Text
                          style={styles.oldClassRowTimeText}
                          numberOfLines={1}>
                          6:{(index + 2) * 5} pm
                        </Text>
                      ) : null}
                    </View>
                    <View style={styles.oldClassRowTask}>
                      <Text style={styles.oldClassRowTaskTextMain}>
                        {drill.id}
                      </Text>
                      <Text style={styles.oldClassRowTaskTextSub}>
                        Drop Ball {drill.value}
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
{/*                      <Progress.Bar
                        progress={drill.value / 100}
                        width={widthToDP('40%')}
                        height={heightToDP('0.8%')}
                        borderRadius={widthToDP('5%')}
                        color={'rgba(255, 4, 4, 1)'}
/>
                    </View>
                  </View>
                );
              })}*/}
            {classData.feedback ? (
              <View style={styles.feedbackRow}>
                <Text style={styles.feedbackRowTextMain}>Feedback</Text>
                <Text style={styles.feedbackRowTextSub}>
                  {classData.feedback}
                </Text>
              </View>
            ) : null}
            {classData.homework ? (
              <View style={styles.feedbackRow}>
                <Text style={styles.feedbackRowTextMain}>Homework</Text>
                <Text style={styles.feedbackRowTextSub}>
                  {classData.homework}
                </Text>
              </View>
            ) : null}
          </View>
        ) : classData.firstClass ? (
          <View style={[styles.oldClassFooter, styles.firstClass]}>
            <Text style={styles.oldClassRowTaskTextMain}>First Class</Text>
            <Text style={styles.feedbackRowTextSub}>
              The first class is all about assessing your skills. You will be
              performing several drills and based on the performance of those
              drills, your level will be decided and your batch will be
              allocated
            </Text>
          </View>
        ) : (
          <View style={[styles.oldClassFooter, styles.firstClass]}>
            <Text style={styles.oldClassRowTaskTextMain}>
              {classData.nextClass
                ? 'Next Class'
                : 'Student was absent in this class'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default DaySchedule;

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
    color: '#E0E0E0',
    fontFamily: 'Gilroy-SemiBold',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
  calendar: {
    alignItems: 'stretch',
    // width: '90%',
    overflow: 'hidden',
    marginTop: heightToDP('3%'),
  },
  calendarItem: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  schedule: {
    marginVertical: heightToDP('4%'),
    paddingVertical: heightToDP('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthToDP('4%'),
    marginHorizontal: widthToDP('5%'),
    backgroundColor: '#fff',
  },
  dateHeaderText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
    alignSelf: 'center',
    color: 'rgba(255, 4, 4, 1)',
  },
  dayDescription: {
    fontSize: widthToDP('5%'),
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'Gilroy-Regular',
    color: 'rgba(255, 4, 4, 1)',
  },
  oldClass: {
    width: '100%',
  },
  oldClassHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    paddingBottom: heightToDP('2%'),
  },
  oldClassColumnHeader: {
    justifyContent: 'center',
  },
  oldClassHeaderText: {
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
    color: 'black',
    fontSize: widthToDP('4%'),
  },
  oldClassFooter: {
    width: '100%',
  },
  oldClassRow: {
    flexDirection: 'row',
    paddingVertical: heightToDP('2%'),
    justifyContent: 'center',
  },
  oldClassRowTime: {
    alignItems: 'center',
    flex: 1,
  },
  oldClassRowTimeText: {
    color: 'black',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  oldClassRowTask: {
    justifyContent: 'center',
    marginLeft: widthToDP('3%'),
    flex: 1,
  },
  feedbackRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(205, 205, 205, 1)',
    marginTop: heightToDP('2%'),
    paddingTop: heightToDP('2%'),
    paddingHorizontal: widthToDP('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  oldClassRowTaskTextMain: {
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
  },
  oldClassRowTaskTextSub: {
    color: '#6F6F6F',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('3%'),
  },
  feedbackRowTextMain: {
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
  },
  feedbackRowTextSub: {
    color: '#6F6F6F',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  oldClassRowPerformance: {
    width: '50%',
    alignItems: 'center',
  },
  oldClassRowPerformanceText: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
    borderBottomWidth: 2,
    borderBottomColor: '#b2b2b2',
    paddingBottom: 10,
  },
  oldClassRowPerformanceIncomplete: {
    borderTopWidth: 1,
    borderTopColor: '#b2b2b2',
    marginTop: 20,
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  oldClassRowPerformanceTextIncomplete: {
    textAlign: 'center',
    color: '#b2b2b2',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('5%'),
    width: '80%',
    paddingVertical: 10,
  },
  progressBar: {
    flex: 2,
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  firstClass: {
    alignItems: 'center',
    padding: widthToDP('5%'),
  },
});
