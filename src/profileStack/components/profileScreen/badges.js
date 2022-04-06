import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Silver from '../../../../assets/icons/profile/badges/silver.svg';
import Reliability from '../../../../assets/icons/profile/badges/reliability.svg';
import Bronze from '../../../../assets/icons/profile/badges/bronze.svg';
import Shuttle from '../../../../assets/icons/profile/badges/shuttle.svg';
import Team from '../../../../assets/icons/profile/badges/team.svg';
import Ninja from '../../../../assets/icons/profile/badges/ninja.svg';
import Gold from '../../../../assets/icons/profile/badges/gold.svg';
import Firewall from '../../../../assets/icons/profile/badges/firewall.svg';

const Badges = (props) => {
  const {type} = props;

  function badges() {
    switch (type) {
      case 'punctuality':
        return (
          <View style={styles.badgeContainer}>
            <Silver />
            <View style={styles.badgeIcon}>
              <Reliability />
            </View>
          </View>
        );
      case 'headStart':
        return (
          <View style={styles.badgeContainer}>
            <Bronze />
            <View style={styles.badgeIcon}>
              <Shuttle />
            </View>
          </View>
        );
      case 'teamPlayer':
        return (
          <View style={styles.badgeContainer}>
            <Silver />
            <View style={styles.badgeIcon}>
              <Team />
            </View>
          </View>
        );
      case 'ninja':
        return (
          <View style={styles.badgeContainer}>
            <Bronze />
            <View style={styles.badgeIcon}>
              <Ninja />
            </View>
          </View>
        );
      case 'consistency':
        return (
          <View style={styles.badgeContainer}>
            <Gold />
            <View style={styles.badgeIcon}>
              <Firewall />
            </View>
          </View>
        );
    }
  }
  return <View>{badges(type)}</View>;
};

export default Badges;
const styles = StyleSheet.create({
  badgeContainer: {justifyContent: 'center', alignItems: 'center'},
  badgeIcon: {position: 'absolute'},
  inactive: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 2,
    borderRadius: 15,
  },
});
