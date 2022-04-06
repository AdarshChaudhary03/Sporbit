import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '../../../components/header';
import {heightToDP, widthToDP} from '../../../../services/utils';

export default function HelpAndSupportDetails() {
  return (
    <ScrollView style={styles.container}>
      <Header text={'Terms And Conditions'} />
      <View style={styles.body}>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>Overview</Text>
          <Text style={styles.itemRowTextSub}>
            This app is operated by Sporbit Private Limited. Throughout the
            app, the terms “we”, “us” and “our” refer to Sporbit Private
            Limited. Sporbit Private Limited offers this app, including all
            information, tools and services available from this app to you, the
            user, conditioned upon your acceptance of all terms, conditions,
            policies and notices stated here. By visiting our app and/ or
            purchasing something from us, you engage in our “Service” and agree
            to be bound by the following terms and conditions (“Terms of
            Service”, “Terms”), including those additional terms and conditions
            and policies referenced herein and/or available by hyperlink. These
            Terms of Service apply to all users of the app, including without
            limitation users who are browsers, vendors, customers, merchants,
            and/ or contributors of content. Please read these Terms of Service
            carefully before accessing or using our app. By accessing or using
            any part of the app, you agree to be bound by these Terms of
            Service. If you do not agree to all the terms and conditions of this
            agreement, then you may not access the app or use any services. If
            these Terms of Service are considered an offer, acceptance is
            expressly limited to these Terms of Service. Any new features or
            tools which are added to the current store shall also be subject to
            the Terms of Service. You can review the most current version of the
            Terms of Service at any time on this page. We reserve the right to
            update, change or replace any part of these Terms of Service by
            posting updates and/or changes to our app. It is your responsibility
            to check this page periodically for changes. Your continued use of
            or access to the app following the posting of any changes
            constitutes acceptance of those changes.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 1 - ONLINE STORE TERMS
          </Text>
          <Text style={styles.itemRowTextSub}>
            By agreeing to these Terms of Service, you represent that you are at
            least the age of majority in your state or province of residence, or
            that you are the age of majority in your state or province of
            residence and you have given us your consent to allow any of your
            minor dependents to use this app. You may not in the use of the
            Service, violate any laws in your jurisdiction (including but not
            limited to copyright laws). You must not transmit any worms or
            viruses or any code of a destructive nature. A breach or violation
            of any of the Terms will result in an immediate termination of your
            Services.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 2 - GENERAL CONDITIONS
          </Text>
          <Text style={styles.itemRowTextSub}>
            We reserve the right to refuse service to anyone for any reason at
            any time. You understand that your content (not including credit
            card information), may be transferred unencrypted and involve (a)
            transmissions over various networks; and (b) changes to conform and
            adapt to technical requirements of connecting networks or devices.
            Credit card information is always encrypted during transfer over
            networks. You agree not to reproduce, duplicate, copy, sell, resell
            or exploit any portion of the Service, use of the Service, or access
            to the Service or any contact on the app through which the service
            is provided, without express written permission by us. The headings
            used in this agreement are included for convenience only and will
            not limit or otherwise affect these Terms.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
          </Text>
          <Text style={styles.itemRowTextSub}>
            We are not responsible if information made available on this app is
            not accurate, complete or current. The material on this app is
            provided for general information only and should not be relied upon
            or used as the sole basis for making decisions without consulting
            primary, more accurate, more complete or more timely sources of
            information. Any reliance on the material on this app is at your own
            risk. This app may contain certain historical information.
            Historical information, necessarily, is not current and is provided
            for your reference only. We reserve the right to modify the contents
            of this app at any time, but we have no obligation to update any
            information on our app. You agree that it is your responsibility to
            monitor changes to our app.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
          </Text>
          <Text style={styles.itemRowTextSub}>
            Prices for our services are subject to change without notice. We
            reserve the right at any time to modify or discontinue the Service
            (or any part or content thereof) without notice at any time. We
            shall not be liable to you or to any third-party for any
            modification, price change, suspension or discontinuance of the
            Service.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 5 - PRODUCTS OR SERVICES
          </Text>
          <Text style={styles.itemRowTextSub}>
            Certain products or services may be available exclusively online
            through the app. We have made every effort to display as accurately
            as possible the colors and images of our products that appear at the
            store. We cannot guarantee that your computer monitor's display of
            any color will be accurate. We reserve the right, but are not
            obligated, to limit the sales of our products or Services to any
            person, geographic region or jurisdiction. We may exercise this
            right on a case-by-case basis. We reserve the right to limit the
            quantities of any products or services that we offer. All
            descriptions of products or product pricing are subject to change at
            anytime without notice, at the sole discretion of us. We reserve the
            right to discontinue any product at any time. Any offer for any
            product or service made on this app is void where prohibited. We do
            not warrant that the quality of any products, services, information,
            or other material purchased or obtained by you will meet your
            expectations, or that any errors in the Service will be corrected.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
          </Text>
          <Text style={styles.itemRowTextSub}>
            We reserve the right to refuse any order you place with us. We may,
            in our sole discretion, limit or cancel quantities purchased per
            person, per household or per order. These restrictions may include
            orders placed by or under the same customer account, the same credit
            card, and/or orders that use the same billing and/or shipping
            address. In the event that we make a change to or cancel an order,
            we may attempt to notify you by contacting the e-mail and/or billing
            address/phone number provided at the time the order was made. We
            reserve the right to limit or prohibit orders that, in our sole
            judgment, appear to be placed by dealers, resellers or distributors.
            You agree to provide current, complete and accurate purchase and
            account information for all purchases made at our store. You agree
            to promptly update your account and other information, including
            your email address and credit card numbers and expiration dates, so
            that we can complete your transactions and contact you as needed.
            For more detail, please review our Refund Policy.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>SECTION 7 - OPTIONAL TOOLS</Text>
          <Text style={styles.itemRowTextSub}>
            We may provide you with access to third-party tools over which we
            neither monitor nor have any control nor input. You acknowledge and
            agree that we provide access to such tools ”as is” and “as
            available” without any warranties, representations or conditions of
            any kind and without any endorsement. We shall have no liability
            whatsoever arising from or relating to your use of optional
            third-party tools. Any use by you of optional tools offered through
            the app is entirely at your own risk and discretion and you should
            ensure that you are familiar with and approve of the terms on which
            tools are provided by the relevant third-party provider(s). We may
            also, in the future, offer new services and/or features through the
            app (including, the release of new tools and resources). Such new
            features and/or services shall also be subject to these Terms of
            Service.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 8 - THIRD-PARTY LINKS
          </Text>
          <Text style={styles.itemRowTextSub}>
            Certain content, products and services available via our Service may
            include materials from third-parties. Third-party links on this app
            may direct you to third-party apps that are not affiliated with us.
            We are not responsible for examining or evaluating the content or
            accuracy and we do not warrant and will not have any liability or
            responsibility for any third-party materials or apps, or for any
            other materials, products, or services of third-parties. We are not
            liable for any harm or damages related to the purchase or use of
            goods, services, resources, content, or any other transactions made
            in connection with any third-party apps. Please review carefully the
            third-party's policies and practices and make sure you understand
            them before you engage in any transaction. Complaints, claims,
            concerns, or questions regarding third-party products should be
            directed to the third-party.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
          </Text>
          <Text style={styles.itemRowTextSub}>
            If, at our request, you send certain specific submissions (for
            example contest entries) or without a request from us you send
            creative ideas, suggestions, proposals, plans, or other materials,
            whether online, by email, by postal mail, or otherwise
            (collectively, 'comments'), you agree that we may, at any time,
            without restriction, edit, copy, publish, distribute, translate and
            otherwise use in any medium any comments that you forward to us. We
            are and shall be under no obligation (1) to maintain any comments in
            confidence; (2) to pay compensation for any comments; or (3) to
            respond to any comments. We may, but have no obligation to, monitor,
            edit or remove content that we determine in our sole discretion are
            unlawful, offensive, threatening, libelous, defamatory,
            pornographic, obscene or otherwise objectionable or violates any
            party’s intellectual property or these Terms of Service. You agree
            that your comments will not violate any right of any third-party,
            including copyright, trademark, privacy, personality or other
            personal or proprietary right. You further agree that your comments
            will not contain libelous or otherwise unlawful, abusive or obscene
            material, or contain any computer virus or other malware that could
            in any way affect the operation of the Service or any related app.
            You may not use a false e-mail address, pretend to be someone other
            than yourself, or otherwise mislead us or third-parties as to the
            origin of any comments. You are solely responsible for any comments
            you make and their accuracy. We take no responsibility and assume no
            liability for any comments posted by you or any third-party.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 10 - PERSONAL INFORMATION
          </Text>
          <Text style={styles.itemRowTextSub}>
            Your submission of personal information through the store is
            governed by our Privacy Policy.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS
          </Text>
          <Text style={styles.itemRowTextSub}>
            Occasionally there may be information on our app or in the Service
            that contains typographical errors, inaccuracies or omissions that
            may relate to product descriptions, pricing, promotions, offers,
            product shipping charges, transit times and availability. We reserve
            the right to correct any errors, inaccuracies or omissions, and to
            change or update information or cancel orders if any information in
            the Service or on any related app is inaccurate at any time without
            prior notice (including after you have submitted your order). We
            undertake no obligation to update, amend or clarify information in
            the Service or on any related app, including without limitation,
            pricing information, except as required by law. No specified update
            or refresh date applied in the Service or on any related app, should
            be taken to indicate that all information in the Service or on any
            related app has been modified or updated.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 12 - PROHIBITED USES
          </Text>
          <Text style={styles.itemRowTextSub}>
            In addition to other prohibitions as set forth in the Terms of
            Service, you are prohibited from using the app or its content: (a)
            for any unlawful purpose; (b) to solicit others to perform or
            participate in any unlawful acts; (c) to violate any international,
            federal, provincial or state regulations, rules, laws, or local
            ordinances; (d) to infringe upon or violate our intellectual
            property rights or the intellectual property rights of others; (e)
            to harass, abuse, insult, harm, defame, slander, disparage,
            intimidate, or discriminate based on gender, sexual orientation,
            religion, ethnicity, race, age, national origin, or disability; (f)
            to submit false or misleading information; (g) to upload or transmit
            viruses or any other type of malicious code that will or may be used
            in any way that will affect the functionality or operation of the
            Service or of any related app, other apps, or the Internet; (h) to
            collect or track the personal information of others; (i) to spam,
            phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene
            or immoral purpose; or (k) to interfere with or circumvent the
            security features of the Service or any related app, other apps, or
            the Internet. We reserve the right to terminate your use of the
            Service or any related app for violating any of the prohibited uses.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
          </Text>
          <Text style={styles.itemRowTextSub}>
            We do not guarantee, represent or warrant that your use of our
            service will be uninterrupted, timely, secure or error-free. We do
            not warrant that the results that may be obtained from the use of
            the service will be accurate or reliable. You agree that from time
            to time we may remove the service for indefinite periods of time or
            cancel the service at any time, without notice to you. You expressly
            agree that your use of, or inability to use, the service is at your
            sole risk. The service and all products and services delivered to
            you through the service are (except as expressly stated by us)
            provided 'as is' and 'as available' for your use, without any
            representation, warranties or conditions of any kind, either express
            or implied, including all implied warranties or conditions of
            merchantability, merchantable quality, fitness for a particular
            purpose, durability, title, and non-infringement. In no case shall
            Sporbit Private Limited, our directors, officers, employees,
            affiliates, agents, contractors, interns, suppliers, service
            providers or licensors be liable for any injury, loss, claim, or any
            direct, indirect, incidental, punitive, special, or consequential
            damages of any kind, including, without limitation lost profits,
            lost revenue, lost savings, loss of data, replacement costs, or any
            similar damages, whether based in contract, tort (including
            negligence), strict liability or otherwise, arising from your use of
            any of the service or any products procured using the service, or
            for any other claim related in any way to your use of the service or
            any product, including, but not limited to, any errors or omissions
            in any content, or any loss or damage of any kind incurred as a
            result of the use of the service or any content (or product) posted,
            transmitted, or otherwise made available via the service, even if
            advised of their possibility. Because some states or jurisdictions
            do not allow the exclusion or the limitation of liability for
            consequential or incidental damages, in such states or
            jurisdictions, our liability shall be limited to the maximum extent
            permitted by law.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 14 - INDEMNIFICATION
          </Text>
          <Text style={styles.itemRowTextSub}>
            You agree to indemnify, defend and hold harmless Sporbit Private
            Limited and our parent, subsidiaries, affiliates, partners,
            officers, directors, agents, contractors, licensors, service
            providers, subcontractors, suppliers, interns and employees,
            harmless from any claim or demand, including reasonable attorneys’
            fees, made by any third-party due to or arising out of your breach
            of these Terms of Service or the documents they incorporate by
            reference, or your violation of any law or the rights of a
            third-party.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>SECTION 15 - SEVERABILITY</Text>
          <Text style={styles.itemRowTextSub}>
            In the event that any provision of these Terms of Service is
            determined to be unlawful, void or unenforceable, such provision
            shall nonetheless be enforceable to the fullest extent permitted by
            applicable law, and the unenforceable portion shall be deemed to be
            severed from these Terms of Service, such determination shall not
            affect the validity and enforceability of any other remaining
            provisions.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>SECTION 16 - TERMINATION</Text>
          <Text style={styles.itemRowTextSub}>
            The obligations and liabilities of the parties incurred prior to the
            termination date shall survive the termination of this agreement for
            all purposes. These Terms of Service are effective unless and until
            terminated by either you or us. You may terminate these Terms of
            Service at any time by notifying us that you no longer wish to use
            our Services, or when you cease using our app. If in our sole
            judgment you fail, or we suspect that you have failed, to comply
            with any term or provision of these Terms of Service, we also may
            terminate this agreement at any time without notice and you will
            remain liable for all amounts due up to and including the date of
            termination; and/or accordingly may deny you access to our Services
            (or any part thereof).
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 17 - ENTIRE AGREEMENT
          </Text>
          <Text style={styles.itemRowTextSub}>
            The failure of us to exercise or enforce any right or provision of
            these Terms of Service shall not constitute a waiver of such right
            or provision. These Terms of Service and any policies or operating
            rules posted by us on this app or in respect to The Service
            constitutes the entire agreement and understanding between you and
            us and govern your use of the Service, superseding any prior or
            contemporaneous agreements, communications and proposals, whether
            oral or written, between you and us (including, but not limited to,
            any prior versions of the Terms of Service). Any ambiguities in the
            interpretation of these Terms of Service shall not be construed
            against the drafting party.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>SECTION 18 - GOVERNING LAW</Text>
          <Text style={styles.itemRowTextSub}>
            These Terms of Service and any separate agreements whereby we
            provide you Services shall be governed by and construed in
            accordance with the laws of India and jurisdiction of Jaipur,
            Rajasthan
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 19 - CHANGES TO TERMS OF SERVICE
          </Text>
          <Text style={styles.itemRowTextSub}>
            You can review the most current version of the Terms of Service at
            any time at this page. We reserve the right, at our sole discretion,
            to update, change or replace any part of these Terms of Service by
            posting updates and changes to our app. It is your responsibility to
            check our app periodically for changes. Your continued use of or
            access to our app or the Service following the posting of any
            changes to these Terms of Service constitutes acceptance of those
            changes.
          </Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemRowTextMain}>
            SECTION 20 - CONTACT INFORMATION
          </Text>
          <Text style={styles.itemRowTextSub}>
            Questions about the Terms of Service should be sent to us at{' '}
            <Text style={styles.themeColor}>info@sporbit.in</Text>
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
    color: '#ff5959',
  },
});
