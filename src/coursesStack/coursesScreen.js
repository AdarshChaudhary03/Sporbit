import * as React from 'react';
import {useCallback, useContext, useState} from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {AppContext} from '../../services/appContext';
import {heightToDP} from '../../services/utils';
import Header from '../components/header';
import CourseCard from './components/coursesScreen/courseCard';
import EmptyList from './components/coursesScreen/emptyList';
import {reactNavigation} from '../../services';


const CoursesScreen = () => {
  let {players, updateUserContext} = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await updateUserContext();
    setRefreshing(false);
  }, [updateUserContext]);

  return (
    <View style={styles.container}>
      <Header text={'Courses'} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={Object.values(players).filter((player) => {  
          console.log(players);        
          return player.status !== 'Unregistered';
        })}
        ListEmptyComponent={EmptyList}
        renderItem={CourseCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CoursesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
    paddingTop: heightToDP('8%'),
  },
});
