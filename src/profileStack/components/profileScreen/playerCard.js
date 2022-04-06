import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {heightToDP, widthToDP} from '../../../../services/utils';
import Profile from '../../../../assets/icons/profile/others/profile.svg';
import Stats from '../../../../assets/icons/profile/others/stats.svg';
import badgeData from './badgeData';
import Badges from './badges';
import * as React from 'react';
import {useContext, useState} from 'react';
import {AppContext} from '../../../../services/appContext';
import EmptyPlayerCard from './emptyPlayerCard';
import BadgeModal from './badgeModal';
import {reactNavigation} from '../../../../services';

const PlayerCard = ({playerID}) => {
  const {players} = useContext(AppContext);
  const player = players[playerID];
  const [badgeID, setBadgeID] = useState('b1');
  const [modalVisible, setModalVisible] = useState(false);

  const badgesArray = ['b2'];
  if (!player.students.length) {
    return <EmptyPlayerCard player={player} />;
  }
  return (
    <View key={player.id} style={styles.playerItem}>
      <BadgeModal
        badgeID={badgeID}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.playerItemTop}>
        <Avatar
          rounded
          size={widthToDP('15%')}
          title={player.initials}
          source={{
            uri: player.photoURL ? player.photoURL : 'avatar',
          }}
        />
        <View style={styles.playerBrief}>
          <Text style={styles.playerText}>{player.name}</Text>
          <TouchableOpacity
            style={styles.showProfile}
            onPress={() => {
              reactNavigation.navigate('PlayerEditScreen', {
                playerID: player.id,
              });
            }}>
            <Profile />
            <Text style={styles.playerTextBottom}>Show Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.playerItemBottom}>
        <View style={styles.badgesContainer}>
          <View style={styles.badgesBox}>
            {badgesArray.map((playerBadge) => {
              const badgeInfo = badgeData[playerBadge];
              return (
                <TouchableOpacity
                  key={playerBadge}
                  onPress={() => {
                    setModalVisible(true);
                    setBadgeID(playerBadge);
                  }}
                  style={styles.badge}>
                  <Badges type={badgeInfo.badge} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.detailsRight}>
            <View style={styles.detailsRightItem}>
              <Text style={styles.playerTextTop}>Level</Text>
              <Text style={styles.playerTextAcademy}>{player.level}</Text>
            </View>
            <View>
              <Text style={styles.playerTextTop}>Status</Text>
              <Text style={styles.playerTextAcademy}>{player.status}</Text>
            </View>
          </View>
        </View>
        <View style={styles.playerCardFooter}>
          <View style={styles.academyDetails}>
            <Text style={styles.playerTextTop}>Classes @ </Text>
            <Text style={styles.playerTextAcademy}>
              {player.academyName.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.statsButton}
            onPress={() => {
              reactNavigation.navigate('CourseScreen', {
                playerID: player.id,
              });
            }}>
            <View style={styles.statsIcon}>
              <Stats />
            </View>
            <Text style={styles.playerTextBottom}>View Stats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlayerCard;
const styles = StyleSheet.create({
  badgesBox: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  badgesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  statsIcon: {
    marginRight: widthToDP('2%'),
  },
  statsButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsRight: {
    flex: 1,
    marginTop: heightToDP('1%'),
  },
  detailsRightItem: {
    marginBottom: heightToDP('2%'),
  },
  playerCardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: heightToDP('1%'),
  },
  academyDetails: {
    flex: 1,
  },
  badge: {
    marginRight: widthToDP('7%'),
    marginBottom: heightToDP('2%'),
  },
  playerItem: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: widthToDP('4%'),
    padding: 5,
    marginVertical: heightToDP('2%'),
    marginHorizontal: widthToDP('1%'),
    alignItems: 'center',
    width: widthToDP('90%'),
  },
  playerItemTop: {
    padding: 5,
    marginVertical: 5,
    flexDirection: 'row',
    width: widthToDP('80%'),
  },
  playerBrief: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  deleteButton: {
    alignItems: 'flex-end',
    marginRight: widthToDP('5%'),
  },
  playerImage: {
    borderRadius: 75,
    alignItems: 'center',
  },
  playerText: {
    marginLeft: widthToDP('3%'),
    color: '#000000',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  playerItemBottom: {
    padding: 5,
    marginVertical: 5,
    width: '90%',
  },
  playerTextTop: {
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    color: 'black',
    fontWeight: 'bold',
  },
  playerTextAcademy: {
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    color: 'black',
  },
  playerTextBottom: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    color: '#ff6362',
    fontWeight: 'bold',
  },
  showProfile: {
    flexDirection: 'row',
    marginLeft: widthToDP('3%'),
  },
});
