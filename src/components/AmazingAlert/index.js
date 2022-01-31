import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class AmazingAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertName: '',
      title: '',
      message: '',
      cancelText: '',
      confirmText: '',
      actionLink: '',
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
    Actions.push(this.state.actionLink);
  };

  render() {
    const {
      showAlert,
      title,
      message,
      cancelText,
      confirmText,
      alertName,
    } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.showAlert();
          }}>
          <View style={styles.button}>
            <Text style={styles.text}>Read More</Text>
          </View>
        </TouchableOpacity>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={title}
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          showCancelButton={true}
          confirmText={confirmText}
          cancelText={cancelText}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    width: '80%',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
});
