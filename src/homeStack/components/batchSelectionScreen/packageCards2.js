import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../../../../services/animationUtils';
import { PricingCard } from 'react-native-elements/dist/pricing/PricingCard';
import firebaseSetup from '../../../../services/setup';
const {firestore} = firebaseSetup();


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 250;
const ITEM_HEIGHT = 350;

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i)
}


export default class PackageCards2 extends Component {
  
  state = {
    index: 0,
    packages: []
  }

  constructor(props) {
    super(props);
    let packageList = [];
    let academyRef = firestore().collection('academies').doc(this.props.academy.id);
    firestore().collection('packages')
    .where("sports",'==',this.props.sports.name)
    .where("academy",'==',academyRef)
    .get().then((querySnapshot) => {
      for(const docSnapshot of querySnapshot.docs){
        packageList.push(docSnapshot.data().packageDetails);
        console.log("Done");
      }
      console.log(packageList);
      this.setState({packages: packageList})
    });
        this._renderItem = this._renderItem.bind(this)
  }

  componentWillUnmount() { 
   }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
<PricingCard
  color="#1C2657"
  title={item.name}
  price={item.monthly+'/-'}
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'BOOK NOW', icon: 'shopping-cart' }}/>
      </View>
    );
  }
  
  render() {
    return (
      <View>
        <Carousel
          ref={(c) => this.carousel = c}
          data={this.state.packages[0]}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
        <Text style={styles.counter}
        >
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
