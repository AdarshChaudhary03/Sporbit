import GetLocation from 'react-native-get-location';

export const getLocation = async () => {
  try {
    return await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
    });
  } catch (e) {
    console.log(e);
  }
  try {
    return await GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 5000,
    });
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const setLocation = (location) => {};
