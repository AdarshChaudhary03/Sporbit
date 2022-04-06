import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Toast from 'react-native-simple-toast';
import * as React from 'react';
import {heightToDP, widthToDP} from '../../../../services/utils';
import {useState} from 'react';
import {reactNavigation} from '../../../../services/index';

const SportsCard = ({item}) => {
  const [imageLoaded, onImageLoaded] = useState(false);

  return (
    <View style={styles.item}>
      <SkeletonContent
        containerStyle={{}}
        isLoading={!imageLoaded}
        layout={[styles.itemImage]}
      />
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          if (item.name !== 'Fitness122') {
            reactNavigation.navigate('AcademiesScreen', {
              sports: item,
            });
          } else {
            Toast.show('Coming Soon');
          }
        }}>
        <ImageBackground
          onLoad={() => onImageLoaded(true)}
          resizeMode="cover"
          source={{uri: item.url}}
          style={styles.itemImage}>
          <Text style={styles.learn}></Text>
          <Text style={styles.title}>{item.name.toUpperCase()}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default SportsCard;
const styles = StyleSheet.create({
  item: {
    height: heightToDP('33%'),
    marginVertical: heightToDP('1%'),
    width: widthToDP('100%'),
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemImage: {
    width: widthToDP('90%'),
    height: heightToDP('33%'),
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  title: {
    color: '#dbd5d5',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontSize: widthToDP('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 8,
    marginTop: heightToDP('15%')
  },
  learn: {
    marginTop: 40,
    color: '#fff',
    fontSize: widthToDP('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 5,
  },
});
