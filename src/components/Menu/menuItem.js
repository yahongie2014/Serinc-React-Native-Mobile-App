import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {transformOrigin, rotateY} from './utils/martixUtils';
import {View, StyleSheet, Animated} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

export default class MenuItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  static defaultProps = {
    onPress: () => {},
  };

  constructor(props) {
    super(props);
    this.rotY = new Animated.Value(this.props.isOpened ? 0 : 90);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  animate(_toValue, _delay, _duration, _easing) {
    Animated.timing(this.rotY, {
      toValue: _toValue,
      delay: _delay,
      duration: _duration,
      easing: _easing,
    }).start();
  }

  onPress() {
    this.props.onItemPress();

    this.props.onPress(this);
  }

  componentDidMount() {
    this.menuItem.setNativeProps({
      style: {
        transform: [
          {perspective: 800},
          {rotateY: this.props.isOpened ? '0deg' : '90deg'},
        ],
      },
    });

    this.rotY.addListener(({value}) => {
      const y = this.rotY.__getValue();
      let xOffest =
        parseInt(-this.containerWidth / 2) -
        parseInt(0.1 * this.containerWidth);
      const origin = {x: xOffest, y: 0, z: 0};
      let matrix = rotateY(y);
      transformOrigin(matrix, origin);

      this.menuItem.setNativeProps({
        style: {transform: [{perspective: 800}, {matrix: matrix}]},
      });
    });
  }

  onLayout(e) {
    this.containerWidth = e.nativeEvent.layout.width;
  }

  render() {
    return (
      <View
        style={[
          this.props.showItemsSeparator &&
            !this.props.roundAll &&
            !this.props.isLast && {
              borderBottomColor: this.props.inactiveItemColorDark,
              borderBottomWidth: 1,
            },
          this.props.isActive && {
            borderBottomColor: this.props.activeItemColorDark,
          },
        ]}
        ref={component => (this.menuItem = component)}
        onLayout={this.onLayout}>
        <TouchableNativeFeedback onPress={() => this.onPress()}>
          <View
            style={[
              styles.box,
              {
                backgroundColor: this.props.isActive
                  ? this.props.activeItemColor
                  : this.props.inactiveItemColor,
              },
              this.props.showItemsSeparator && {
                borderColor: this.props.inactiveItemColorLight,
                borderWidth: 1,
              },
              this.props.isActive && {
                borderColor: this.props.activeItemColorLight,
              },
              this.props.borderRadius &&
                this.props.isFirst && {
                  borderTopRightRadius: this.props.borderRadius,
                },
              this.props.borderRadius &&
                this.props.isLast && {
                  borderBottomRightRadius: this.props.borderRadius,
                },
              this.props.roundAll && {
                borderTopRightRadius: this.props.borderRadius,
                borderBottomRightRadius: this.props.borderRadius,
              },
            ]}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
