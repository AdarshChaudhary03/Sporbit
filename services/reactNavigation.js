import * as React from 'react';
export const isNavigationReady = React.createRef();
export const navigation = React.createRef();
export function navigate(name, params) {
  if (isNavigationReady.current && navigation.current) {
    // Perform navigation if the app has mounted
//    console.log('entered here....');
    navigation.current.navigate(name, params);
  } else {
    setTimeout(() => navigate(name), 500);
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function goBack() {
  navigation.current.goBack();
}
