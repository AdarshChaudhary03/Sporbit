import * as React from 'react';
import {useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {reactNavigation} from '../../../../services';
import {heightToDP, widthToDP} from '../../../../services/utils';

import Star from '../../../../assets/icons/academies/star.svg';
import Clock from '../../../../assets/icons/academies/clock.svg';
import Location from '../../../../assets/icons/academies/location.svg';

const ItemRenderer = ({item, view, sports}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const academy = item;

  let distanceText = '';
  console.log('academy.distanceToUser');
  console.log(academy.distanceToUser);
  if (academy.distanceToUser < 500000) {
    distanceText =
      academy.distanceToUser > 1000
        ? (academy.distanceToUser / 1000).toFixed(1) + ' km away'
        : Math.round(academy.distanceToUser / 100) * 100 + ' m away';
  }
  const name = academy.name.toUpperCase();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        view === 'academies'
          ? reactNavigation.navigate('AcademyScreen', {academy: item, sports: sports})
          : reactNavigation.navigate('FacilityScreen', {facility: item})
      }>
      <View style={styles.profileImageContainer}>
        <SkeletonContent
          containerStyle={styles.imageSkeleton}
          isLoading={!imageLoaded}
          layout={[
            {
              key: 'someId',
              height: heightToDP('16%'),
              width: heightToDP('16%'),
              borderRadius: widthToDP('5%'),
              margin: widthToDP('2%'),
              elevation: 1,
            },
          ]}
        />
        <Image
          onLoad={() => setImageLoaded(true)}
          resizeMode="cover"
          source={{uri: academy.profileImage}}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.profileData}>
        <View style={styles.ratingLine}>
          <Star height={16} width={16} />
          <Text style={styles.ratingText}>{academy.rating}/5</Text>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.titleBox}>
          <Text numberOfLines={1} style={styles.titleFooter}>
            {academy.tag}
          </Text>
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.distanceTab}>
            <Clock />
            <Text style={styles.distanceText}> 3-6 days/week</Text>
          </View>
          <View style={styles.distanceTab}>
            <Location />
            <Text style={styles.distanceText}>{' ' + distanceText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRenderer;

const styles = StyleSheet.create({
  profileImage: {
    height: heightToDP('16%'),
    width: heightToDP('16%'),
    borderRadius: widthToDP('5%'),
  },
  profileImageContainer: {
    height: heightToDP('16%'),
    width: heightToDP('16%'),
    borderRadius: widthToDP('5%'),
    elevation: 5,
    overflow: 'hidden',
    margin: widthToDP('2%'),
  },
  profileData: {
    marginVertical: heightToDP('2%'),
    marginLeft: -widthToDP('10%'),
    paddingLeft: widthToDP('13%'),
    marginRight: widthToDP('2%'),
    flex: 5,
    borderRadius: widthToDP('4%'),
    elevation: 3,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    marginVertical: heightToDP('1%'),
    paddingHorizontal: widthToDP('2%'),
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingLine: {
    flexDirection: 'row',
    marginVertical: heightToDP('1%'),
    marginRight: heightToDP('7%'),
    borderBottomColor: 'rgba(159, 159, 159, 1)',
    borderBottomWidth: 0.5,
  },
  ratingText: {
    fontSize: widthToDP('4%'),
    marginLeft: widthToDP('4%'),
    color: '#585858',
    fontFamily: 'Gilroy-Regular',
  },
  distanceTab: {
    marginBottom: heightToDP('1%'),
    flexDirection: 'row',
    marginLeft: widthToDP('2%'),
  },
  itemFooter: {
    flex: 1,
    justifyContent: 'center',
  },
  distanceText: {
    fontSize: widthToDP('4%'),
    color: 'black',
    textAlign: 'right',
    fontFamily: 'Gilroy-Regular',
    marginLeft: widthToDP('2%'),
  },
  titleLogo: {
    flex: 1,
    marginTop: 220,
    width: widthToDP('100%'),
  },
  title: {
    color: '#000000',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
  },
  titleFooter: {
    color: '#000000',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 1,
  },
  titleBox: {
    marginBottom: 15,
  },
  imageSkeleton: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
