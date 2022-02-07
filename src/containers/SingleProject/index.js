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
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getSingleProject} from '../../actions/action';
import {SingleSliderProject} from '../../components';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {Text, SocialIcon} from 'react-native-elements';
import Tags from 'react-native-tags';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Actions} from 'react-native-router-flux';
import AwesomeButton from 'react-native-really-awesome-button';
import HeartReact from '../../components/HeartReact';
import Lightbox from 'react-native-lightbox';
import {BASEURL} from '../../config/api/routes';
class SingleProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isLoading: false,
      progress: false,
    };
  }
  async componentDidMount() {
    this.props.fetchSingle(this.props.id);
    this.onRefresh();
  }
  keyExtractor = (item, index) => index.toString();

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchSingle(this.props.id);
    });
  }
  handleSingle(link) {
    setTimeout(() => {
      Linking.openURL(link);
    }, 3000);
    this.setState({progress: true});
  }
  render() {
    const {listpro, pending} = this.props;
    const Gallery = listpro.Gallery;
    const contentWidth = Dimensions.width / 3;
    const regex = /(<([^>]+)>)/gi;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => Actions.home({type: 'reset'})}>
          <View
            style={{alignContent: 'flex-start', marginLeft: 20, marginTop: 10}}>
            <Icon name="arrow-left" size={20} style={{color: '#34495e'}} />
          </View>
        </TouchableOpacity>

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
                uri: listpro.CoverImage,
              }}
            />
          </Lightbox>

          <View style={[styles.headeingcontainer]}>
            <Text h4 style={styles.headeing}>
              {listpro.ProjectName}
            </Text>
          </View>
          <View style={styles.txtarea}>
            <Text>{listpro.ProjectDescription.replace(regex, '')}</Text>
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
              initialTags={[
                'Serinc',
                'Web & Mobile Development',
                'Digital Marketing',
                'Design',
              ]}
              maxNumberOfTags={5}
              containerStyle={{justifyContent: 'flex-start'}}
              onChangeTags={tags => console.log(tags)}
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
              color="#575fcf"
              style={{marginLeft: 35, marginTop: 5}}
            />
            <Text style={styles.cattxt}>{listpro.Category}</Text>
          </View>
          <View style={styles.slider}>
            <View style={styles.social}>
              <Text style={{marginRight: 20}}>{listpro.Visits}</Text>
              <Icon
                name="feed"
                style={{marginRight: 20}}
                size={20}
                color="#575fcf"
              />
              <HeartReact />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `http://www.facebook.com/share.php?u=${listpro.LinkWeb}`,
                  )
                }>
                <Icon
                  name="share-square"
                  size={25}
                  color="#3498db"
                  style={{marginLeft: 20}}
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
                onPress={item =>
                  console.log(JSON.stringify(`${BASEURL + item.url}`))
                }
                component={<SingleSliderProject />}
                contentContainerStyle={{paddingHorizontal: 1}}
                indicator={false}
                indicatorContainerStyle={{position: 'absolute', top: 170}}
                indicatorActiveColor={'#575fcf'}
                indicatorInActiveColor={'#90A4AE'}
                indicatorActiveWidth={20}
                animation={true}
              />
            )}
          </View>
          <View style={styles.links}>
            <AwesomeButton
              progress
              textColor={'#3498db'}
              width={80}
              activeOpacity={0}
              raiseLevel={0}
              height={30}
              borderRadius={8}
              backgroundProgress={'#575fcf'}
              backgroundShadow={'#ffff'}
              backgroundActive={'#ffff'}
              backgroundColor={'#273c75'}
              style={{alignSelf: 'center'}}
              onPress={() => this.handleSingle(listpro.LinkWeb)}>
              <Icon name="globe" size={20} color="#f5f6fa" />
            </AwesomeButton>
            <AwesomeButton
              progress
              textColor={'#3498db'}
              width={80}
              activeOpacity={0}
              borderRadius={8}
              height={30}
              backgroundProgress={'#575fcf'}
              backgroundShadow={'#ffff'}
              backgroundActive={'#ffff'}
              backgroundColor={'#192a56'}
              style={{alignSelf: 'center', marginLeft: 20}}
              type="google-play"
              raiseLevel={0}
              onPress={() => this.handleSingle(listpro.LinkAndroid)}>
              <Entypo name="google-play" size={20} color="#dfe6e9" />
            </AwesomeButton>
            <AwesomeButton
              progress={this.state.progress}
              textColor={'#3498db'}
              width={80}
              activeOpacity={0}
              height={30}
              raiseLevel={0}
              borderRadius={8}
              backgroundProgress={'#575fcf'}
              backgroundShadow={'#ffff'}
              backgroundActive={'#ffff'}
              backgroundColor={'#2d3436'}
              style={{alignSelf: 'center', marginLeft: 20}}
              onPress={() => this.handleSingle(listpro.LinkIOS)}>
              <Icon name="apple" size={20} color="#dfe6e9" />
            </AwesomeButton>
          </View>

          <View style={styles.footer}></View>
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
    listpro: state.SingleProject.single,
    pending: state.SingleProject.pending,
    token: state.auth.accessToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSingle: id => dispatch(getSingleProject(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
