import {FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as React from 'react';
import {useState} from 'react';
// import Carousel from 'react-native-snap-carousel';
// import VideoPlayer from 'react-native-video-player';
import Expand from '../../../../assets/icons/courses/expand.svg';
import Compress from '../../../../assets/icons/courses/compress.svg';
import { heightToDP, widthToDP } from '../../../../services/utils';
import CheckBox from '@react-native-community/checkbox';


const MediaView = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {classHistory, studentID} = props;
  // const [carouselRef, setCarouselRef] = useState('');
  // const [vidIndex, setVidIndex] = useState(0);

  const MediaItems = (itemData,index) => {
    return (
      <View style={styles.mediaItem}> 
        <TouchableOpacity
     onPress={() => {
        Linking.openURL(itemData.item);
            }}
          >
         <Image style={{width: '100%', height: 100, borderRadius: 20, marginBottom: 10}} source={{ uri: `https://img.youtube.com/vi/${itemData.item.split('youtu.be/')[1]}/0.jpg`}}/>   
        <Text style={styles.mediaItemText}>{itemData.item}</Text>
      </TouchableOpacity>
      </View>
    );
  }
  


  // const vidUrL = [
  //   {
  //     sources:
  //       'https://cdn.videvo.net/videvo_files/video/premium/video0123/small_watermarked/9%20Tennis%20fashion_preview.webm',
  //     thumb:
  //       'https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
  //   },
  //   {
  //     sources:
  //       'https://cdn.videvo.net/videvo_files/video/premium/video0123/small_watermarked/8%20Tennis%20fashion_preview.webm',
  //     thumb:
  //       'https://images.theconversation.com/files/202542/original/file-20180119-80200-1lvcufx.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
  //   },
  //   {
  //     sources:
  //       'https://cdn.videvo.net/videvo_files/video/premium/video0123/small_watermarked/36%20Tennis%20fashion_preview.webm',
  //     thumb:
  //       'https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',
  //   },
  // ];

  // const renderVideos = ({item}) => {
  //   return (
  //     <View>
  //       <Image
  //         source={{uri: item.thumb}}
  //         style={styles.vidThumbs}
  //         resizeMode={'cover'}
  //       />
  //     </View>
  //   );
  // };

  if (!expanded) {
    return (
      <View style={styles.feedbackView}>
        <View style={styles.tabHeader}>
          <Text style={styles.tabHeaderText}>Media</Text>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Expand />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.feedbackView}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderText}>Media</Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Compress />
        </TouchableOpacity>
      </View>
    <View style={styles.homework}>
        {Object.keys(classHistory)
          .sort((a, b) => b - a)
          .filter((classKey) => classHistory[classKey].media.length!==0)
          .map((classKey, index) => {
            if (index > 2) {
              return null;
            }
            const date = new Date(parseInt(classKey, 10));
            return (
              <View key={index} style={styles.homeworkRow}>
                <View>
                  <Text style={styles.homeworkDateText}>
                    {date.toUTCString().split(' ').splice(0, 3).join(' ')}
                  </Text>
                  <Text style={styles.homeworkText}>
                    <FlatList
                      data={classHistory[classKey].media}
                      renderItem={MediaItems}
                      keyExtractor={(item, index) => index}
                      />
                  </Text>
                </View>
              </View>
            );
          })}
      </View>    
      </View>
  );
};
export default MediaView;

const styles = StyleSheet.create({
  feedbackView: {
    padding: heightToDP('3%'),
    marginHorizontal: widthToDP('4%'),
    marginBottom: widthToDP('7%'),
    backgroundColor: '#fff',
    borderRadius: widthToDP('3%'),
  },
  homeworkDateText: {
    color: 'rgba(111, 111, 111, 1)',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: widthToDP('4.5%'),
  },
  mediaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: heightToDP('2%'),
    marginTop: heightToDP('2%'),
  },
  homeworkText: {
    margin: heightToDP('2%'),
  },
  homework: {
    paddingBottom: heightToDP('5%'),
    paddingTop: heightToDP('5%'),
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabHeaderText: {
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-SemiBold',
    alignSelf: 'flex-start',
  },
  mediaItemText: {
    color: 'blue'
  },
  videoGallery: {
    alignItems: 'center',
  },
  video: {
    marginTop: heightToDP('3%'),
    width: widthToDP('80%'),
  },
  homeworkRow: {
    flexDirection: 'row',
    paddingTop: heightToDP('1%'),
  },
  vidThumbs: {
    width: widthToDP('25%'),
    height: widthToDP('25%'),
    borderRadius: widthToDP('2%'),
  },
  carousel: {
    marginTop: heightToDP('3%'),
    marginHorizontal: widthToDP('5%'),
    height: widthToDP('25%'),
  },
  checkbox: {
    color: 'rgba(255, 89, 89, 1)',
    fontSize: widthToDP('5%'),
  },
  markDone: {
    fontFamily: 'Gilroy-SemiBold',
    color: '#6F6F6F',
  },
});
