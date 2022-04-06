import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {heightToDP, widthToDP} from '../../../../services/utils';

const FooterSkeleton = () => {
  return (
    <View>
      <SkeletonContent
        containerStyle={styles.itemSkeletonContainer}
        isLoading={true}
        layout={[
          {
            key: 'someId3',
            height: heightToDP('16%'),
            width: heightToDP('16%'),
            borderRadius: widthToDP('5%'),
            margin: widthToDP('2%'),
            elevation: 1,
          },
          {
            key: 'someId2',
            marginVertical: heightToDP('2%'),
            marginLeft: -widthToDP('10%'),
            paddingLeft: widthToDP('13%'),
            marginRight: widthToDP('2%'),
            flex: 5,
            borderRadius: widthToDP('4%'),
            height: heightToDP('22.5%'),
          },
        ]}
      />
      <SkeletonContent
        containerStyle={styles.itemSkeletonContainer}
        isLoading={true}
        layout={[
          {
            key: 'someId',
            height: heightToDP('16%'),
            width: heightToDP('16%'),
            borderRadius: widthToDP('5%'),
            margin: widthToDP('2%'),
            elevation: 1,
          },
          {
            key: 'someId1',
            marginVertical: heightToDP('2%'),
            marginLeft: -widthToDP('10%'),
            paddingLeft: widthToDP('13%'),
            marginRight: widthToDP('2%'),
            flex: 5,
            borderRadius: widthToDP('4%'),
            height: heightToDP('22.5%'),
          },
        ]}
      />
      <SkeletonContent
        containerStyle={styles.itemSkeletonContainer}
        isLoading={true}
        layout={[
          {
            key: 'someId',
            height: heightToDP('16%'),
            width: heightToDP('16%'),
            borderRadius: widthToDP('5%'),
            margin: widthToDP('2%'),
            elevation: 1,
          },
          {
            key: 'someId1',
            marginVertical: heightToDP('2%'),
            marginLeft: -widthToDP('10%'),
            paddingLeft: widthToDP('13%'),
            marginRight: widthToDP('2%'),
            flex: 5,
            borderRadius: widthToDP('4%'),
            height: heightToDP('22.5%'),
          },
        ]}
      />
    </View>
  );
};

export default FooterSkeleton;
const styles = StyleSheet.create({
  itemSkeletonContainer: {
    flexDirection: 'row',
    marginVertical: heightToDP('1%'),
    paddingHorizontal: widthToDP('2%'),
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
