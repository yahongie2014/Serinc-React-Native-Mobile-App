import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {NotificationsComponent} from '../../components';

class Notifications extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <NotificationsComponent />
      </View>
    );
  }
}
export default connect(null)(Notifications);
