import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

interface Tab {
  name: string;
  screen: string;
  color: string;
}

interface Props {
  tabs: Tab[];
  value: Animated.Value;
}
export const tabHeight = 70;
const {width} = Dimensions.get('window');

class StaticTabbar extends Component<Props> {
  values: Animated.Value[] = [];
  constructor(props: Props) {
    super(props);
    const {tabs} = this.props;
    this.values = tabs.map(
      (tab, index) => new Animated.Value(index === 0 ? 1 : 0),
    );
  }
  onPress(index: number, screen: string) {
    const {value, tabs} = this.props;
    const tabWidth = width / tabs.length;
    Animated.sequence([
      ...this.values.map(value =>
        Animated.timing(value, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ),
      Animated.parallel([
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(value, {
          toValue: -width + tabWidth * index,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    if (screen == 'drawer') {
      Actions.push(screen);
      Actions.refresh({key: 'drawer', open: true});
    } else {
      Actions.push(screen);
      Actions.reset;
    }
  }

  render() {
    const {tabs, value} = this.props;
    const tabWidth = width / tabs.length;
    return (
      <View style={styles.container}>
        {tabs.map(({name, screen, color}, index) => {
          const activeValue = this.values[index];

          const opacity = value.interpolate({
            inputRange: [
              -width + tabWidth * (index - 1),
              -width + tabWidth * index,
              -width + tabWidth * (index + 1),
            ],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
          });

          const translateY = activeValue.interpolate({
            inputRange: [0, 1],
            outputRange: [tabHeight, 0],
          });

          return (
            <React.Fragment key={index}>
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.onPress(index, screen)}>
                <Animated.View style={[styles.tab, {opacity}]}>
                  <Icon size={25} {...{name}} />
                </Animated.View>
              </TouchableWithoutFeedback>

              <Animated.View
                style={{
                  position: 'absolute',
                  top: -8,
                  width: tabWidth,
                  left: tabWidth * index,
                  height: tabHeight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: [{translateY}],
                }}>
                <View style={styles.circle}>
                  <Icon size={25} {...{name}} color={color} />
                </View>
              </Animated.View>
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: tabHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(null)(StaticTabbar);
