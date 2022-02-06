import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');
class Intro extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0.5);
    this.animatedValue2 = new Animated.Value(0);
    this.state = {appIsReady: false};
  }
  async componentWillMount() {}
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    const UPDATE_SKIP = await AsyncStorage.getItem('first_time');
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 4,
      delay: 2500,
    }).start();
    Animated.timing(this.animatedValue2, {
      toValue: 1,
      delay: 200,
      duration: 3000,
    }).start(() => {
      UPDATE_SKIP
        ? Actions.home({type: 'reset'})
        : Actions.intro({type: 'reset'});
    });
  }

  render() {
    const truckStyle = {
      transform: [{scale: this.animatedValue}],
    };

    const scaleText = {
      transform: [{scale: this.animatedValue2}],
    };

    return (
      <LinearGradient
        colors={[
          '#0277BD',
          '#0277BD',
          '#0277BD',
          '#4C64FF',
          '#6536FF',
          '#8000FF',
        ]}
        style={styles.container}>
        <Animated.View style={[styles.ring, truckStyle]}>
          <Animated.Image
            source={require('../Assets/img/logo.png')}
            style={[
              {
                resizeMode: 'contain',
                width: 200,
                height: 200,
              },
            ]}
          />
        </Animated.View>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 20,
              width: width / 2,
              height: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
            },
            scaleText,
          ]}
        />
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0277BD',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  ring: {
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 7,
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
  waveBall: {
    width: 100,
    marginBottom: 100,
    position: 'absolute',
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
export default connect(null)(Intro);
