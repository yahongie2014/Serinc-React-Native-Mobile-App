import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  View,
  SafeAreaView,
  RefreshControl,
  Image,
} from 'react-native';
import {getBlogs} from '../../actions/action';
import {Avatar, Text, ThemeProvider, Rating} from 'react-native-elements';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import HeartReact from '../HeartReact';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const regex = /(<([^>]+)>)/gi;
const avatarBot = 'https://serinc.online/logo2.png';

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visible: false,
      isFetching: false,
      liked: false,
    };
  }
  async componentDidMount() {
    this.props.fetchBlogs();
    this.waitPlace;
  }
  componentWillMount() {}

  keyExtractor = (item, index) => index.toString();

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchBlogs();
    });
  }
  handleSingle(id) {
    setTimeout(() => {
      Actions.singleBlog({id: id});
    }, 2500);
  }
  ratingCompleted(rating, id) {
    console.log('Rating is: ' + rating + 'IDentifier is: ' + id);
  }
  List = ({item}) => (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.notifyContainer}>
        <View style={[styles.notifylist]}>
          <View style={styles.flatcover}>
            <Avatar
              style={styles.imageCover}
              resizeMode={'cover'}
              source={{uri: item.CoverImage}}
            />
            <HeartReact />
          </View>
          <View style={styles.headtitle}>
            <Text h3 style={styles.headtitlecolor}>
              {item.Title}
            </Text>
          </View>
          <View style={styles.txtarea}>
            <Text>{item.Body.replace(regex, '').split('', 100)}...</Text>
          </View>
          <View style={styles.viewer}>
            <Text tyle={styles.txtview}>{item.Visits}</Text>
            <Text tyle={styles.txtview}> </Text>
            <Icon name="feed" size={20} color="#575fcf" />
          </View>

          <ThemeProvider>
            <AwesomeButton
              progress
              textColor={'#3498db'}
              width={200}
              activeOpacity={0}
              raiseLevel={0}
              borderRadius={8}
              height={30}
              backgroundProgress={'#ef5777'}
              backgroundShadow={'#ffff'}
              backgroundActive={'#ffff'}
              backgroundColor={'#f5f6fa'}
              style={{
                alignSelf: 'center',
                marginTop: 80,
                position: 'relative',
              }}
              onPress={() => this.handleSingle(item.Identifier)}>
              <Icon name="newspaper-o" size={20} color="#3498db" />
            </AwesomeButton>
          </ThemeProvider>
        </View>
      </View>
    </SafeAreaView>
  );
  waitPlace = ({item}) => (
    <View style={styles.placeholderlisting}>
      <PlaceholderContainer
        style={styles.placeholderContainer}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}>
        <Placeholder style={styles.placeholder} />
        <View style={styles.placeholderList}>
          <Placeholder style={[styles.placeholdertitle, {width: '100%'}]} />
          <Placeholder style={[styles.placeholdertitle, {width: '100%'}]} />
          <Placeholder style={[styles.placeholdertitle, {width: '100%'}]} />
        </View>
        <View style={styles.placeholderblog}>
          <Placeholder
            style={[styles.placeholder, {marginTop: 20, width: '80%'}]}
          />
        </View>
      </PlaceholderContainer>
    </View>
  );

  render() {
    const {blogList, pending} = this.props;

    return (
      <View style={styles.list}>
        {pending ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={blogList}
              renderItem={this.waitPlace}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.onRefresh()}
                />
              }
            />
          </View>
        ) : (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={blogList}
              renderItem={this.List}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={1}
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
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.onRefresh()}
                />
              }
            />
          </View>
        )}
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
    blogList: state.blogReducer.blogs,
    pending: state.blogReducer.pending,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBlogs: () => dispatch(getBlogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
