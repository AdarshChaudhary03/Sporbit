import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {updateHomeworkDone} from '../../../../services/setters';
import Expand from '../../../../assets/icons/courses/expand.svg';
import Compress from '../../../../assets/icons/courses/compress.svg';
import Toast from 'react-native-simple-toast';

const HomeworkView = (props) => {
  const {classHistory, studentID} = props;
  const [expanded, setExpanded] = useState(false);
  const Icon = () => {
    if (!expanded) {
      return <Expand />;
    } else {
      return <Compress />;
    }
  };

  return (
    <View
      style={
        expanded
          ? styles.container
          : [styles.container, {height: heightToDP('9%')}]
      }>
      <View style={styles.homeworkView}>
        <Text style={styles.tabHeaderText}>Homework</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon />
        </TouchableOpacity>
      </View>
      <View style={styles.homework}>
        {Object.keys(classHistory)
          .sort((a, b) => b - a)
          .filter((classKey) => classHistory[classKey].homework)
          .map((classKey, index) => {
            if (index > 2) {
              return null;
            }
            const date = new Date(parseInt(classKey, 10));
            return (
              <View key={index} style={styles.homeworkRow}>
                <View>
                  <CheckBox
                    disabled={classHistory[classKey].homeworkDone}
                    value={classHistory[classKey].homeworkDone}
                    onValueChange={() => {
                      classHistory[classKey].homeworkDone = true;
                      updateHomeworkDone(classKey, studentID).then(() => {
                        Toast.show('Good Job!!');
                      });
                    }}
                    style={styles.checkbox}
                    tintColors={{true: '#ff6362', false: '#ff6362'}}
                  />
                  <Text style={styles.markDone}>Mark {'\n'}as done</Text>
                </View>
                <View>
                  <Text style={styles.homeworkDateText}>
                    {date.toUTCString().split(' ').splice(0, 3).join(' ')}
                  </Text>
                  <Text style={styles.homeworkText}>
                    {classHistory[classKey].homework}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};
export default HomeworkView;

const styles = StyleSheet.create({
  container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginBottom: widthToDP('7%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
  },
  homeworkView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homework: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
  },
  homeworkRow: {
    flexDirection: 'row',
    paddingTop: heightToDP('1%'),
  },
  homeworkText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  homeworkDateText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  tabHeaderText: {
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'flex-start',
  },
  checkbox: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('5%'),
  },
  markDone: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#6F6F6F',
  },
});
