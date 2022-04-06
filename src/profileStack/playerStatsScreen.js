import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {heightToDP, widthToDP} from '../../services/utils';

const PlayerStatsScreen = ({route}) => {
  const {player} = route.params;
  // const [page, setPage] = useState(0);
  const statsBrief = {
    matches: 13,
    win: 10,
    loss: 3,
    draw: 0,
  };
  // const [matchDetails, setMatchDetails] = useState([]);
  // const numPages = Math.ceil(matchDetails.length / 5);

  // useEffect(() => {
  //   // matchDes.forEach((matchData) => {
  //   //   const opponent = matchData.players.filter((data) => {
  //   //     return data !== player.id;
  //   //   })[0];
  //   //   getPlayer(opponent).then((opponentData) => {
  //   //     console.log(opponentData);
  //   //     matchData.opponent = opponentData;
  //   //     setMatchDetails((oldData) => [...oldData, matchData]);
  //   //   });
  //   // });
  // }, []);

  const CurrentPage = () => {
    return null;
    // <View
    //   style={{
    //     width: '100%',
    //     alignItems: 'center',
    //     paddingTop: 30,
    //     height: 300,
    //   }}>
    //   <Text>No matches found</Text>
    // </View>
    // );
    //   let pageMatches = matchDetails.slice();
    //   pageMatches = pageMatches.splice(5 * page, 5);
    //   return pageMatches.map((match, index) => {
    //     const result = match.winner === player.id ? 'Win' : 'Loss';
    //     return (
    //       <DataTable.Row
    //         key={match.key}
    //         style={[
    //           styles.matchHistoryRow,
    //           {backgroundColor: index % 2 ? '#fff' : '#f5f5f5'},
    //         ]}>
    //         <DataTable.Cell style={styles.matchHistoryRowColumn}>
    //           <Text style={styles.matchHistoryRowText}>
    //             {
    //               match.matchDate
    //                 .toUTCString()
    //                 .split(' ')
    //                 .slice(0, 4)
    //                 .join(' ')
    //                 .split(',')[1]
    //             }
    //           </Text>
    //         </DataTable.Cell>
    //         <DataTable.Cell style={styles.matchHistoryRowColumn}>
    //           <Text style={styles.matchHistoryRowText}>
    //             {match.opponent.name}
    //           </Text>
    //         </DataTable.Cell>
    //         <DataTable.Cell style={styles.matchHistoryRowColumn}>
    //           <Text
    //             style={[
    //               styles.matchHistoryRowText,
    //               {
    //                 fontWeight: 'bold',
    //                 color: match.winner === player.id ? '#04ba05' : '#e21e1e',
    //               },
    //             ]}>
    //             {result}
    //           </Text>
    //         </DataTable.Cell>
    //         <DataTable.Cell numeric>
    //           <TouchableOpacity>
    //             <Text style={styles.matchDetailsButtonText}>
    //               Details {'\u2794'}
    //             </Text>
    //           </TouchableOpacity>
    //         </DataTable.Cell>
    //       </DataTable.Row>
    //     );
    //   });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image}>
        <Image source={{uri: player.photoURL}} style={styles.profileImage} />
      </View>
      <View style={styles.profileBrief}>
        <Text style={styles.nameText}>{player.name}</Text>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate('PlayerEditScreen', {*/}
        {/*      player: player,*/}
        {/*    });*/}
        {/*  }}>*/}
        {/*  <Text style={styles.editButtonText}>Edit Profile {'\u2794'}</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
      <View style={styles.playerStats}>
        <View style={styles.playerStatsTitleBox}>
          <Text style={styles.playerStatsTitleText}>PLAYER STATS</Text>
        </View>
        <View style={styles.winRate}>
          <View style={styles.winRateBar}>
            <View
            // style={{
            //   overflow: 'hidden',
            //   alignItems: 'center',
            //   backgroundColor: '#85a94e',
            //   width:
            //     (100 * statsBrief.win) / statsBrief.matches.toString(10) +
            //     '%',
            // }}
            >
              <Text style={styles.winRateBarText}>
                {statsBrief.win
                  ? Math.round((100 * statsBrief.win) / statsBrief.matches)
                  : ''}
                %
              </Text>
            </View>
            <View
            // style={{
            //   overflow: 'hidden',
            //   alignItems: 'center',
            //   backgroundColor: '#b33430',
            //   width:
            //     (100 * statsBrief.loss) / statsBrief.matches.toString(10) +
            //     '%',
            // }}
            >
              <Text style={styles.winRateBarText}>
                {statsBrief.loss
                  ? Math.round((100 * statsBrief.loss) / statsBrief.matches)
                  : ''}
                %
              </Text>
            </View>
            <View
            // style={{
            //   overflow: 'hidden',
            //   alignItems: 'center',
            //   backgroundColor: '#8a8886',
            //   width:
            //     (100 * statsBrief.draw) / statsBrief.matches.toString(10) +
            //     '%',
            // }}
            >
              <Text style={styles.winRateBarText}>
                {statsBrief.draw
                  ? Math.round((100 * statsBrief.draw) / statsBrief.matches)
                  : ''}
                %
              </Text>
            </View>
          </View>
          <View style={styles.winRateBox}>
            <View style={styles.winRateBoxCell}>
              <Text style={styles.winRateBoxCellTextA}>WINS</Text>
              <Text style={styles.winRateBoxCellTextB}>{statsBrief.win}</Text>
            </View>
            <View style={styles.winRateBoxCell}>
              <Text style={styles.winRateBoxCellTextA}>LOSS</Text>
              <Text style={styles.winRateBoxCellTextB}>{statsBrief.loss}</Text>
            </View>
            <View style={styles.winRateBoxCell}>
              <Text style={styles.winRateBoxCellTextA}>DRAWS</Text>
              <Text style={styles.winRateBoxCellTextB}>{statsBrief.draw}</Text>
            </View>
          </View>
        </View>
        <View
        // style={{
        //   width: '70%',
        //   flexDirection: 'row',
        // }}
        >
          <View
          // style={{width: '50%'}}
          >
            <Text style={styles.playerStatHeaderText}>Level </Text>
            <Text style={styles.playerStatText}>{player.level}</Text>
          </View>
          <View
          // style={{width: '50%'}}
          >
            {/*<Text style={[styles.playerStatHeaderText, {textAlign: 'right'}]}>*/}
            {/*  Assessment{' '}*/}
            {/*</Text>*/}
            {/*<Text style={[styles.playerStatText, {textAlign: 'right'}]}>*/}
            {/*  Pending*/}
            {/*</Text>*/}
          </View>
        </View>
      </View>
      <View style={styles.matchHistory}>
        <View style={styles.matchHistoryTitleBox}>
          <Text style={styles.matchHistoryTitleText}>MATCH HISTORY</Text>
        </View>
        <DataTable>
          <DataTable.Header style={styles.matchHistoryHeader}>
            <DataTable.Title style={styles.matchHistoryHeaderColumn}>
              <Text style={styles.matchHistoryHeaderText}>DATE</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.matchHistoryHeaderColumn}>
              <Text style={styles.matchHistoryHeaderText}>OPPONENT</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.matchHistoryHeaderColumn}>
              <Text style={styles.matchHistoryHeaderText}>RESULT</Text>
            </DataTable.Title>
          </DataTable.Header>

          <CurrentPage />

          {/*<DataTable.Pagination*/}
          {/*  page={page}*/}
          {/*  numberOfPages={numPages}*/}
          {/*  onPageChange={(newPage) => {*/}
          {/*    console.log('Page ', newPage);*/}
          {/*    setPage(newPage);*/}
          {/*  }}*/}
          {/*  label={*/}
          {/*    'Page ' + (page + 1).toString(10) + ' of ' + numPages.toString(10)*/}
          {/*  }*/}
          {/*/>*/}
        </DataTable>
      </View>
    </ScrollView>
  );
};
export default PlayerStatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
  },
  headerBar: {
    height: heightToDP('6.5%'),
    marginBottom: -heightToDP('6.5%'),
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  profileImage: {
    height: widthToDP('33%'),
    width: widthToDP('33%'),
    borderRadius: widthToDP('16.5%'),
  },
  profileBrief: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  nameText: {
    fontSize: 32,
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 5,
    color: '#707070',
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'Gilroy-SemiBold',
    color: '#ff6362',
    fontWeight: 'bold',
  },
  playerStats: {
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingTop: 20,
    marginVertical: 20,
    marginLeft: '2%',
    paddingBottom: 70,
  },
  playerStatsTitleBox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#707070',
    paddingBottom: 10,
  },
  playerStatsTitleText: {
    fontSize: widthToDP('6%'),
    color: '#292929',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  winRate: {
    paddingVertical: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winRateBar: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  winRateBarText: {
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    paddingVertical: 2,
  },
  winRateBox: {
    paddingVertical: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winRateBoxCell: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winRateBoxCellTextA: {
    fontSize: widthToDP('5.5%'),
    color: '#292929',
    fontFamily: 'Gilroy-Regular',
    letterSpacing: 2,
    paddingBottom: 5,
  },
  winRateBoxCellTextB: {
    fontSize: widthToDP('5.5%'),
    color: '#707070',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  playerStatHeaderText: {
    fontSize: widthToDP('5.5%'),
    fontFamily: 'Gilroy-Regular',
    color: '#000',
  },
  playerStatText: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    color: '#707070',
    fontWeight: 'bold',
  },
  matchHistory: {
    width: '96%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 20,
    paddingLeft: '2%',
    marginLeft: '2%',
  },
  matchHistoryTitleBox: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  matchHistoryTitleText: {
    fontSize: 24,
    color: '#292929',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
  matchHistoryHeader: {
    width: '98%',
    backgroundColor: '#ff6362',
  },
  matchHistoryHeaderColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchHistoryHeaderText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
  matchHistoryRow: {
    width: '98%',
  },
  matchHistoryRowColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchHistoryRowText: {
    fontSize: 14,
    color: '#818181',
    fontFamily: 'Gilroy-Regular',
  },
  matchDetailsButtonText: {
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    color: '#ff6362',
  },
  deleteButton: {
    backgroundColor: '#ff6362',
    paddingVertical: 20,
    paddingHorizontal: 40,
    margin: 40,
    alignItems: 'center',
    borderRadius: 40,
  },
  deleteButtonText: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 2,
  },
});
