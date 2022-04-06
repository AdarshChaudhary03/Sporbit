import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../../../components/header';
import {heightToDP, widthToDP} from '../../../../services/utils';

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Header text={'Privacy Policy'} />
      <View style={styles.body}>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            What does this privacy policy cover?
          </Text>
          <Text style={styles.itemRowTextSub}>
            This privacy policy covers our treatment of personally identifiable
            information ('personal information') that we gather when you are
            accessing or using our Mobile App and Products. This policy does not
            apply to the practices of companies that we do not own or control,
            or to individuals that we do not employ or manage.{'\n'}
            We do not knowingly collect or solicit personal information from
            anyone under the age of 18 or knowingly allow such persons to
            register for the Products. If you are under 18, please do not
            attempt to register for the Products or send any information about
            yourself to us, including your name, address, telephone number,
            email address or provide your biometric information. No one under
            age 18 may provide any personal information to us or on the
            Products. In the event that we learn that we have collected personal
            information from a child under age 18 without verification of
            parental consent, we will delete that information as quickly as
            possible. If you believe that we might have any information from or
            about a child under 18, please contact us at{' '}
            <Text style={styles.themeColor}>info@sporbit.in</Text>
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            What information does Sporbit obtain and how is it used?User
            Provided Information Information you provide to us
          </Text>
          <Text style={styles.itemRowTextSub}>
            Sporbit obtains the information you provide when you download and
            register Sporbit. Registration with us is optional. However, please
            keep in mind that you may not be able to use some of the features
            offered by Sporbit unless you register with us. When you register
            with us and use Sporbit, you generally provide (a) your name, email
            address, age, user name, password and other registration
            information; (b) transaction-related information, such as when you
            make purchases, respond to any offers, or download or use Sporbits
            from us; (c) information you provide us when you contact us for
            help; (d) credit card information for purchase and use of Sporbit,
            and; (e) information you enter into our system when using Sporbit,
            such as contact information and project management information. We
            may also use the information you provided us to contact your from
            time to time to provide you with important information, required
            notices and marketing promotions.{'\n'}
          </Text>
          <Text style={styles.itemRowTextMain}>
            Automatically Collected Information
          </Text>
          <Text style={styles.itemRowTextSub}>
            In addition, Sporbit may collect certain information automatically,
            including, but not limited to, the type of mobile device you use,
            your mobile devices unique device ID, the IP address of your mobile
            device, your mobile operating system, the type of mobile Internet
            browsers you use, and information about the way you use Sporbit.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            Does Sporbit collect precise real time location information of the
            device?
          </Text>
          <Text style={styles.itemRowTextSub}>
            This Sporbit does not collect precise information about the
            location of your mobile device.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            Do third parties see and/or have access to information obtained by
            Sporbit?
          </Text>
          <Text style={styles.itemRowTextSub}>
            Only aggregated, anonymized data is periodically transmitted to
            external services to help us improve Sporbit and our service. We
            will share your information with third parties only in the ways that
            are described in this privacy statement. We may disclose User
            Provided and Automatically Collected Information: as required by
            law, such as to comply with a subpoena, or similar legal process;
            when we believe in good faith that disclosure is necessary to
            protect our rights, protect your safety or the safety of others,
            investigate fraud, or respond to a government request; with our
            trusted services providers who work on our behalf, do not have an
            independent use of the information we disclose to them, and have
            agreed to adhere to the rules set forth in this privacy statement.
            If Sporbit Pvt. Ltd is involved in a merger, acquisition, or sale
            of all or a portion of its assets, you will be notified via email
            and/or a prominent notice on our Web site of any change in ownership
            or uses of this information, as well as any choices you may have
            regarding this information.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            What are my opt-out rights?
          </Text>
          <Text style={styles.itemRowTextSub}>
            You can stop all collection of information by Sporbit easily by
            uninstalling Sporbit. You may use the standard uninstall processes
            as may be available as part of your mobile device or via the mobile
            Sporbit marketplace or network. You can also request to opt-out via
            email, <Text style={styles.themeColor}>info@sporbit.in</Text>
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            Data Retention Policy, Managing Your Information
          </Text>
          <Text style={styles.itemRowTextSub}>
            We will retain User Provided data for as long as you use Sporbit
            and for a reasonable time thereafter. We will retain Automatically
            Collected information for up to 24 months and thereafter may store
            it in aggregate. If you’d like us to delete User Provided Data that
            you have provided via Sporbit, please contact us at
            <Text style={styles.themeColor}> info@sporbit.in</Text> and we
            will respond in a reasonable time. Please note that some or all of
            the User Provided Data may be required in order for Sporbit to
            function properly.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Children</Text>
          <Text style={styles.itemRowTextSub}>
            We do not use Sporbit to knowingly solicit data from or market to
            children under the age of 13. If a parent or guardian becomes aware
            that his or her child has provided us with information without their
            consent, he or she should contact us at info@sporbit.in. We
            will delete such information from our files within a reasonable
            time.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Security</Text>
          <Text style={styles.itemRowTextSub}>
            We are concerned about safeguarding the confidentiality of your
            information. We provide physical, electronic, and procedural
            safeguards to protect information we process and maintain. For
            example, we limit access to this information to authorized employees
            and contractors who need to know that information in order to
            operate, develop or improve our Sporbit. Please be aware that,
            although we endeavor provide reasonable security for information we
            process and maintain, no security system can prevent all potential
            security breaches.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Changes</Text>
          <Text style={styles.itemRowTextSub}>
            This Privacy Policy may be updated from time to time for any reason.
            We will notify you of any changes to our Privacy Policy by posting
            the new Privacy Policy here and informing you via email or text
            message. You are advised to consult this Privacy Policy regularly
            for any changes, as continued use is deemed approval of all changes.
            You can check the history of this policy by clicking here.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Your Consent</Text>
          <Text style={styles.itemRowTextSub}>
            By using Sporbit, you are consenting to our processing of your
            information as set forth in this Privacy Policy now and as amended
            by us. "Processing,” means using cookies on a computer/hand held
            device or using or touching information in any way, including, but
            not limited to, collecting, storing, deleting, using, combining and
            disclosing information, all of which activities will take place in
            the United States. If you reside outside the United States your
            information will be transferred, processed and stored there under
            United States privacy standards.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Contact us</Text>
          <Text style={styles.itemRowTextSub}>
            If you have any questions regarding privacy while using Sporbit, or
            have questions about our practices, please contact us via email at{' '}
            <Text style={styles.themeColor}> info@sporbit.in</Text>
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
  flexRow: {
    flexDirection: 'row',
  },
});
