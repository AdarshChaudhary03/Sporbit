import * as React from 'react';
import {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {widthToDP} from '../../../../services/utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadPlayerProfileImage} from '../../../../services/setters';
import {AppContext} from '../../../../services/appContext';

const PlayerImageEdit = ({playerID, selfMark, setImageUploaded}) => {
  const {user, players} = useContext(AppContext);
  const player = playerID
    ? players[playerID]
    : {
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/users%2Fempty-profile.png?alt=media&token=a80433cf-7cee-436e-8cb3-b4622fe75b33',
      };
  const [playerImage, setPlayerImage] = useState(player.photoURL);

  return (
    <View style={styles.image}>
      <Avatar
        rounded
        size={widthToDP('33%')}
        title={selfMark ? user.initials : player.initials}
        source={{
          uri: selfMark ? user.photoURL : playerImage ? playerImage : 'avatar',
        }}
      />

      {!selfMark && (
        <View style={styles.imageEditButtonBox}>
          <TouchableOpacity
            style={styles.imageEditButton}
            onPress={() => {
              launchImageLibrary(
                {mediaType: 'photo', includeBase64: true},
                async (response) => {
                  const {error, didCancel, uri, base64} = response;
                  if (didCancel) {
                    console.log('User cancelled image picker');
                  } else if (error) {
                    console.log('ImagePicker Error: ', error);
                  } else {
                    setPlayerImage(uri);
                    if (playerID) {
                      await uploadPlayerProfileImage(playerID, base64);
                    } else {
                      setImageUploaded(base64);
                    }
                  }
                },
              );
            }}>
            <Text style={styles.imageEditButtonText}>
              {!playerID ? 'ADD' : 'EDIT'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlayerImageEdit;
const styles = StyleSheet.create({
  image: {
    backgroundColor: '#fff',
    height: widthToDP('33%'),
    width: widthToDP('33%'),
    borderRadius: widthToDP('16.5%'),
    marginTop: 30,
    marginBottom: 5,
    overflow: 'hidden',
  },
  profileImage: {
    height: widthToDP('33%'),
    width: widthToDP('33%'),
    borderRadius: widthToDP('16.5%'),
  },
  imageEditButtonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: widthToDP('6.6%'),
    width: widthToDP('33%'),
    marginTop: '-20%',
  },
  imageEditButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#707070',
    height: '100%',
    width: '100%',
    marginBottom: 0,
    opacity: 0.7,
  },
  imageEditButtonBlank: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '-20%',
    width: '100%',
  },
  imageEditButtonText: {
    color: '#d0cfcf',
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
