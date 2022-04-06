import React from 'react';
import Academy from '../components/subscriptionDetails/academy';
import VideoCourse from '../components/subscriptionDetails/videoCourse';
import HealthCourse from '../components/subscriptionDetails/healthCourse';
import DietCourse from '../components/subscriptionDetails/dietCourse';
import Physio from '../components/subscriptionDetails/physio';
export default function SubscriptionDetails(props) {
  const {subscription} = props.route.params;

  switch (subscription.type) {
    case 'academy':
      return <Academy subscription={subscription} />;
    case 'video':
      return <VideoCourse subscription={subscription} />;
    case 'health':
      return <HealthCourse subscription={subscription} />;
    case 'diet':
      return <DietCourse subscription={subscription} />;
    case 'physio':
      return <Physio subscription={subscription} />;
  }
}
