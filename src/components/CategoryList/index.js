import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, Linking, View, TouchableOpacity} from 'react-native';
import {getCategories} from '../../actions/action';
import {ListItem} from 'react-native-elements';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.props.fetchCategory();
  }

  List = ({item}) => (
    <ListItem
      title={item.Title}
      titleStyle={{marginRight: 200, fontWeight: 'bold'}}
      subtitle={item.Body}
      leftAvatar={{
        source: {uri: 'https://source.unsplash.com/1024x768/?icon'},
      }}
      bottomDivider={true}
      onPress={() => Linking.openURL(item.action_link)}
    />
  );

  render() {
    const {CatList, pending} = this.props;
    return (
      <View>
        {pending ? (
          <PlaceholderContainer
            style={styles.placeholderContainer}
            animatedComponent={<Gradient />}
            duration={1000}
            delay={1000}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Placeholder
                style={[styles.placeholder, {width: 50, height: 50}]}
              />
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
        ) : (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={CatList}
              renderItem={this.List}
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

const mapStateToProps = (state) => {
  return {
    CatList: state.CategoriesReducer.categories,
    pending: state.CategoriesReducer.pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategory: () => dispatch(getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
