import React, {PureComponent} from 'react';
import {View, Text, Linking} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {
  SearchComponent,
  BlogListComponentList,
  SliderCustom,
} from '../../components';
import {
  searchPosts,
  stopSearchPosts,
  selectedSearch,
  clearSearchPosts,
  RegisterUser,
  SliderImages,
} from '../../actions/action';
import DeviceInfo from 'react-native-device-info';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {Actions} from 'react-native-router-flux';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
let bundleId = DeviceInfo.getUniqueId();

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sliders: [],
      userphone: [],
    };
  }
  async componentDidMount() {
    // const phoneNumber = DeviceInfo.getPhoneNumber();
    DeviceInfo.getPhoneNumber().then(phoneNumber => {
      if (phoneNumber != 'unknown') {
        this.props.registerUser();
        this.setState({userphone: phoneNumber});
      } else {
        this.props.registerUser(bundleId);
        this.setState({userphone: bundleId});
      }
    });
  }

  static defaultProps = {
    listSearch: [],
  };

  _onSearch = searchText => {
    Linking.openURL(`https://www.google.com/search?query=${searchText}`);
  };

  _stopSearch = () => {
    this.props.stopSearchPosts();
  };
  _closeSearch = () => {
    const {clearSearchPosts, stopSearchPosts} = this.props;
    clearSearchPosts();
    stopSearchPosts();
  };

  render() {
    const {onViewMap} = this.state;
    const {sliderList, pending} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchComponent
            stopSearch={this._stopSearch}
            onSwitchView={onViewMap}
            onSearch={this._onSearch}
          />
        </View>
        <View style={styles.slider}>
          {pending ? (
            <PlaceholderContainer
              style={styles.placeholderContainer}
              animatedComponent={<Gradient />}
              duration={1000}
              delay={1000}>
              <Placeholder style={styles.placeholder} />
              <Placeholder
                style={[styles.placeholdertitle, {marginTop: 20, width: '80%'}]}
              />
            </PlaceholderContainer>
          ) : (
            <FlatListSlider
              data={sliderList}
              imageKey={'CoverImage'}
              height={200}
              timer={3000}
              onPress={item => Actions.singleproject({id: item.WorkID})}
              component={<SliderCustom />}
              contentContainerStyle={{paddingHorizontal: 1}}
              indicator={true}
              indicatorContainerStyle={{position: 'absolute', top: 170}}
              indicatorActiveColor={'#575fcf'}
              indicatorInActiveColor={'#90A4AE'}
              indicatorActiveWidth={20}
              animation={true}
              ListEmptyComponent={
                <View style={styles.notfound}>
                  <MaterialIcons
                    name="error-outline"
                    size={100}
                    color="#7f8c8d"
                  />
                  <Text style={styles.textnotfound}>Not Blog Content</Text>
                </View>
              }
            />
          )}
        </View>
        <View style={styles.card}>
          <BlogListComponentList />
        </View>
        <View style={styles.footer}></View>
      </View>
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
    sliderList: state.SliderReducer.sliderList,
    pending: state.SliderReducer.pending,
    searchPosts,
    stopSearchPosts,
    selectedSearch,
    clearSearchPosts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: userphone => dispatch(RegisterUser(userphone)),
    fetchSlider: dispatch(SliderImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
