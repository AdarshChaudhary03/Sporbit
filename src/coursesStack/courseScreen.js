import * as React from 'react';
import {useCallback, useContext, useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FeedBackView from './components/courseScreen/feedbackView';
import HomeworkView from './components/courseScreen/homeworkView';
import MediaView from './components/courseScreen/mediaView';
import {heightToDP, widthToDP} from '../../services/utils';
import {AppContext} from '../../services/appContext';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/header';
import Expand from '../../assets/icons/courses/expand.svg';
import Compress from '../../assets/icons/courses/compress.svg';
import Forward from '../../assets/icons/courses/forward.svg';
import {Avatar} from 'react-native-elements';

const PROGRESS_WIDTH = widthToDP('4%');
const PROGRESS_SIZE = widthToDP('38%');
const IMAGE_SIZE = widthToDP('30%');
const IMAGE_RADIUS = widthToDP('20%');
const IMAGE_MARGIN = -widthToDP('34%');

export default function CourseScreen(props) {
  const {players} = useContext(AppContext);
  const {navigation, route} = props;
  const {playerID} = route.params;
  const [data, setData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [totalProgress, setTotalProgress] = useState(0);
  const [classHistory, setClassHistory] = useState({});
  const [expanded, setExpanded] = useState([false, false, false, false]);
  const [ skillCounter, setSkillCounter ] = useState(0);

  const onRefresh = useCallback(async () => {
    let playerData = {};
    if (!Object.keys(players).includes(playerID)) {
      const playerRef = await firestore()
        .collection('players')
        .doc(playerID)
        .get();
      playerData = {
        ...playerRef.data(),
        birthday: playerRef.data().birthday.toDate(),
        id: playerRef.id,
      };
    } else {
      playerData = players[playerID];
    }
    setRefreshing(true);
    setTotalProgress(0);
    const studentData = await playerData.students[0].get();
    const academyData = await studentData.data().academy.get();
    const skills = studentData.data().skills;
    let counter = 0;
    Object.keys(skills).forEach((skillID) => {
      skills[skillID] = {
        ...skills[skillID],
//        value: studentData.data().skills[skillID],
        value: skills[skillID].value,
        key: skillID,
      };
      counter = counter + 1;
      setTotalProgress((old) => old + skills[skillID].value);
    });
    setSkillCounter(counter);
    let student = {
      ...studentData.data(),
      nextClassTime: studentData.data().nextClassTime ? studentData.data().nextClassTime : null,
    };
    student.skills = skills;
    firestore()
      .collection(
        `academies/${student.academy.id}/students/${playerData.students[0].id}/classHistory`,
      )
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          setClassHistory((old) => {
            old[parseInt(documentSnapshot.id, 10)] = documentSnapshot.data();
            return old;
          });
        });
      });
      setData((old) => {
      return {...old, ...playerData, ...student};
    });
    setRefreshing(false);
  }, [playerID, players]);

  useEffect(() => {
    console.log('entered course screen...123456');
    onRefresh().then(() => {
      setInitializing(false);
    });
  }, [onRefresh]);

  if (initializing) {
    return <View />;
  }

  const {
    students,
    classes,
    skills: skills1,
    name,
    level,
    photoURL,
    attendance,
  } = data;
  console.log('data.skills1');
  console.log(Object.values(skills1));
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header text={'Course Details'} />
      <AnimatedGaugeProgress
        size={PROGRESS_SIZE}
        width={PROGRESS_WIDTH}
        fill={totalProgress / skillCounter}
        rotation={90}
        cropDegree={10}
        tintColor={'#FF5959'}
        delay={0}
        style={styles.progressCircle}
        backgroundColor={'rgba(255, 220, 220, 1)'}
        strokeCap="circle">
        <View style={styles.avatar}>
          <Avatar
            rounded
            size={IMAGE_SIZE}
            title={name ? name[0] : 'default'}
            source={{
              uri: photoURL ? photoURL : 'avatar',
            }}
          />
        </View>
      </AnimatedGaugeProgress>
      <View style={styles.profileBrief}>
        <Text style={styles.studentNameText}>{name}</Text>
        <Text style={styles.levelText}>{level}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CalendarScreen', {
            classHistoryAddress: data.students[0].path,
          })
        }
        style={styles.calendarButton}>
        <Text style={styles.calendarButtonText}>View Class History</Text>
        <Forward />
      </TouchableOpacity>
      <View style={styles.attendanceView}>
        <Text style={styles.attendanceTextStatic}>Attendance</Text>
        <Text style={styles.attendanceTextDynamic}>
          {attendance}/{classes}
        </Text>
      </View>
      <View style={styles.progress}>
        {[...new Set(Object.values(skills1).map((item) => item.type))]
          .sort()
          .map((skillType, index) => {
            const skill = Object.values(skills1).filter((skillData) => {
              return skillData.type === skillType && skillData.level === level;
            });
            console.log('skill');
            console.log(skill);
            const skillTotal = Object.keys(skill).reduce((total, key) => {
              return total + skill[key].value;
            }, 0);

            console.log('SkillTotal: '+skillTotal);
            return (
              <View key={index}> 
                              <TouchableOpacity
                  style={styles.skillsItem}
                  onPress={() => {
                    let items = [...expanded];
                    let item = items[index];
                    item = !item;
                    items[index] = item;
                    setExpanded(items);
                  }}>
                  <Text style={styles.skillsTextStatic}>{skillType}</Text>
                  <Progress.Bar
                    style={styles.skillsProgressBar}
                    progress={skillTotal / (Object.keys(skill).length * 100)}
                    height={heightToDP('1%')}
                    width={null}
                    borderRadius={30}
                    color={'rgba(255, 4, 4, 1)'}
                  />
                  <View style={{marginLeft: widthToDP('3%')}}>
                    {!expanded[index] ? <Expand /> : <Compress />}
                  </View>
                </TouchableOpacity>
                {expanded[index] ? (
                  <View style={styles.skillsSub}>
                    {Object.keys(skill)
                      .sort((a, b) => skill[a].key.localeCompare(skill[b].key))
                      .map((drill) => {
                        return (
                          <View style={styles.skillsItemSub} key={drill}>
                            <Text style={styles.skillsTextSubStatic}>
                              {skill[drill].key}
                            </Text>
                            <Progress.Bar
                              style={styles.skillsSubProgressBar}
                              progress={skill[drill].value / 100}
                              width={null}
                              height={heightToDP('1%')}
                              borderRadius={30}
                              color={'rgba(255, 4, 4, 1)'}
                            />
                          </View>
                        );
                      })}
                  </View>
                ) : null}
            </View>
            );
          })}
      </View>
      <FeedBackView classHistory={classHistory} />
      <HomeworkView classHistory={classHistory} studentID={students ? students[0].id : null} />
      <MediaView classHistory={classHistory} studentID={students ? students[0].id : null} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToDP('10%'),
    marginBottom: 5,
  },
  profileImage: {
    height: widthToDP('30%'),
    width: widthToDP('30%'),
    borderRadius: widthToDP('15%'),
  },
  profileBrief: {
    marginTop: heightToDP('5%'),
    height: heightToDP('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: heightToDP('3%'),
  },
  studentNameText: {
    fontSize: widthToDP('7%'),
    fontFamily: 'Gilroy-SemiBold',
    color: 'black',
    marginBottom: heightToDP('2%'),
  },
  academyNameText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    color: 'rgba(107, 107, 107, 1)',
    // marginBottom:heightToDP('1%')
  },
  trialStatusText: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: '#292929',
    fontSize: widthToDP('5%'),
    borderRadius: widthToDP('5%'),
  },
  registeredStatusText: {
    backgroundColor: '#5ddb1f',
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: '#292929',
    fontSize: widthToDP('5%'),
    borderRadius: widthToDP('5%'),
  },
  progress: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
  },
  progressCircle: {
    // backgroundColor:'red',
    // width:widthToDP('100%'),
    alignSelf: 'center',
    marginTop: heightToDP('13%'),
    borderBottomColor: '#ff6362',
    borderBottomWidth: 0,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: IMAGE_MARGIN,
    borderRadius: IMAGE_RADIUS,
  },
  levelView: {
    // height: 200,
    // marginTop: -200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    color: '#6B6B6B',
  },
  onTrialText: {
    paddingTop: 40,
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
  },
  progressView: {
    marginTop: -40,
    alignItems: 'center',
  },
  progressText: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
  },
  attendanceView: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: widthToDP('4%'),
    paddingVertical: widthToDP('3%'),
    paddingHorizontal: widthToDP('7%'),
    marginBottom: widthToDP('3%'),
  },
  attendanceTextStatic: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-Regular',
    color: 'black',
    fontWeight: 'bold',
    marginRight: widthToDP('8%'),
  },
  attendanceTextDynamic: {
    fontSize: widthToDP('6%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  calendarButton: {
    paddingBottom: heightToDP('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: heightToDP('2%'),
  },
  calendarButtonText: {
    alignSelf: 'center',
    color: '#FF5959',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    marginRight: widthToDP('3%'),
  },
  skillsView: {
    borderTopWidth: 2,
    borderTopColor: '#ff6362',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  skillsItem: {
    width: widthToDP('80%'),
    marginVertical: heightToDP('1%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsTextStatic: {
    flex: 1,
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  skillsProgressBar: {
    flex: 2,
  },
  skillsSub: {
    width: widthToDP('80%'),
    alignItems: 'flex-end',
    paddingRight: widthToDP('5%'),
    marginVertical: heightToDP('2%'),
  },
  skillsItemSub: {
    width: widthToDP('70%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  skillsTextSubStatic: {
    flex: 1,
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
    marginVertical: 5,
    color: 'rgba(111, 111, 111, 1)',
  },
  skillsSubProgressBar: {
    flex: 2,
  },
  feedbackView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
  },
  plusIcon: {
    justifyContent: 'flex-end',
  },
});
