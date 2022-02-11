import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from './src/actions/Router';
import {StyleSheet, SafeAreaView, View, StatusBar} from 'react-native';
import {RegisterUser} from './src/actions/action';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import 'react-native-gesture-handler';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userphone: '',
    };
  }
  async componentDidMount() {
    requestMultiple(
      [PERMISSIONS.ANDROID.READ_PHONE_STATE],
      [PERMISSIONS.ANDROID.READ_PHONE_NUMBERS],
    ).then(statuses => {
      console.log(
        'PhoneStatus',
        statuses[PERMISSIONS.ANDROID.READ_PHONE_STATE],
      );
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.notch}>
        <StatusBar
          backgroundColor="#2c3e50"
          barStyle="light-content"
          width="100%"
        />
        <View style={styles.container}>
          <Router />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    width: '100%',
    position: 'relative',
  },
  notch: {
    flex: 1,
  },
});
const mapStateToProps = state => {
  return {
    registirationRequested: state.auth.userphone,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: userphone => dispatch(RegisterUser(userphone)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
