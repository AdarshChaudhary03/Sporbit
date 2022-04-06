import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, ToastAndroid } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from '../../../../services/animationUtils';
import { PricingCard } from 'react-native-elements/dist/pricing/PricingCard';
import firebaseSetup from '../../../../services/setup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { heightToDP, widthToDP } from '../../../../services/utils';

const {firestore} = firebaseSetup();


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 250;
const ITEM_HEIGHT = 350;


export default class PackageCards3 extends Component {
  
  state = {
    index: 0,
    packages: []
  }

  confirmPressed(payDuration, amount) {
//    ConfirmationScreen().confirmPressed(payDuration,amount)
return true;
  }
    
  constructor(props) {
    super(props);
    let packageList = [];
    console.log("entered in packageCards3");
    console.log(this.props);
    console.log(this.props.pack);
    console.log(this.props.batch.level);
    let academyRef = firestore().collection('academies').doc(this.props.academy.id);
    firestore().collection('packages')
    .where("sports",'==',this.props.sports.name)
    .where("academy",'==',academyRef)
    .get().then((querySnapshot) => {
      for(const docSnapshot of querySnapshot.docs){
          console.log(docSnapshot.data().packageDetails[0]);
          switch(this.props.pack){
            case '3':
              if(this.props.batch.level=='Beginner'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails[0].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: this.props.percentOff ? docSnapshot.data().packageDetails[0].quaterly-((this.props.percentOff/100)*docSnapshot.data().packageDetails[0].quaterly) :docSnapshot.data().packageDetails[0].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[0].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[0].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Intermediate'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails[1].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[1].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[1].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[1].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Advanced'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails[2].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[2].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[2].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[2].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Professional' || this.props.batch.level=='Munchkin'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails[3].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[3].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[3].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails[3].annually,
                        type: 'Annually'});
              }
                break;
            case '6':
              if(this.props.batch.level=='Beginner'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[0].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[0].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[0].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[0].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Intermediate'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[1].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[1].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[1].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[1].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Advanced'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[2].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[2].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[2].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[2].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Professional' || this.props.batch.level=='Munchkin'){
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[3].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[3].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[3].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().packageDetails1[3].annually,
                        type: 'Annually'});
              }
                  break;
                  case '2':
                    if(this.props.batch.level=='Beginner'){
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[0].monthly,
                          type: 'Monthly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[0].quaterly,
                              type: 'Quarterly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[0].semiAnnual,
                              type: 'Half Yearly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[0].annually,
                              type: 'Annually'});
                    }
                    if(this.props.batch.level=='Intermediate'){
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[1].monthly,
                          type: 'Monthly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[1].quaterly,
                              type: 'Quarterly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[1].semiAnnual,
                              type: 'Half Yearly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[1].annually,
                              type: 'Annually'});
                    }
                    if(this.props.batch.level=='Advanced'){
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[2].monthly,
                          type: 'Monthly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[2].quaterly,
                              type: 'Quarterly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[2].semiAnnual,
                              type: 'Half Yearly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[2].annually,
                              type: 'Annually'});
                    }
                    if(this.props.batch.level=='Professional' || this.props.batch.level=='Munchkin'){
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[3].monthly,
                          type: 'Monthly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[3].quaterly,
                              type: 'Quarterly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[3].semiAnnual,
                              type: 'Half Yearly'});
                      packageList.push(
                          {price: docSnapshot.data().packageDetails2[3].annually,
                              type: 'Annually'});
                    }
                      break;
                  default: 
              if(this.props.batch.level=='Superbatch' && this.props.pack === 's42'){
                packageList.push(
                    {price: docSnapshot.data().superbatch[0].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[0].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[0].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[0].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level==='Superbatch' && this.props.pack === 's43'){
                packageList.push(
                    {price: docSnapshot.data().superbatch[1].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[1].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[1].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[1].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Superbatch' && this.props.pack === 's62'){
                packageList.push(
                    {price: docSnapshot.data().superbatch[2].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[2].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[2].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[2].annually,
                        type: 'Annually'});
              }
              if(this.props.batch.level=='Superbatch' && this.props.pack === 's63'){
                packageList.push(
                    {price: docSnapshot.data().superbatch[3].monthly,
                    type: 'Monthly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[3].quaterly,
                        type: 'Quarterly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[3].semiAnnual,
                        type: 'Half Yearly'});
                packageList.push(
                    {price: docSnapshot.data().superbatch[3].annually,
                        type: 'Annually'});
              }
                break;
          }
        console.log("Done");
      }
      console.log(packageList);
      this.setState({packages: packageList});
      console.log(this.state.packages);
    });
        this._renderItem = this._renderItem.bind(this);
  }


  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={async () => {
            await this.props.setPayDuration(item.type);
            await this.props.setPayment(item.price);
            await this.props.onConfirm();
          }}>
<PricingCard
  color="#1C2657"
  title={item.type}
  price={item.price+'/-'}
  info={['1 User', 'Basic Support', 'All Core Features']}
  button={{ title: 'BOOK NOW' }}/>
</TouchableOpacity>
      </View>
    );
  }
  
  render() {
    return (
      <View>
        <Carousel
          ref={(c) => this.carousel = c}
          data={this.state.packages}
          renderItem={this._renderItem}
          sliderWidth={widthToDP('100%')}
          itemWidth={widthToDP('100%')}
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
    marginTop: 50,
  },
  itemContainer: {
    width: widthToDP('100%'),
    height: heightToDP('55%'),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    marginLeft: widthToDP('-5%'),
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
