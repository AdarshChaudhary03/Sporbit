import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {widthToDP, heightToDP} from '../../../../services/utils';

const ReviewsTab = () => {
  const [carouselRef, setCarouselRef] = useState('');
  const reviews = [
    {
      name: 'Yogesh Kiroriwal',
      image:
        'https://media.istockphoto.com/photos/portrait-of-happy-indian-man-smiling-at-home-picture-id1270067432?k=6&m=1270067432&s=612x612&w=0&h=1nplUx-3_lF3mQNVp59_gwDGaNrtFXjHlVdngsInZdk=',
      designation: 'Parent',
      description:
        'I enrolled my 5 year son in FITSCO Sports to start his coaching from beginner level. The coaches trained with drills that made his basics rock solid in the first 2 months. Would highly recommend for anyone looking to learn tennis.',
    },
    {
      name: 'Manas Poddar',
      image: 'https://i.ytimg.com/vi/2kD7_hasZrc/mqdefault.jpg',
      designation: 'Student',
      description:
        'I learned tennis for 5 years in my teens and joined this academy hoping to brush up my game. But Vasant, who is a reputed player himself,  taught me drills that made my game so much stronger.',
    },
    {
      name: 'Amol Bamboo',
      image:
        'https://image.shutterstock.com/image-photo/smiling-portrait-young-man-indian-260nw-716221999.jpg',
      designation: 'Parent',
      description:
        'I enrolled my 5 year son in FITSCO Sports to start his coaching from beginner level. The coaches trained with drills that made his basics rock solid in the first 2 months. Would highly recommend for anyone looking to learn tennis.',
    },
  ];
  const renderReviews = (item) => {
    return (
      <View style={styles.coachItem}>
        <View style={styles.coachProfile}>
          <View style={styles.image}>
            <Image
              source={{uri: item.item.image}}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.name}>
            <Text numberOfLines={2} style={styles.coachNameText}>
              {item.item.name}
            </Text>
            <Text numberOfLines={1} style={styles.coachDesignationText}>
              {item.item.designation.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.coachDescription}>
          <Text style={styles.coachDescriptionText}>
            {item.item.description}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.tab}>
      <View style={styles.carousel}>
        <Carousel
          ref={(c) => {
            setCarouselRef(c);
          }}
          onSnapToItem={() => {
            console.log(carouselRef._activeItem);
          }}
          layout={'default'}
          sliderWidth={widthToDP('100%')}
          itemWidth={widthToDP('70%')}
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderReviews}
        />
      </View>
    </View>
  );
};
export default ReviewsTab;

const styles = StyleSheet.create({
  tab: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    height: heightToDP('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    justifyContent: 'center',
    marginTop: heightToDP('2%'),
  },
  coachItem: {
    height: '80%',
    // width: '100%',
    elevation: 3,
    borderRadius: widthToDP('4%'),
    paddingVertical: heightToDP('2.5%'),
    backgroundColor: '#fff',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: widthToDP('5%'),
  },
  profileImage: {
    height: widthToDP('18%'),
    width: widthToDP('18%'),
    borderRadius: widthToDP('50%'),
  },
  coachProfile: {
    flexDirection: 'row',
    // borderBottomColor: '#272727',
    paddingBottom: heightToDP('1.5%'),
    borderBottomWidth: 0.5,
  },
  name: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: widthToDP('25%'),
    marginLeft: widthToDP('3%'),
  },
  coachNameText: {
    color: '#292929',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  coachDesignationText: {
    color: 'black',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-Regular',
  },
  coachDescription: {
    // width: '80%',
    // marginTop: 10,
    // marginLeft: 10,
    padding: widthToDP('3%'),
  },
  coachDescriptionRow: {
    flexDirection: 'row',
    marginVertical: heightToDP('1%'),
    // marginBottom: 10,
  },
  coachDescriptionDot: {
    color: '#ff6362',
    fontSize: widthToDP('3.2%'),
    fontFamily: 'Gilroy-SemiBold',
    // letterSpacing: 2,
    marginRight: widthToDP('2%'),
  },
  coachDescriptionText: {
    textAlign: 'justify',
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    lineHeight: heightToDP('2.5%'),
    // letterSpacing: 2,
  },
});
