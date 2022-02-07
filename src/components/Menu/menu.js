import React from 'react';
import {View, StyleSheet, Easing} from 'react-native';
import {shadeColor} from './utils/colorUtils';
import PropTypes from 'prop-types';
export default class Menu extends React.Component {
  static propTypes = {
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    borderRadius: PropTypes.number,
    showActiveItem: PropTypes.bool,
    showItemsSeparator: PropTypes.bool,
    inactiveItemColor: PropTypes.string,
    activeItemColor: PropTypes.string,
    itemsDistribution: PropTypes.oneOf([
      'top',
      'center',
      'bottom',
      'space-between',
      'space-around',
    ]),
    itemAnimDuration: PropTypes.number,
    itemAnimDelay: PropTypes.number,
    itemAnimEasing: PropTypes.func,
  };

  static defaultProps = {
    onShow: () => {},
    onHide: () => {},
    borderRadius: null,
    showActiveItem: true,
    showItemsSeparator: true,
    inactiveItemColor: '#33334C',
    activeItemColor: '#D64A73',
    itemsDistribution: 'top',
    itemAnimDuration: 150,
    itemAnimDelay: 50,
    itemAnimEasing: Easing.inOut(Easing.ease),
  };

  constructor(props) {
    super(props);

    this.state = {
      activeItemIndex: null,
      isOpened: true,
    };
  }

  componentDidMount() {
    this.setState({
      isOpened: this.props.isOpened,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpened != this.state.isOpened) {
      this.setState({
        isOpened: this.props.isOpened,
      });

      this.props.isOpened ? this.show() : this.hide();
    }
  }

  startAnimation(_toValue) {
    let _self = this;

    this.children.forEach(function (child, index) {
      this.refs[child.ref].animate(
        _toValue,
        index * this.props.itemAnimDelay,
        this.props.itemAnimDuration,
        this.props.itemAnimEasing,
      );
    }, this);
  }

  show() {
    this.startAnimation(0);
    this.props.onShow();
  }

  hide() {
    this.startAnimation(90);
    this.props.onHide();
  }

  onItemPress(pressedChildRef) {
    this.children.forEach(function (child, index) {
      if (child.ref === pressedChildRef) {
        this.setState({
          activeItemIndex: index,
        });
      }
    }, this);
  }

  computeStyle() {
    let style = {};
    switch (this.props.itemsDistribution) {
      case 'top':
        style = {
          top: 0,
        };
        break;
      case 'center':
        style = {
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        };
        break;
      case 'bottom':
        style = {
          bottom: 0,
        };
        break;
      case 'space-between':
        style = {
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        };
        break;
      case 'space-around':
        style = {
          top: 0,
          bottom: 0,
          justifyContent: 'space-around',
        };
        break;
    }

    return style;
  }

  render() {
    //child elements are created dynamically so we need to clone them and add ref and key props so we can reference them later on
    this.children = this.props.children.map((child, index) => {
      return React.cloneElement(child, {
        ref: 'item' + index,
        key: 'item' + index,
        isFirst: index == 0,
        isLast: index == this.props.children.length - 1,
        isActive:
          this.props.showActiveItem && index === this.state.activeItemIndex,
        roundAll:
          this.props.itemsDistribution === 'space-between' ||
          this.props.itemsDistribution == 'space-around',
        onItemPress: child => this.onItemPress('item' + index),

        isOpened: this.props.isOpened,
        borderRadius: this.props.borderRadius,
        showItemsSeparator: this.props.showItemsSeparator,
        activeItemColor: this.props.activeItemColor,
        inactiveItemColor: this.props.inactiveItemColor,
        inactiveItemColorLight: shadeColor(this.props.inactiveItemColor, 5),
        inactiveItemColorDark: shadeColor(this.props.inactiveItemColor, -10),
        activeItemColorLight: shadeColor(this.props.activeItemColor, 5),
        activeItemColorDark: shadeColor(this.props.activeItemColor, -10),
      });
    });

    return (
      <View
        style={[styles.menu, this.computeStyle()]}
        ref={component => (this.menu = component)}>
        {this.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 0,
  },
});
