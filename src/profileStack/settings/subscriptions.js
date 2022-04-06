import React, {useContext} from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import {getSubscriptions} from '../../../services/getters';
import {AppContext} from '../../../services/appContext';
import SubscriptionCard from '../components/subscriptions/subscriptionCard';
import Header from '../../components/header';
import {Avatar} from 'react-native-elements';
import {reactNavigation} from '../../../services';


export default function Subscriptions({navigation}) {
  const [subscriptions, setSubscriptions] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const {players} = useContext(AppContext);
  let playerIDInitial = Object.keys(players)[0];
  const [selectedPlayer, setSelectedPlayer] = useState(playerIDInitial);
  const [initializing, setInitializing] = useState(true);

  // const offset = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const subscriptionData = await getSubscriptions();
    setSubscriptions(subscriptionData);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    console.log('selectedPlayer',players[selectedPlayer]);
    getSubscriptions().then(async (subscriptionData) => {
      setSubscriptions({...subscriptionData});
      setInitializing(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header text={'Subscriptions'} />
      {!Object.keys(subscriptions).length && !initializing && (
        <View style={styles.emptyList}>
          <Text style={styles.emptyListTextA}>This looks Empty</Text>
          <Text style={styles.emptyListTextB}>
            You should register in a course to show your subscriptions here.
          </Text>
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.playerSelector}>
          <View style={styles.playerSelectorInner}>
            {Object.keys(players).map((playerID) => {
              const playerData = players[playerID];
              return (
                <View>
                <TouchableOpacity
                  style={
                    selectedPlayer === playerID
                      ? styles.selectedPlayerImage
                      : styles.playerImage
                  }
                  key={playerID}
                  onPress={() => setSelectedPlayer(playerID)}>
                  <Avatar
                    rounded
                    size={
                      selectedPlayer === playerID
                        ? widthToDP('25%')
                        : widthToDP('20%')
                    }
                    title={playerData.initials}
                    source={{
                      uri: playerData.photoURL ? playerData.photoURL : 'avatar',
                    }}
                  />
                </TouchableOpacity>
                <View>
              {selectedPlayer === playerID ? <TouchableOpacity onPress={() => {
                console.log('players[selectedPlayer]',players[selectedPlayer]);
                reactNavigation.navigate('LayOffScreen', {player: players[selectedPlayer]});
              }}>
              <Text style={styles.layOffText}>Apply LayOff</Text>
              </TouchableOpacity> : null}
            </View>
                </View>
              );
            })}
          </View>

          <ScrollView
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}>
            {Object.keys(subscriptions)
              .filter((subscriptionID) => {
                return (
                  subscriptions[subscriptionID].playerID === selectedPlayer
                );
              })
              .sort((a, b) => {
                return (
                  subscriptions[a].dueDate.getTime() -
                  subscriptions[b].dueDate.getTime()
                );
              })
              .map((subscriptionID) => {
                return (
                  <SubscriptionCard
                    key={subscriptionID}
                    subscription={subscriptions[subscriptionID]}
                    navigation={navigation}
                    subscriptionID={subscriptionID}
                  />
                );
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  layOffText: {
    fontSize: 15,
    color: '#ff6362'
  },
  playerSelector: {
    flex: 1,
    paddingTop: heightToDP('8%'),
  },
  playerSelectorInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emptyList: {
    marginTop: 20,
    alignItems: 'center',
    height: heightToDP('75%'),
    justifyContent: 'center',
    marginHorizontal: widthToDP('12%'),
    alignSelf: 'center',
  },
  emptyListTextA: {
    fontSize: widthToDP('5%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  emptyListTextB: {
    textAlign: 'center',
    fontSize: widthToDP('4%'),
    marginVertical: 5,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  playerImage: {
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
  },
  selectedPlayerImage: {
    borderRadius: widthToDP('50%'),
    borderWidth: 2,
    borderColor: '#ff6362',
    marginTop: heightToDP('3%'),
    marginBottom: heightToDP('2%'),
  },
  scrollPage: {
    width: widthToDP('100%'),
    padding: widthToDP('3%'),
  },
  subsBox: {
    borderRadius: widthToDP('4%'),
    backgroundColor: '#ffff',
    elevation: 5,
    padding: widthToDP('2%'),
    marginBottom: heightToDP('3%'),
  },
  subsIcon: {
    width: widthToDP('7%'),
    height: widthToDP('7%'),
    marginRight: widthToDP('3%'),
  },
  subsHeaderText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('5%'),
  },
  renewText: {
    color: '#FF5959',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
  },
  divisionText: {
    color: '#898989',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-Regular',
    marginHorizontal: widthToDP('1%'),
  },
  changeText: {
    color: '#FF5959',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4%'),
  },
  startedText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('3.6%'),
  },
  endText: {
    color: 'black',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('3.6%'),
  },
  subsActivity: {
    left: widthToDP('0.8%'),
    top: heightToDP('0.6%'),
    color: '#ffff',
    height: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('1.2%'),
    fontSize: widthToDP('3%'),
    backgroundColor: 'rgba(20, 154, 25, 0.61)',
  },
  subsInactivity: {
    left: widthToDP('0.8%'),
    top: heightToDP('0.6%'),
    color: '#ffff',
    height: widthToDP('4%'),
    fontFamily: 'Gilroy-SemiBold',
    borderRadius: widthToDP('1%'),
    paddingHorizontal: widthToDP('1.2%'),
    fontSize: widthToDP('3%'),
    backgroundColor: 'rgba(255, 1, 1, 1)',
  },
  startEndRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: heightToDP('0.5%'),
    marginRight: widthToDP('14%'),
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: heightToDP('0.5%'),
  },
  dueDate: {
    color: 'black',
    fontFamily: 'Gilroy-Regular',
    fontSize: widthToDP('4%'),
  },
  studentNameBox: {
    borderRadius: widthToDP('2%'),
    paddingHorizontal: widthToDP('0.5%'),
    paddingVertical: heightToDP('0.5%'),
    backgroundColor: 'rgba(20, 154, 25, 0.61)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentNameText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: widthToDP('2.5%'),
  },
  horizontalScroll: {
    height: heightToDP('0.1%'),
    borderRadius: widthToDP('0.1%'),
    borderStyle: 'solid',
    backgroundColor: '#FF5959',
    marginVertical: 5,
  },
  paymentItem: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderColor: '#fff',
    borderRadius: 50,
    zIndex: 10,
    borderWidth: 2,
    margin: 5,
    padding: 30,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentStatus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6362',
    borderBottomWidth: 1,
    width: '50%',
    borderBottomColor: '#707070',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  paymentButtonText: {
    marginVertical: 15,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  item: {
    marginVertical: 5,
    paddingHorizontal: 5,
    width: widthToDP('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleLogo: {
    flex: 1,
    marginTop: 220,
    width: widthToDP('100%'),
  },
  title: {
    color: '#fff',
    fontSize: 52,
    fontFamily: 'Gilroy-SemiBold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  learn: {
    marginTop: 10,
    color: '#fff',
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: heightToDP('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: heightToDP('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-SemiBold',
  },
  subHeader: {
    height: heightToDP('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: heightToDP('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Gilroy-SemiBold',
  },
  logo: {
    width: widthToDP('100%'),
    height: heightToDP('100%'),
  },
  footer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: heightToDP('90%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  settingsTab: {},
  settingsTabText: {},
  paymentDescriptionText: {
    fontSize: widthToDP('3%'),
    color: '#000',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  settingsTabArrow: {
    fontSize: widthToDP('1%'),
    color: '#ff6362',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    textAlign: 'right',
  },
});
