import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useState, useEffect} from 'react';
import {widthToDP, heightToDP} from '../../../../services/utils';
import firebaseSetup from '../../../../services/setup';
const {firestore} = firebaseSetup();


const CoachesTab = (props) => {
  const [carouselRef, setCarouselRef] = useState('');
  const [ coaches, setCoaches ] = useState([]);
  const {sports } = props.route.params;
  const coachesList = [];

  
useEffect(() => {
  console.log("Academy Starts");
console.log("Welkcome");
console.log(window.academyID);
let tableReference = firestore().collection("academies").doc(window.academyID);
firestore().collection(`coaches`)
.where('sports','==',sports.uid.trim())
.where('academy','==',tableReference)
.get().then((querySnapshot) => {
  for(const docSnapshot of querySnapshot.docs){
    let coachItem = {
      name: docSnapshot.data().displayName,
      image: docSnapshot.data().photoURL,
      description: docSnapshot.data().description,
      status: docSnapshot.data().status
    }
    let currentID = docSnapshot.id;
    let appObj = { ...coachItem, ['id']: currentID }
    coachesList.push(appObj);
//    coachesList.push(docSnapshot.data());
    console.log("Done");
  }
  setCoaches(coachesList);
});
},[]);


//console.log(coaches[0].name);


/*
  const coaches = [
    {
      name: 'Vijayant Malik',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2FVijayant%20malik%404x.png?alt=media&token=2389a232-f989-4c31-bd06-54d12b3c6b60',
      designation: 'Mentor',
      description: [
        'Represented INDIA in Davis Cup', 
        'Silver Medalist in Jr. Commonwealth Games', 
        '8 Times Fenesta Champion',
        'Career high 413 ATP world ranking', 
            ],
    },
    {
      name: 'Ajay Yadav',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2Fajay.jpeg?alt=media&token=fdaf5530-3ed6-455b-8c7d-f08ccb9294db',
      designation: 'Head Coach',
      description: [
        'International Tennis Fedration Player', 
        '5th Rank in Men\'s Category in AITA',
        '7 years Ex\' Trained plyers in dubai, singapore'
             ],
    },
    {
      name: 'Rajneesh Kumar',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2FRajnesh.jpeg?alt=media&token=b6ea8209-ece8-491e-9a77-d9a86bdce75f',
      designation: 'Munchkin Head Coach',
      description: [
        'US-PTR', 
        'AITA Level-II Certified coach', 
        '11 years of experience, Great Communication skills'
      ],
    },
    {
      name: 'Jaswant',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2FJaswant.jpeg?alt=media&token=12c28a57-29f6-47a8-9a7e-5447613dbf58',
      designation: 'Senior Tennis Coach',
      description: [
        'ITF Level-1', 
        'AITA Level-III Certified coach', 
        '10 years of experience', 
        'Great Explainer'
          ],
    },
    {
      name: 'Parmod Kumar',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2FParmod.jpeg?alt=media&token=70923b90-fc19-4e8a-ae1a-c071dce8c29a',
      designation: 'Tennis Coach',
      description: [
        'US-PTR', 
        'AITA Level-II Certified coach', 
        '11 years of experience, Great Communication skills'
      ],
    },
    {
      name: 'Suresh Kumar',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2FSuresh.jpeg?alt=media&token=4fb6c235-0bfc-4447-8677-9d777ba60d86',
      designation: 'Tennis Coach',
      description: [
        'US-PTR', 
        'AITA Level-II Certified coach', 
        '11 years of experience, Great Communication skills'
      ],
    },
    {
      name: 'Sanjeet',
      image:
        'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/coaches%2Fsanjeet.jpeg?alt=media&token=2077bf32-e357-4298-8fa4-84bf702a6748',
      designation: 'Tennis Coach',
      description: [
        'US-PTR', 
        'AITA Level-II Certified coach', 
        '11 years of experience, Great Communication skills'
      ],
    },
    ];
*/
  const renderCoaches = (item) => {
    console.log("item Check");
    console.log(item.item);
    return (      
      <View style={styles.coachItem}>
        <View style={styles.coachProfile}>
          <View style={styles.image}>
            <Image
              source={{uri: item.item.image ? item.item.image : 'https://firebasestorage.googleapis.com/v0/b/last-page-54d6b.appspot.com/o/users%2Fempty-profile.png?alt=media&token=a80433cf-7cee-436e-8cb3-b4622fe75b33'}}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.name}>
            <Text numberOfLines={2} style={styles.coachNameText}>
              {item.item.name}
            </Text>
            <Text numberOfLines={1} style={styles.coachDesignationText}>
              {item.item.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.coachDescription}>
        {Object.keys(item.item.description).map((desc) => {
          return (<View key={desc} style={styles.coachDescriptionRow}>
            <Text style={styles.coachDescriptionDot}>{'\u2B24'}</Text>
            <Text style={styles.coachDescriptionText}>
                        {item.item.description[desc]}
            </Text>
          </View>)
        })}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.tab}>
      <View style={styles.carousel}>
        <Carousel
          ref={(c) => {
            setCarouselRef(c);
          }}
          onSnapToItem={() => {
            console.log(carouselRef._activeItem);
          }}
          layout={'default'}
          sliderWidth={widthToDP('100%')}
          itemWidth={widthToDP('70%')}
          data={coaches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCoaches}
        />
      </View>
    </View>
  );
};
export default CoachesTab;

const styles = StyleSheet.create({
  tab: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    height: heightToDP('50%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    justifyContent: 'center',
    marginTop: heightToDP('2%'),
  },
  coachItem: {
    height: '80%',
    // width: '100%',
    elevation: 3,
    borderRadius: widthToDP('5%'),
    paddingVertical: heightToDP('2.5%'),
    backgroundColor: '#fff',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: widthToDP('5%'),
  },
  profileImage: {
    height: widthToDP('18%'),
    width: widthToDP('18%'),
    borderRadius: widthToDP('50%'),
  },
  coachProfile: {
    flexDirection: 'row',
    // borderBottomColor: '#272727',
    paddingBottom: heightToDP('1.5%'),
    borderBottomWidth: 0.5,
  },
  name: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: widthToDP('25%'),
    width: widthToDP('40%'),
    marginLeft: widthToDP('3%'),
  },
  coachNameText: {
    color: '#292929',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    letterSpacing: 1,
    textAlign: 'left',
  },
  coachDesignationText: {
    color: 'black',
    fontSize: widthToDP('3.5%'),
    fontFamily: 'Gilroy-Regular',
  },
  coachDescription: {
    // width: '80%',
    // marginTop: 10,
    // marginLeft: 10,
    paddingHorizontal: widthToDP('3%'),
  },
  coachDescriptionRow: {
    flexDirection: 'row',
    marginVertical: heightToDP('1%'),
    // marginBottom: 10,
  },
  coachDescriptionDot: {
    color: '#ff6362',
    fontSize: widthToDP('3.2%'),
    fontFamily: 'Gilroy-SemiBold',
    // letterSpacing: 2,
    marginRight: widthToDP('2%'),
  },
  coachDescriptionText: {
    color: 'black',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    // letterSpacing: 2,
  },
});
