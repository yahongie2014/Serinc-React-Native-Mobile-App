import React, {Component} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, {Path} from 'react-native-svg';
import StaticTabbar, {tabHeight as height} from '../StaticTabbar';
import {Actions} from 'react-native-router-flux';

const {width} = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const tabs = [
  {name: 'home', screen: 'home', color: '#3498db'},
  {name: 'connectdevelop', screen: 'services', color: '#ff3f34'},
  {name: 'podcast', screen: 'notifications', color: '#ef5777'},
  {name: 'ioxhost', screen: 'contact', color: '#575fcf'},
];
const tabWidth = width / tabs.length;
const getPath = (): string => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: 0, y: 0},
    {x: width, y: 0},
  ]);
  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: width, y: 0},
    {x: width + 5, y: 0},
    {x: width + 10, y: 10},
    {x: width + 10, y: height},
    {x: width + tabWidth - 10, y: height},
    {x: width + tabWidth - 10, y: 10},
    {x: width + tabWidth - 5, y: 0},
    {x: width + tabWidth, y: 0},
  ]);
  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: width + tabWidth, y: 0},
    {x: width * 2, y: 0},
    {x: width * 2, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();

interface Props {}

export default class Tabbar extends Component<Props> {
  value = new Animated.Value(-width);
  render() {
    const {value: translateX} = this;
    return (
      <>
        <View {...{width, height}}>
          <AnimatedSvg
            width={width * 2}
            style={{transform: [{translateX}]}}
            {...{height}}>
            <Path {...{d}} fill="#fff" />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <TouchableOpacity
              onPress={() =>
                tabs.map(({screen}) => {
                  {
                    Actions.currentScene == 'contact'
                      ? Actions.push(screen, {type: 'reset'})
                      : Actions.currentScene == 'singleBlog'
                      ? Actions.push(screen, {type: 'reset'})
                      : Actions.currentScene == 'singleproject'
                      ? Actions.push(screen, {type: 'reset'})
                      : console.log(tabs);
                  }
                })
              }>
              <StaticTabbar value={translateX} {...{tabs}} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
