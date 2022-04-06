import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {heightToDP, widthToDP} from '../../../../services/utils';

const ProfileSkeleton = () => {
  return (
    <ScrollView>
      <SkeletonContent
        isLoading={true}
        containerStyle={styles.animatedHeader}
        layout={[styles.profileImage, styles.profileBrief]}
      />
      <SkeletonContent
        isLoading={true}
        containerStyle={styles.playerSelector}
        layout={[styles.playerImage, styles.playerImage, styles.playerImage]}
      />
      <SkeletonContent
        isLoading={true}
        containerStyle={styles.playerCardContainer}
        layout={[styles.playerCard]}
      />
      <SkeletonContent
        isLoading={true}
        containerStyle={{}}
        layout={[
          styles.settingsTab,
          styles.settingsTab,
          styles.settingsTab,
          styles.settingsTab,
          styles.settingsTab,
          styles.settingsTab,
        ]}
      />
    </ScrollView>
  );
};

export default ProfileSkeleton;
const styles = StyleSheet.create({
  animatedHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    width: widthToDP('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: heightToDP('2%'),
    marginTop: 5,
    marginBottom: 5,
  },
  profileImage: {
    height: widthToDP('18%'),
    width: widthToDP('18%'),
    borderRadius: widthToDP('10%'),
  },
  profileBrief: {
    height: widthToDP('12%'),
    width: widthToDP('60%'),
    marginHorizontal: heightToDP('2%'),
    justifyContent: 'center',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthToDP('100%'),
    backgroundColor: '#fff',
  },
  settingsTab: {
    alignSelf: 'center',
    height: heightToDP('9%'),
    width: widthToDP('65%'),
    marginBottom: 5,
  },
  playerSelector: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: heightToDP('10%'),
    marginBottom: heightToDP('5%'),
  },
  playerImage: {
    height: widthToDP('15%'),
    width: widthToDP('15%'),
    borderRadius: widthToDP('10%'),
    marginHorizontal: widthToDP('5%'),
  },
  playerCardContainer: {
    alignSelf: 'center',
  },
  playerCard: {
    elevation: 5,
    borderRadius: widthToDP('4%'),
    padding: 5,
    height: heightToDP('35%'),
    marginVertical: heightToDP('2%'),
    marginHorizontal: widthToDP('1%'),
    alignItems: 'center',
    width: widthToDP('90%'),
  },
});
