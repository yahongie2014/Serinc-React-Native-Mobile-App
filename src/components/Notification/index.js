import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Linking,
  View,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {getNotifications, updateSeen} from '../../actions/action';
import {ListItem, Text} from 'react-native-elements';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STORAGE} from '../../config/api/routes';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
const regex = /(<([^>]+)>)/gi;
const icon = `${STORAGE}storage/icons/bell.png`;

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showAlert: false,
    };
  }
  async componentDidMount() {
    this.props.fetchNotify(this.props.token);
  }
  componentWillMount() {
    if (this.props.submit == true) {
    }
  }

  keyExtractor = (item, index) => index.toString();

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchNotify(this.props.token);
      this.whitholder;
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
    });
  };

  List = ({item}) => (
    <View style={styles.notifyContainer}>
      <View style={[styles.notifylist]}>
        <ListItem
          leftAvatar={{
            source: {
              uri: icon,
            },
          }}
        />
        <Image
          source={require('@assets/images/bell.png')}
          style={{height: 50, width: 50, alignSelf: 'flex-start'}}
        />
        <View
          style={{
            position: 'absolute',
            width: '70%',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.headline}>{item.Title}</Text>
          <Text
            h6
            style={{
              position: 'absolute',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 70,
              marginRight: 30,
            }}>
            {item.Body.replace(regex, '').split('', 100)}...
          </Text>
        </View>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 100,
            marginLeft: 300,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => Linking.openURL(item.action_link)}>
            <Icon name="send" size={20} color="#575fcf" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.updateSeen(
                item.Identifier,
                this.props.token,
                this.showAlert(),
              )
            }>
            {item.Seen ? (
              <View style={[{marginBottom: 50}]}>
                <Icon name="eye" size={20} color="#ff7675" />
                <AwesomeAlert
                  show={this.state.showAlert}
                  title={'Success'}
                  message={'Now you mark as Seen'}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showConfirmButton={true}
                  showCancelButton={false}
                  confirmText={'OK !'}
                  confirmButtonColor="#DD6B55"
                  onConfirmPressed={() => {
                    this.hideAlert();
                  }}
                  {...this.props}
                />
              </View>
            ) : (
              <Icon name="eye" size={20} color="#575fcf" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  whitholder = ({item}) => (
    <View>
      <Text style={{display: 'none'}}>{item.Identifier}</Text>
      <PlaceholderContainer
        style={styles.placeholderContainer}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Placeholder style={[styles.placeholder, {width: 50, height: 50}]} />
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Placeholder
              style={[
                styles.placeholder,
                {
                  width: '35%',
                  height: 7,
                },
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <Placeholder
          style={[styles.placeholder, {marginTop: 20, width: '80%'}]}
        />
        <Placeholder style={[styles.placeholder, {width: '90%'}]} />
        <Placeholder style={[styles.placeholder, {width: '50%'}]} />
      </PlaceholderContainer>
    </View>
  );

  render() {
    const {NotifList, pending} = this.props;
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
          <Text style={styles.text}>Notifications</Text>

          <View style={styles.list}>
            <SafeAreaView>
              {pending ? (
                <>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={NotifList}
                    renderItem={this.whitholder}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                  />
                </>
              ) : (
                <>
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={NotifList}
                    renderItem={this.List}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.onRefresh()}
                      />
                    }
                    ListEmptyComponent={
                      <View style={styles.notfound}>
                        <MaterialIcons
                          name="error-outline"
                          size={100}
                          color="#7f8c8d"
                        />
                        <Text style={styles.textnotfound}>Not Found</Text>
                      </View>
                    }
                  />
                </>
              )}
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const Gradient = () => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{x: 1.0, y: 0.0}}
      end={{x: 0.0, y: 0.0}}
      style={{
        flex: 1,
        width: 120,
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    NotifList: state.Notification.notifications,
    token: state.auth.accessToken,
    pending: state.Notification.pending,
    submit: state.Notification.submit,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNotify: userToken => dispatch(getNotifications(userToken)),
    updateSeen: (id, userToken) => dispatch(updateSeen(id, userToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
