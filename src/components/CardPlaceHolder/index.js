import React, {Component} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {getSlider} from '../../reducers/sliderReducer';
import {SliderImages} from '../../actions/action';
import axios from 'axios';
class CardPlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingComponent: [],
      Slides: [],
      list: [],
    };
  }
  componentWillMount() {
    axios.get('https://serinc.online/api/Sliders').then((response) => {
      this.setState({list: response.data.data});
    });
    const loadingComponent = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.list}
            renderItem={this.Slides}
          />,
        );
      }, 6000);
    });
  }

  keyExtractor = (item, index) => index.toString();

  Slides = ({item}) => (
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

          <ListItem
            title={item.Name}
            titleStyle={{marginLeft: 200, fontWeight: 'bold'}}
            subtitle={'Status: ' + item.Identifier}
            leftAvatar={{source: {uri: item.CoverImage}}}
            bottomDivider={true}
            onPress={() =>
              alert(
                item.Name,
                `species: ${item.Identifier}, \n status: ${item.Identifier} \n location ${item.Name}`,
              )
            }
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Placeholder
        style={[styles.placeholder, {marginTop: 20, width: '80%'}]}
      />
      <Placeholder style={[styles.placeholder, {width: '90%'}]} />
      <Placeholder style={[styles.placeholder, {width: '50%'}]} />
    </PlaceholderContainer>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.list}
          renderItem={this.Slides}
        />
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
    Slides: getSlider(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSlider: dispatch(SliderImages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardPlaceHolder);
