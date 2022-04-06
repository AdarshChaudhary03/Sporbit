import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {heightToDP, widthToDP} from '../../../../services/utils';

const EmptyList = () => {
  return (
    <View style={styles.emptyList}>
      <Text style={styles.emptyListTextA}>Uh-oh! This looks empty</Text>
      <Text style={styles.emptyListTextB}>
        Register in an academy{'\n'} to track progress here.
      </Text>
    </View>
  );
};

export default EmptyList;
const styles = StyleSheet.create({
  emptyList: {
    marginTop: 20,
    alignItems: 'center',
    height: heightToDP('50%'),
    justifyContent: 'center',
  },
  emptyListTextA: {
    fontSize: widthToDP('5%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyListTextB: {
    fontSize: widthToDP('4%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
