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
import {getCategories} from '../../actions/action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, Badge} from 'react-native-elements';

class OurServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.fetchservice();
    this.waitPlace;
  }
  keyExtractor = (item, index) => index.toString();

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.props.fetchservice();
    });
  }

  List = ({item}) => (
    <TouchableOpacity
      style={styles.serviceImage}
      onPress={() => Actions.singleservice({id: item.Identifier})}>
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
        imageStyle={{borderRadius: 8}}
        source={{uri: item.CategoryImg}}>
        <View style={styles.containerbadge}>
          <Badge
            status="error"
            value={item.CategoryCountProject}
            containerStyle={styles.badgecount}
          />
          <Text style={styles.textService}>{item.CategoryName}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
    const {listService, pending} = this.props;
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
          <Text style={styles.text}>Services</Text>
          {pending ? (
            <View>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={listService}
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
                data={listService}
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
    listService: state.CategoriesReducer.categories,
    pending: state.CategoriesReducer.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchservice: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OurServices);
