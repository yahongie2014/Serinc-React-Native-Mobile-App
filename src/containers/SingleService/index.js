import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {getSingleCategory} from '../../actions/action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class SingleService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isLoading: false,
      pleaseDisplayMe: 'Services',
      Projects: [],
    };
  }
  async componentDidMount() {
    this.props.fetchProducts(this.props.id);
    this.setState({Projects: this.props.listService});
  }
  keyExtractor = (item, index) => index.toString();

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchProducts(this.props.id);
    });
  }

  List = ({item}) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.serviceImage}
        onPress={() => Actions.singleproject({id: item.Identifier})}>
        <ImageBackground
          style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
          imageStyle={{borderRadius: 8}}
          source={{uri: item.CoverImage}}>
          <View style={styles.containerbadge}>
            <Text style={styles.textService}>{item.ProjectName}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
  waitPlace = ({item}) => (
    <View style={styles.container}>
      <PlaceholderContainer
        style={styles.grid}
        animatedComponent={<Gradient />}
        duration={1000}
        delay={1000}>
        <Placeholder style={styles.placeholder} />
      </PlaceholderContainer>
    </View>
  );

  render() {
    const {pending, listService} = this.props;
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
          <TouchableOpacity onPress={() => Actions.reset('services')}>
            <View
              style={{
                alignContent: 'flex-start',
                position: 'relative',
                marginLeft: 15,
                marginTop: 5,
                padding: 10,
              }}>
              <Icon name="arrow-left" size={20} style={{color: '#34495e'}} />
            </View>
          </TouchableOpacity>

          <Animated.Text style={styles.text}>
            {listService.CategoryName}
          </Animated.Text>
          <View style={styles.placeholderlisting}>
            {pending ? (
              <View>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={listService.Projects}
                  renderItem={this.waitPlace}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isLoading}
                      onRefresh={() => this.onRefresh()}
                    />
                  }
                />
              </View>
            ) : (
              <>
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={listService.Projects}
                  renderItem={this.List}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
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

const mapStateToProps = (state) => {
  return {
    listService: state.SingleService.singlecategory,
    pending: state.SingleService.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (id) => dispatch(getSingleCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleService);
