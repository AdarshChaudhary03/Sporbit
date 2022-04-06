import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Header from '../../../components/header';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Forward from '../../../../assets/icons/courses/forward.svg';

export default function FAQ() {
  const [view, setView] = useState('');
  if (view === 'about') {
    return (
      <ScrollView style={styles.container}>
        <Header text={'About us'} backPressed={() => setView('')} />
        <View style={styles.body}>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>What is Sporbit?</Text>
            <Text style={styles.itemRowTextSub}>
              We have created Sporbit to solve for the sports and extra
              curricular learning ecosystem in India. At Sporbit, we make
              sports learning fun and easy. We have best-in-class trainers &
              facilities ranging from Cricket to Tennis. By Sporbit you can
              either start your sports coaching and learning journey or book a
              facility and get ready to play.
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              How is Sporbit better than regular sports coaching?
            </Text>
            <Text style={styles.itemRowTextSub}>
              Our facilities are maintained as per the international sporting
              federation’s standards. We aim to give you a balanced mix of
              sports coaching, fitness and developing the characteristic of a
              successful sportsperson. Sporbit differentiates itself from other
              sports coaching by offering curriculums and coaches that have been
              certified by top sportsperson and coaches that focus on overall
              development.{'\n\n'}
              Sporbit has a simple philosophy - make sports fun and easy with
              the help of best-in-class coaches and curriculum. Sporbit uses
              the best in technology to give you a world-class experience. You
              can book classes, coaches, facilities - all with the click of a
              button from the Sporbit website.
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              Does Sporbit offer other services beyond coaching also:
            </Text>
            <Text style={styles.itemRowTextSub}>
              At Sporbit, beyond getting the best in class coaching for
              yourself and your child you can also book various sports
              facilities for playing when you want. We are building more
              features for you that will take your sports journey to next level:
              Expert Videos by top sportsperson and coaches around the world -
              Coming Soon AI enabled video analysis of your performance/practice
              - Coming Soon Market for genuine equipment at best prices - Coming
              Soon Challenge players and interact with your community - Coming
              Soon
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              Which Sports are available at Sporbit:
            </Text>
            <Text style={styles.itemRowTextSub}>
              We currently have Cricket, Tennis, Badminton, Football and
              Basketball. Reach out to us at
              <Text style={styles.themeColor}> info@sporbit.in</Text> if
              you want us to add services for other sports too
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              How long does it take to set up my account ?
            </Text>
            <Text style={styles.itemRowTextSub}>
              Sporbit provides simplistic way to set-up your account. You can
              set up your account by providing your basic information which
              takes less than a minute.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  if (view === 'coaches') {
    return (
      <ScrollView style={styles.container}>
        <Header text={'About us'} backPressed={() => setView('')} />
        <View style={styles.body}>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>All About our Coaches:</Text>
            <Text style={styles.itemRowTextSub}>
              Former state, national and International coaches and strength and
              conditioning experts. Tennis Curriculum classes designed by Rohit
              Rajpal, India’s Davis Cup Team Captain, Need we say more
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              Which coach will take my class today?
            </Text>
            <Text style={styles.itemRowTextSub}>
              All our coaches are highly skilled and are experts in their
              formats. We tend to keep our coaches constant and have a fixed
              schedule for them based on the batch they are teaching. You will
              be able to confirm who your trainer is only when you reach the
              center.
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>Becoming a Coach:</Text>
            <Text style={styles.itemRowTextSub}>
              We're glad to see your enthusiasm to become a Sporbit coach. To
              become a coach in India, send us your profile to{' '}
              <Text style={styles.themeColor}> info@sporbit.in</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  if (view === 'covid') {
    return (
      <ScrollView style={styles.container}>
        <Header text={'COVID-19 Precautions'} backPressed={() => setView('')} />
        <View style={styles.body}>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              What safety precautions will be taken at the center?
            </Text>
            <Text style={styles.itemRowTextSub}>
              To ensure safety of members as well as our employees, we have made
              the following changes in the center facilities: Temperature &
              Blood oxygen level checks: Our center manager will check your body
              temperature, blood oxygen levels & status on Aarogya Setu app
              before entering the center Frequent COVID tests of coaches: All
              our coaches and ground staff are regularly tested for COVID and
              daily body temperatures are recorded. We and our employees are
              ensuring that you get the safest possible environment at Sporbit
              centers. Frequent sanitization: Equipment & facility floor will be
              sanitised after every session.
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              Is it mandatory to have the Aarogya Setu App?
            </Text>
            <Text style={styles.itemRowTextSub}>
              We encourage the use of the Aarogya Setu App as per the guidelines
              from the Government. However, it is not mandatory to have the app
              to enter the center.
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemRowTextMain}>
              {' '}
              What are the do's and don'ts of attending a cult class?
            </Text>
            <Text style={styles.itemRowTextSub}>
              DOS{'\n'}
              Always wear a face mask & use hand sanitizer Arrive at least 15
              minutes early for the class for temperature & oxygen level check
              Carry your mobile phone, your own water bottle, hand towel for the
              class Assess yourself on Aarogya Setu app regularly{'\n\n'}
              DON'TS{'\n'}
              If you are unwell, please stay at home and rest. This is important
              for the health of our employees as well fellow members Don’t wait
              or create groups inside the center
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Header text={'FAQs'} />
      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.itemRow, styles.flexRow]}
          onPress={() => setView('about')}>
          <Text style={styles.itemRowTextMain}>About Sporbit</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.itemRow, styles.flexRow]}
          onPress={() => setView('coaches')}>
          <Text style={styles.itemRowTextMain}>Sporbit Coaches</Text>
          <Forward />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.itemRow, styles.flexRow]}
          onPress={() => setView('covid')}>
          <Text style={styles.itemRowTextMain}>COVID-19 Precautions</Text>
          <Forward />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  body: {
    paddingTop: heightToDP('8%'),
  },
  itemRow: {
    paddingVertical: heightToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
  },
  itemRowTextMain: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('1%'),
  },
  itemRowTextSub: {
    textAlign: 'justify',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    color: '#777777',
  },
  themeColor: {
    color: '#FF5959',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
