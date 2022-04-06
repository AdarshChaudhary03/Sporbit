import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Expand from '../../../../assets/icons/courses/expand.svg';
import Compress from '../../../../assets/icons/courses/compress.svg';
const FeedbackView = (props) => {
  const {classHistory} = props;
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
      <View style={styles.feedbackView}>
        <Text style={styles.tabHeaderText}>Feedback</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Icon />
        </TouchableOpacity>
      </View>
      <View style={styles.feedback}>
        {Object.keys(classHistory)
          .sort((a, b) => b - a)
          .filter((classKey) => classHistory[classKey].feedback)
          .map((classKey, index) => {
            if (index > 2) {
              return null;
            }
            const date = new Date(parseInt(classKey, 10));
            return (
              <View key={classKey} style={styles.feedbackRow}>
                <Text style={styles.feedbackDot}>{'\u2b24'}</Text>
                <View>
                  <Text style={styles.feedbackDateText}>
                    {date.toUTCString().split(' ').splice(0, 3).join(' ')}
                  </Text>
                  <Text style={styles.feedbackText}>
                    {classHistory[classKey].feedback}
                  </Text>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};
export default FeedbackView;

const styles = StyleSheet.create({
  container: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginVertical: widthToDP('7%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
    overflow: 'hidden',
  },
  feedbackView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feedback: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
  },
  feedbackRow: {
    flexDirection: 'row',
    width: '80%',
    paddingTop: heightToDP('1%'),
  },
  feedbackDot: {
    color: 'rgba(255, 89, 89, 1)',
    marginRight: widthToDP('4%'),
    fontSize: 16,
  },
  feedbackText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  feedbackDateText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  tabHeaderText: {
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'flex-start',
  },
});
