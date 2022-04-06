import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../../../components/header';
import {heightToDP, widthToDP} from '../../../../services/utils';

export default function RefundPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Header text={'Refund Policy'} />
      <View style={styles.body}>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Returns</Text>
          <Text style={styles.itemRowTextSub}>
            Our policy lasts 30 days. If 30 days have gone by since your
            purchase of a service or product from Sporbit, unfortunately we
            can’t offer you a refund or exchange. To be eligible for a refund,
            either you must not have used any part of the service you purchased
            or there must be a discrepancy between the promised and received
            service. The final say in discrepancy resolution will be of Sporbit
            and it reserves the right to deny and refunds that it feels are not
            warranted Several types of goods are exempt from being returned.
            Perishable goods such as food, balls, newspapers or magazines cannot
            be returned. To complete your return, we require a receipt or proof
            of purchase. This will be available in the Payments section in your
            Sporbit profile.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Refunds (if applicable)</Text>
          <Text style={styles.itemRowTextSub}>
            Once your return request is received and inspected, we will send you
            an email to notify you that we have received your return request. We
            will also notify you of the approval or rejection of your refund. If
            you are approved, then your refund will be processed, and a credit
            will automatically be applied to your credit card or original method
            of payment, within 14 working days.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            Late or missing refunds (if applicable)
          </Text>
          <Text style={styles.itemRowTextSub}>
            If you haven’t received a refund yet, first check your bank account
            again. Then contact your credit card company, it may take some time
            before your refund is officially posted. Next contact your bank,
            there is often some processing time before a refund is posted. If
            you’ve done all of this and you still have not received your refund
            yet, please contact us at
            <Text style={styles.themeColor}> info@sporbit.in</Text>
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            Cancellation (if applicable)
          </Text>
          <Text style={styles.itemRowTextSub}>
            We only cancel items/services if they are defective/damaged or do
            not meet the displayed standards. If you need to cancel a service,
            send us an email at{' '}
            <Text style={styles.themeColor}> info@sporbit.in</Text> with
            the details of why you want to cancel the service.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  body: {
    paddingTop: heightToDP('8%'),
  },
  itemRow: {
    paddingVertical: heightToDP('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDP('5%'),
  },
  itemRowTextMain: {
    fontSize: widthToDP('5%'),
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: heightToDP('1%'),
  },
  itemRowTextSub: {
    textAlign: 'justify',
    fontSize: widthToDP('4%'),
    fontFamily: 'Gilroy-Regular',
    color: '#777777',
  },
  themeColor: {
    color: '#FF5959',
  },
});
