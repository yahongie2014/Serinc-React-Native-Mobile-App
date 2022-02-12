import React, {Component} from 'react';
import styles from './styles';
import {connect} from 'react-redux';
import {
  View,
  Linking,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {getSingleBlog} from '../../actions/action';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {SliderCustomSingle} from '../../components';
import {Text, Avatar} from 'react-native-elements';
import Tags from 'react-native-tags';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeartReact from '../../components/HeartReact';
import AwesomeAlert from 'react-native-awesome-alerts';
import Lightbox from 'react-native-lightbox';
import {BASEURL} from '../../config/api/routes';
const regex = /(<([^>]+)>)/gi;
const avatarBot = `${BASEURL}logo2.png`;

class SingleBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      imageIndex: 0,
      isImageViewVisible: false,
      showAlert: false,
      isFetching: false,
      isLoading: false,
      singleImg: [],
      tags: [],
      selectedItem: '',
      setSelectedItem: '',
    };
  }
  async componentDidMount() {
    this.props.fetchBlogs(this.props.id);
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchBlogs(this.props.id);
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
  onShow = ({item}) => {
    //this.showAlert(item);
    return (
      <Lightbox style={[styles.imageContainer]}>
        <Image
          style={styles.ImagePreview}
          resizeMode="cover"
          source={{
            uri: 'https://c.tenor.com/tbAlzAsBICsAAAAC/funny-laughing.gif',
          }}
        />
      </Lightbox>
    );
  };
  render() {
    const {SingleBlog, pending} = this.props;
    const Gallery = SingleBlog[0].Gallery;
    const SAMET = this.props.SingleBlog[0].Tags.replace('\\', '')
      .replace('[', '')
      .replace(']', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '')
      .replace('"', '');

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => Actions.home({type: 'reset'})}>
          <View
            style={{alignContent: 'flex-end', marginLeft: 20, marginTop: 10}}>
            <Icon name="arrow-left" size={20} style={{color: '#34495e'}} />
          </View>
        </TouchableOpacity>
        <AwesomeAlert
          show={this.state.showAlert}
          message={'Single Image 😜😜'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={false}
          showCancelButton={false}
          confirmText={'OK !'}
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          {...this.props}
        />
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.onRefresh()}
            />
          }>
          <Lightbox style={[styles.imageContainer]}>
            <Image
              style={styles.ImagePreview}
              resizeMode="cover"
              source={{
                uri: SingleBlog[0].CoverImage,
              }}
            />
          </Lightbox>

          <View style={[styles.headeingcontainer]}>
            <Text h3 style={styles.headeing}>
              {SingleBlog[0].Title}
            </Text>
          </View>
          <View style={[styles.author]}>
            <Text style={styles.headeing2}>Written By Serinc</Text>
            <Image
              style={styles.authorImg}
              resizeMode="cover"
              source={{
                uri: avatarBot,
              }}
            />
          </View>
          <View style={styles.txtarea}>
            <Text h5 style={styles.txtareacntain}>
              {SingleBlog[0].Body.replace(regex, '')}
            </Text>
          </View>
          <View style={styles.tags}>
            <Text style={styles.tagrx}>
              <Icon
                name="tags"
                size={20}
                color="#3498db"
                style={{marginRight: -20, marginTop: -20}}
              />
            </Text>
            <Tags
              initialTags={[SAMET]}
              maxNumberOfTags={5}
              containerStyle={{justifyContent: 'flex-start'}}
              onChangeTags={tags => console.log(tags)}
              createTagOnString={[',', '.', ' ']}
              onTagPress={(index, tagLabel) =>
                Linking.openURL(
                  `https://www.google.com/search?query=${tagLabel}`,
                )
              }
              readonly={true}
            />
          </View>
          <View style={styles.cat}>
            <Icon
              name="certificate"
              size={20}
              color="#3498db"
              style={{marginLeft: 35}}
            />
            <Text style={styles.cattxt}>
              {SingleBlog[0].Category[0].CategoryName}
            </Text>
          </View>
          <HeartReact />
          <View style={styles.slider}>
            <View style={styles.social}>
              <Text style={{marginRight: 20}}>{SingleBlog[0].Visits}</Text>
              <Icon
                name="feed"
                style={{marginRight: 20}}
                size={20}
                color="#575fcf"
              />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `http://www.facebook.com/share.php?u=https://serinc.tech/blog/${SingleBlog[0].Identifier}`,
                  )
                }>
                <Icon
                  name="share-square"
                  size={26}
                  color="#3498db"
                  style={{marginLeft: 30, marginTop: 4}}
                />
              </TouchableOpacity>
            </View>
            {pending ? (
              <PlaceholderContainer
                style={styles.placeholderContainer}
                animatedComponent={<Gradient />}
                duration={1000}
                delay={1000}>
                <Placeholder style={styles.placeholder} />
                <Placeholder
                  style={[
                    styles.placeholdertitle,
                    {marginTop: 20, width: '80%'},
                  ]}
                />
              </PlaceholderContainer>
            ) : (
              <FlatListSlider
                data={Gallery}
                imageKey={'url'}
                height={200}
                timer={3000}
                onPress={item => this.onShow(JSON.stringify(item))}
                component={<SliderCustomSingle />}
                contentContainerStyle={{paddingHorizontal: 1}}
                indicator={false}
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
                    <Text style={styles.textnotfound}>Not Found</Text>
                  </View>
                }
              />
            )}
          </View>
          {/* <View style={styles.footer}>
            <SafeAreaView style={{flex: 1}}>
              <ReactNativeDisqus
                id={SingleBlog[0].Identifier}
                shortname="serinc-online"
              />
            </SafeAreaView>
          </View> */}
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
    SingleBlog: state.blogReducer.blogs,
    token: state.auth.accessToken,
    pending: state.blogReducer.pending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBlogs: id => dispatch(getSingleBlog(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);
