import {Dimensions, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get('window');

const widthToDP = (number) => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};
const heightToDP = (number) => {
  let givenHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

export {widthToDP, heightToDP};
