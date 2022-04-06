import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {heightToDP, widthToDP} from '../../../services/utils';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-community/clipboard';
import {AppContext} from '../../../services/appContext';
import Toast from 'react-native-simple-toast';
import Header from '../../components/header';
import PlayerConnect from '../../../assets/icons/referral/playerConnect.svg';
import Copy from '../../../assets/icons/referral/copy.svg';
import Instagram from '../../../assets/icons/referral/instagram.svg';
import Mail from '../../../assets/icons/referral/mail.svg';
import WhatsApp from '../../../assets/icons/referral/whatsapp.svg';
import Commission from '../../../assets/icons/referral/commission.svg';

export default function ReferAndEarn() {
  const {user} = useContext(AppContext);
  const [shareCode, setShareCode] = useState(false);
  const [knowMore, setKnowMore] = useState(false);
  const [gotIt, setGotIt] = useState(false);
  const code = user.uid.slice(0, 8).toUpperCase();

  const shareCodeClicked = async (button) => {
    const text = `Hey, download Sporbit using my referral code https://playstore.com/referID-${code}`;
    switch (button) {
      case 'whatsapp':
        await Linking.openURL(`whatsapp://send?text=${text}`);
        break;
      case 'copy':
        Clipboard.setString(code);
        Toast.show('Copied to clipboard');
        break;
      case 'instagram':
        Toast.show('Coming Soon');
        break;
      case 'email':
        await Linking.openURL(
          `mailto:?subject=Sporbit Referral&body=${text}`,
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header text={'Refer'} />
      <View style={{height: heightToDP('8%')}} />
      <LinearGradient
        useAngle={true}
        angle={90.56}
        angleCenter={{x: 0.5, y: 0.5}}
        locations={[-0.2382, 1.1314]}
        colors={['rgba(255, 227, 227, 1)', 'rgba(255, 191, 191, 0)']}
        style={[
          styles.linearGradient,
          shareCode || gotIt || knowMore ? styles.lowOpacity : null,
        ]}>
        <View>
          <Text style={styles.paragraph}>
            Invite your friends and get ₹50 off
          </Text>
          <TouchableOpacity
            onPress={() => {
              setKnowMore(true);
            }}>
            <Text style={styles.knowMoreText}>Know More</Text>
          </TouchableOpacity>
        </View>
        <PlayerConnect />
      </LinearGradient>
      <View
        style={[
          styles.referredPara,
          shareCode || gotIt || knowMore ? styles.lowOpacity : null,
        ]}>
        <Text style={styles.rowTextKey}>Total referred friends</Text>
        <Text style={styles.rowTextValue}>0</Text>
      </View>
      <View
        style={[
          styles.discountPara,
          shareCode || gotIt || knowMore ? styles.lowOpacity : null,
        ]}>
        <Text style={styles.rowTextKey}>Total discount availed</Text>
        <Text style={styles.rowTextValue}>₹ 0</Text>
      </View>
      <View style={styles.border} />
      <View
        style={[
          styles.footer,
          shareCode || gotIt || knowMore ? styles.lowOpacity : null,
        ]}>
        <View style={styles.referralPara}>
          <Text style={styles.referText}>Your referral code</Text>
          <View style={styles.referCode}>
            <Text style={styles.rowTextKey}>{code}</Text>

            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(code);
                Toast.show('Copied to clipboard');
              }}>
              <Copy />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShareCode(true)}>
          <Text style={styles.shareCode}>Share Code</Text>
        </TouchableOpacity>
      </View>
      {!gotIt && shareCode ? (
        <View style={styles.secondaryFooter}>
          <View style={styles.footerTop}>
            <Text style={styles.footerPara1}>
              Here’s how to invite and avail discount
            </Text>
            <Commission />
          </View>
          <Text style={styles.footerMidPara}>
            Share the code below or ask them to enter it after they sign up.
            Your coupon will appear after their first buy.
          </Text>
          <Text style={styles.footerMidPara}>
            For your friend to receive their coupon, ensure that they use your
            referral before their first buy & within 10 days of signup.
          </Text>
          <TouchableOpacity onPress={() => setGotIt(true)}>
            <Text style={styles.gotItButton}>Got it</Text>
          </TouchableOpacity>
        </View>
      ) : gotIt ? (
        <View style={styles.ternaryFooter}>
          <Text style={styles.footerPara1}>Share With</Text>
          <View style={styles.shareIconsRow}>
            <View style={styles.iconsView}>
              <TouchableOpacity
                onPress={() => {
                  shareCodeClicked('copy').then();
                }}>
                <View style={styles.imgBorder}>
                  <Copy width={40} />
                </View>
              </TouchableOpacity>
              <Text style={styles.shareText}>Copy Code</Text>
            </View>
            <View style={styles.iconsView}>
              <TouchableOpacity
                onPress={() => {
                  shareCodeClicked('whatsapp').then();
                }}>
                <WhatsApp />
              </TouchableOpacity>
              <Text style={styles.shareText}>WhatsApp</Text>
            </View>
            <View style={styles.iconsView}>
              <TouchableOpacity
                onPress={() => {
                  shareCodeClicked('email').then();
                }}>
                <Mail />
              </TouchableOpacity>
              <Text style={styles.shareText}>Email</Text>
            </View>
            <View style={styles.iconsView}>
              <TouchableOpacity
                onPress={() => {
                  shareCodeClicked('instagram').then();
                }}>
                <Instagram />
              </TouchableOpacity>
              <Text style={styles.shareText}>Instagram</Text>
            </View>
          </View>
          {/*<View style={styles.moreRow}>*/}
          {/*  <TouchableOpacity>*/}
          {/*    <View style={styles.moreBorder}>*/}
          {/*      <Text style={styles.moreText}>...</Text>*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.more}>More</Text>*/}
          {/*</View>*/}
        </View>
      ) : null}
      {knowMore ? (
        <View style={styles.secondaryFooter}>
          <View style={styles.footerTop}>
            <Text style={styles.footerPara1}>
              Here’s how to invite and avail discount
            </Text>
            <Commission />
          </View>
          <Text style={styles.footerMidPara}>
            For every friend you refer*, you and your friend get Rs 100/- off on
            availing any services from Sporbit.
          </Text>
          <Text style={styles.footerMidParaBottom}>
            *Discount is unlocked when your referred friend completes their
            first purchase of any service from Sporbit (they can use the
            discount while availing the first service)
          </Text>
          <TouchableOpacity onPress={() => setKnowMore(false)}>
            <Text style={styles.gotItButton}>Got it</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  heading: {
    backgroundColor: 'rgba(56, 56, 56, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: heightToDP('2%'),
  },
  backButton: {
    paddingHorizontal: widthToDP('5%'),
    paddingVertical: heightToDP('4%'),
  },
  headingIcon: {
    position: 'absolute',
    left: 0,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: heightToDP('3%'),
    color: '#E0E0E0',
    fontFamily: 'Gilroy-Regular',
  },
  backIcon: {
    width: widthToDP('5%'),
    height: heightToDP('3%'),
  },
  linearGradient: {
    padding: widthToDP('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paragraph: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: widthToDP('5%'),
    width: widthToDP('45%'),
    fontFamily: 'Gilroy-Regular',
  },
  knowMoreText: {
    marginTop: heightToDP('3%'),
    color: 'rgba(255, 0, 0, 1)',
    fontWeight: 'bold',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
  },
  referredPara: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
    marginTop: heightToDP('4%'),
    marginBottom: heightToDP('2%'),
  },
  discountPara: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
    marginBottom: heightToDP('2%'),
  },
  border: {
    borderBottomWidth: 0.8,
    borderColor: 'rgba(159, 159, 159, 1)',
  },
  rowTextKey: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: widthToDP('4.2%'),
    fontFamily: 'Gilroy-Regular',
  },
  rowTextValue: {
    color: 'black',
    fontSize: widthToDP('4.5%'),
    fontFamily: 'Gilroy-Regular',
  },
  footer: {
    position: 'absolute',
    bottom: heightToDP('1%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  referralPara: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthToDP('90%'),
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: widthToDP('1.5%'),
  },
  referText: {
    color: '#5F5F5F',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
  },
  referCode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareCode: {
    backgroundColor: 'rgba(255, 89, 89, 1)',
    width: widthToDP('90%'),
    borderRadius: widthToDP('2.5%'),
    paddingVertical: heightToDP('1%'),
    marginVertical: heightToDP('2%'),
    textAlign: 'center',
    color: '#ffff',
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-Regular',
  },
  copyIcon: {
    marginLeft: widthToDP('2%'),
  },
  secondaryFooter: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: widthToDP('100%'),
    paddingHorizontal: widthToDP('4%'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightToDP('2%'),
  },
  footerPara1: {
    fontSize: widthToDP('5%'),
    fontWeight: 'bold',
    width: widthToDP('50%'),
    fontFamily: 'Gilroy-Regular',
  },
  footerMidPara: {
    marginBottom: heightToDP('2%'),
    color: 'black',
    fontSize: widthToDP('4.2%'),
  },
  footerMidParaBottom: {
    color: '#ff5959',
    fontStyle: 'italic',
    alignSelf: 'center',
    marginLeft: -widthToDP('5%'),
    marginBottom: heightToDP('2%'),
    width: widthToDP('80%%'),
    fontSize: widthToDP('3.5%'),
    textAlign: 'justify',
  },
  lowOpacity: {
    opacity: 0.4,
  },
  gotItButton: {
    backgroundColor: 'rgba(255, 89, 89, 1)',
    width: widthToDP('90%'),
    borderRadius: widthToDP('2.5%'),
    paddingVertical: heightToDP('1%'),
    marginVertical: heightToDP('2%'),
    textAlign: 'center',
    color: '#ffff',
    fontSize: widthToDP('5%'),
    elevation: 5,
  },
  ternaryFooter: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: widthToDP('100%'),
    paddingHorizontal: widthToDP('4%'),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: heightToDP('3%'),
  },
  shareIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: heightToDP('3%'),
  },
  iconsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBorder: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthToDP('50%'),
    height: widthToDP('10%'),
    width: widthToDP('10%'),
    borderColor: 'rgba(95, 95, 95, 1)',
  },
  shareText: {
    fontFamily: 'Gilroy-Regular',
    marginTop: heightToDP('0.6%'),
  },
  moreRow: {
    justifyContent: 'center',
    marginLeft: widthToDP('4%'),
  },
  moreBorder: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthToDP('50%'),
    height: widthToDP('10%'),
    width: widthToDP('10%'),
    borderColor: 'rgba(95, 95, 95, 1)',
  },
  moreText: {
    fontSize: widthToDP('5%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: heightToDP('1.3%'),
  },
  more: {
    marginLeft: widthToDP('1%'),
    fontFamily: 'Gilroy-Regular',
    marginTop: heightToDP('0.6%'),
  },
});
