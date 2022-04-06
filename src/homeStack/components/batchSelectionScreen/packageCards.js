import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView } from 'react-native';
import { PricingCard } from 'react-native-elements/dist/pricing/PricingCard';
import Carousel from 'react-native-snap-carousel';
import firebaseSetup from '../../../../services/setup';
const {firestore} = firebaseSetup();

export default class PackageCards extends React.Component {

 
    constructor(props){
        super(props);
        console.log("Academies present in Package Cards");
        console.log(this.props.academy.id);
        console.log("Sports present in package cards");
        console.log(this.props.sports.name);
        this.state = {
          activeIndex:0,
          packageItems: [],
          carouselItems: [
          {
              title:"Monthly",
              text: "$50",
              benefits: [
                  'Basic Support',
                  'Email Sending',
                  'Personal Coach'
              ]
          },
          {
              title:"Quarterly",
              text: "50,000/-",
              benefits: [
                'Basic Support',
                'Email Sending',
                'Personal Coach'
            ]
        },
          {
              title:"Half Yearly",
              text: "50,000/-",
              benefits: [
                'Basic Support',
                'Email Sending',
                'Personal Coach'
            ]
        },
          {
              title:"Yearly",
              text: "50,000/-",
              benefits: [
                'Basic Support',
                'Email Sending',
                'Personal Coach'
            ]
        },
        ]
      }

        let academyRef = firestore().collection('academies').doc(this.props.academy.id);
        firestore()
   .collection("packages")
   .where("sports",'==',this.props.sports.name)
   .where("academy",'==',academyRef)
    .get()
   .then((querySnapshot) => { //Notice the arrow funtion which bind `this` automatically.
      querySnapshot.forEach(function(doc) {
        packageItems.push(doc.data());
      });
      this.setState({
        packageItems: packageItems
      }); //set data in state here
   });
      console.log("Packages fetched....");
      console.log(this.packageItems);
//      console.log(this.packageItems);

    }

    _renderItem({item,index}){
        return (            
          <View>
<PricingCard
  color="#1C2657"
  title={item.title}
  price={item.text}
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'BOOK NOW', icon: 'shopping-cart' }}/>
            </View>
        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'', paddingTop: 30, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.packageItems}
                  sliderWidth={400}
                  itemWidth={280}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

