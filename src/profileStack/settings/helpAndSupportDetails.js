import React from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import Academy from '../components/subscriptionDetails/academy';
import Faq from '../components/helpAndSupport/faq';
import CustomerSupport from '../components/helpAndSupport/customerSupport';
import PrivacyPolicy from '../components/helpAndSupport/privacyPolicy';
import RefundPolicy from '../components/helpAndSupport/refundPolicy';
import TermsAndConditions from '../components/helpAndSupport/termsAndConditions';

export default function HelpAndSupportDetails(props) {
  const {detail} = props.route.params;
  switch (detail) {
    case 'faq':
      return <Faq />;
    case 'customer':
      return <CustomerSupport />;
    case 'privacy':
      return <PrivacyPolicy />;
    case 'refund':
      return <RefundPolicy />;
    case 'terms':
      return <TermsAndConditions />;
  }
}
