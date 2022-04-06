// import React from 'react';
// import {useState} from 'react';
// import {
//   Text,
//   TextInput,
//   ScrollView,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {heightToDP, widthToDP} from '../../../../func/utils';
//
export default function VideoCourse() {
  return null;
}
//   const {subscriptionType, subscription} = props
//   const [course, setCourse]=useState('C1')
//   const [buttonPressed, setButtonPressed] = useState(false)
//
//   if (buttonPressed) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.heading}>
//           <View style={styles.headingIcon}>
//             <TouchableOpacity onPress={() => setButtonPressed(false)} style={styles.backButton}>
//               <Image
//                 style={styles.backIcon}
//                 source={require('../../../../assets/images/backIcon.png')}
//               /></TouchableOpacity>
//           </View>
//           <Text style={styles.headingText}>
//             {subscriptionType}
//           </Text>
//         </View>
//         <View style={styles.rowBox}>
//           <Text style={styles.rowTextHeader}>Course</Text>
//           <Text style={styles.rowText}>{course}</Text>
//         </View>
//         <View style={styles.footer}>
//           <View style={styles.footerHeader}>
//             <View>
//               <Text style={styles.invoiceText}>Get Invoice</Text>
//               <Text style={styles.mailText}>dhruv@gmail.com</Text>
//             </View>
//             <Text style={styles.changeText}>Change</Text>
//           </View>
//           <View style={styles.footerFooter}>
//             <View style={styles.subsBox}>
//               <Text style={styles.subsText}>
//                 ₹ {subscription.amount}
//               </Text>
//             </View>
//             <TouchableOpacity style={styles.proceedPay}>
//               <Text style={styles.proceedText}>
//                 PROCEED TO PAY
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     )
//   } else return (
//     <ScrollView style={styles.container}>
//       <View style={styles.heading}>
//         <View style={styles.headingIcon}>
//           <View style={styles.backButton}>
//             <Image
//               style={styles.backIcon}
//               source={require('../../../../assets/images/backIcon.png')}
//             /></View>
//         </View>
//         <Text style={styles.headingText}>
//           {subscriptionType}
//         </Text>
//       </View>
//       <View style={styles.referralPara}>
//         <Text style={styles.referText}>Select Academy</Text>
//         <TextInput style={styles.referText1}
//                    defaultValue={course} onChangeText={(text)=>setCourse(text)}/>
//         <View style={styles.referCode}>
//           <Text style={styles.rowTextKey}>Change</Text>
//         </View>
//       </View>
//       <TouchableOpacity onPress={() => setButtonPressed(true)}>
//       <Text style={styles.saveChangesButton}>Save Changes</Text></TouchableOpacity>
//     </ScrollView>
//   )
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(242, 242, 242, 1)',
//   },
//   heading: {
//     marginTop: heightToDP('4%'),
//     backgroundColor: 'rgba(56, 56, 56, 1)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     padding: heightToDP('2%')
//   },
//   backButton: {
//     paddingHorizontal: widthToDP('5%'),
//     paddingVertical: heightToDP('4%')
//   },
//   headingIcon: {
//     position: 'absolute',
//     left: 0
//   },
//   headingText: {
//     fontWeight: 'bold',
//     fontSize: heightToDP('3%'),
//     color: '#E0E0E0',
//   },
//   backIcon: {
//     width: widthToDP('5%'),
//     height: heightToDP('3%'),
//   },
//   referralPara: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: widthToDP('6%'),
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     color: 'black',
//     backgroundColor: 'white',
//     alignItems: 'center',
//     padding: widthToDP('1.5%'),
//     marginTop: heightToDP('5%'),
//     height: heightToDP('8%')
//   },
//   referText: {
//     color: 'rgba(95, 95, 95, 1)',
//     fontSize: widthToDP('3.5%'),
//     fontFamily: 'Gilroy-SemiBold',
//     position: 'absolute',
//     top: 0,
//     left: widthToDP('2%')
//   },
//   referText1: {
//     color: '#5F5F5F',
//     fontSize: widthToDP('4%'),
//     fontFamily: 'Gilroy-SemiBold',
//   },
//   referCode: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   rowTextKey: {
//     top: heightToDP('1%'),
//     fontWeight: 'bold',
//     color: 'rgba(255, 89, 89, 1)',
//     fontSize: widthToDP('3.2%'),
//     fontFamily: 'Gilroy-Regular'
//   },
//   saveChangesButton: {
//     backgroundColor: 'rgba(255, 89, 89, 1)',
//     color: 'white',
//     paddingVertical: widthToDP('4%'),
//     marginTop: heightToDP('10%'),
//     alignSelf: 'center',
//     borderRadius: widthToDP('10%'),
//     fontSize: widthToDP('5%'),
//     fontFamily: 'Gilroy-SemiBold',
//     paddingHorizontal: widthToDP('13%')
//   },
//   rowBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 0.5,
//     marginTop: heightToDP('3%'),
//     borderBottomColor: 'rgba(159, 159, 159, 1)',
//     marginHorizontal: widthToDP('6%'),
//     paddingBottom: heightToDP('1%')
//   },
//   rowTextHeader: {
//     fontFamily: 'Gilroy-SemiBold',
//     fontSize: widthToDP('4%'),
//     color: 'black'
//   },
//   rowText: {
//     fontFamily: 'Gilroy-Regular',
//     fontSize: widthToDP('4.5%'),
//     color: 'black'
//   },
//   footerHeader:{
//     flexDirection:'row',
//     justifyContent:'space-between',
//     marginLeft:widthToDP('7%'),
//     marginRight:widthToDP('5%')
//   },
//   invoiceText:{
//     fontFamily:'Gilroy-SemiBold'
//   },
//   mailText:{
//     fontFamily:'Gilroy-Regular',
//     fontSize:widthToDP('5%')
//   },
//   changeText:{
//     color:'rgba(255, 89, 89, 1)',
//     fontSize:widthToDP('4%'),
//     fontFamily:'Gilroy-SemiBold'
//   },
//   footerFooter:{
//     flexDirection:'row',
//     flex:1,
//     marginVertical:heightToDP('2%')
//   },
//   subsBox:{
//     backgroundColor:'rgba(242, 242, 242, 1)',
//     flex:1,
//     paddingVertical:heightToDP('2%'),
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   subsText:{
//     color:'black',
//     fontFamily:'Gilroy-SemiBold',
//     fontSize:widthToDP('4.5%')
//   },
//   proceedPay:{
//     backgroundColor:'rgba(20, 154, 25, 0.61)',
//     flex:1,
//     paddingVertical:heightToDP('2%'),
//     justifyContent:'center',
//     alignItems:'center'
//   },
//   footer:{
//     position: 'absolute',
//     alignSelf: 'center',
//     bottom: 0,
//     width: widthToDP('100%'),
//     backgroundColor: 'rgba(255, 255, 255, 1)',
//     paddingVertical: heightToDP('3%')
//   },
//   proceedText:{
//     color:'white',
//     fontFamily:'Gilroy-SemiBold',
//     fontSize:widthToDP('4.5%')
//   },
// })
