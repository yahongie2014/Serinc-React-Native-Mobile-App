import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Picker,
} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import AwesomeButton from 'react-native-really-awesome-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sendContact, getCategories} from '../../actions/action';
import ValidationComponent from 'react-native-form-validator';
import AwesomeAlert from 'react-native-awesome-alerts';

class Contact extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      progress: true,
      showAlert: false,
      process: false,
      name: '',
      phone: '',
      email: '',
      selectedValue: '',
      info: '',
      title: '',
      mssg: '',
      btn: '',
    };
  }
  async componentDidMount() {
    this.props.fetchservice;
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchservice();
    });
  }
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      progress: false,
      isLoading: false,
    });
  };
  process = (title, mssg, btn) => {
    this.setState({
      process: true,
      title: title,
      mssg: mssg,
      btn: btn,
    });
  };
  hidemssg = () => {
    this.setState({
      process: false,
      progress: false,
      isLoading: false,
    });
  };

  onSubmit() {
    this.setState({isLoading: true});
    this.setState({progress: true});
    const validator = this.validate({
      name: {minlength: 3, maxlength: 100, required: true},
      email: {email: true},
      phone: {numbers: true, required: true},
      selectedValue: {numbers: true, required: true},
      info: {minlength: 10, maxlength: 500},
    });
    if (!validator) {
      this.showAlert();
    } else {
      this.setState({isLoading: true});
      this.setState({progress: true});
      this.props.sendContact(
        this.state.name,
        this.state.email,
        this.state.phone,
        this.state.info,
        this.state.selectedValue,
        this.props.token,
      );
      if (!this.props.pending) {
        this.process('Waiting', 'Please Be Patinet', 'Dismiss');
      } else {
        this.process('Thanks !', 'Thank You For Contact US 😍', 'Ok !');
        this.setState({
          name: '',
          phone: '',
          email: '',
          selectedValue: '',
          info: '',
        });

        this.setState({isLoading: false});
        this.setState({progress: false});
      }
    }
  }
  render() {
    const {listService, pending} = this.props;
    const {selectedValue} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <AwesomeAlert
            show={this.state.showAlert}
            title={'Ooops ! 😒'}
            message={this.getErrorMessages()}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showConfirmButton={true}
            showCancelButton={false}
            confirmText={'OK !'}
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              this.hideAlert();
            }}
            {...this.props}
          />
          <AwesomeAlert
            show={this.state.process}
            title={this.state.title}
            message={this.state.mssg}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showConfirmButton={true}
            showCancelButton={false}
            confirmText={this.state.btn}
            confirmButtonColor="#DD6B55"
            onConfirmPressed={() => {
              this.hidemssg();
            }}
            {...this.props}
          />
          <Animated.Text style={styles.text}>Contact Us</Animated.Text>
          {/* <Form style={styles.form}> */}
          <KeyboardAvoidingView>
            <View style={styles.logoContainer}>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={require('../../Assets/img/logo2.png')}
              />
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholder="Full Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChangeText={name => this.setState({name})}
              value={this.state.name}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType={'number-pad'}
              placeholder="Phone Number"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChangeText={phone => this.setState({phone})}
              value={this.state.phone}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType={'email-address'}
              placeholder="Email Address"
              placeholderTextColor="rgba(225,225,225,0.7)"
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <Picker
              mode="dialog"
              style={styles.drobDown}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({selectedValue: itemValue})
              }
              selectedValue={selectedValue}>
              {listService.map((data, i) => {
                return !pending ? (
                  <Picker.Item
                    key={i}
                    label={data.CategoryName}
                    value={data.Identifier}
                  />
                ) : (
                  <Picker.Item label={'Fetching...'} value={0} />
                );
              })}
            </Picker>

            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="rgba(225,225,225,0.7)"
                numberOfLines={10}
                multiline={true}
                onChangeText={info => this.setState({info})}
                value={this.state.info}
              />
            </View>
            <AwesomeButton
              progress={this.state.progress}
              springRelease={this.state.progress}
              activeOpacity={1}
              raiseLevel={4}
              textColor={'#3498db'}
              width={150}
              activeOpacity={0}
              raiseLevel={0}
              borderRadius={8}
              height={40}
              backgroundProgress={'#bdc3c7'}
              backgroundShadow={'#ffff'}
              backgroundActive={'#ffff'}
              backgroundColor={'#34495e'}
              style={{alignSelf: 'center', marginTop: 20, marginRight: 30}}
              onPress={next => next(this.onSubmit())}>
              <Icon name="send-o" size={20} color="#ffff" />
              <Text
                style={{
                  color: '#ffff',
                  marginLeft: 20,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                Send
              </Text>
            </AwesomeButton>
          </KeyboardAvoidingView>
          {/* </Form> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    listService: state.CategoriesReducer.categories,
    success: state.contactService.data,
    pending: state.contactService.pending,
    error: state.contactService.success,
    token: state.auth.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendContact: (name, email, phone, info, selectedValue) =>
      dispatch(sendContact(name, email, phone, info, selectedValue)),
    fetchservice: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
