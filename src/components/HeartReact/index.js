import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';

const colors = {
  transparent: 'transparent',
  white: '#e92f3c',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
};

const card = {
  photo: {
    uri:
      'https://instagram.fqyy1-1.fna.fbcdn.net/vp/3c9a078e2ca06b6f23495a58f4d5790e/5D38A6B6/t51.2885-15/e35/56706298_321117518554648_5665440507722377382_n.jpg?_nc_ht=instagram.fqyy1-1.fna.fbcdn.net',
  },
  key: 'pkarniej',
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    shadowColor: colors.black,
    padding: 7,
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0,
  },
});

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

class HeartReact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
    };

    this.lastPress = 0;
  }

  handleLargeAnimatedIconRef = (ref) => {
    this.largeAnimatedIcon = ref;
  };

  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref;
  };

  animateIcon = () => {
    const {liked} = this.state;
    this.largeAnimatedIcon.stopAnimation();

    if (liked) {
      this.largeAnimatedIcon
        .bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut());
      this.smallAnimatedIcon.pulse(200);
    } else {
      this.largeAnimatedIcon
        .bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut();
          this.smallAnimatedIcon.bounceIn();
        })
        .then(() => {
          if (!liked) {
            this.setState((prevState) => ({liked: !prevState.liked}));
          }
        });
    }
  };

  handleOnPress = () => {
    const time = new Date().getTime();
    const delta = time - this.lastPress;
    const doublePressDelay = 400;

    if (delta < doublePressDelay) {
      this.animateIcon();
    }
    this.lastPress = time;
  };

  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn();
    this.setState((prevState) => ({liked: !prevState.liked}));
  };

  render() {
    const {liked} = this.state;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={this.handleOnPress}>
        <AnimatedIcon
          ref={this.handleLargeAnimatedIconRef}
          name="heart"
          color={colors.white}
          size={40}
          style={styles.animatedIcon}
          duration={500}
          delay={200}
        />
        <Image style={styles.image} source={card.photo} resizeMode="cover" />
        <View style={styles.photoDescriptionContainer}>
          <TouchableOpacity activeOpacity={1} onPress={this.handleOnPressLike}>
            <AnimatedIcon
              ref={this.handleSmallAnimatedIconRef}
              name={liked ? 'heart' : 'hearto'}
              color={liked ? colors.heartColor : colors.textPrimary}
              size={26}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default HeartReact;
