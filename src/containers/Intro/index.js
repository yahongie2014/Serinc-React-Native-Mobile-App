import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

const {width: deviceWidth} = Dimensions.get('window');
import {
  Header,
  ContentContainer,
  GradientBackgrounds,
} from 'react-native-onboarding-component';
import styles from './styles';
import Indicator from './Indicator';

const pages = [
  {
    title: 'Welcome To Serinc',
    description:
      ' We build successful and sustainable enterprises from the ground up by capitalizing on our expertise, resources and network. ',
    backgroundColor: '#fff',
    source: require('../../Assets/lottie/intro-1.json'),
    button: '',
  },
  {
    title: 'We Build App`s',
    description:
      'We Create Web App & Mobile App With Big Technology you can Read More In Our Info',
    backgroundColor: '#FFEDB9',
    source: require('../../Assets/lottie/intro-2.json'),
    button: '',
  },
  {
    title: 'Digital Marketing',
    description:
      'We Build Many Success Campaigns and Get Real Leads for Our Strategy Flow Working ',
    backgroundColor: '#B1DEFC',
    source: require('../../Assets/lottie/intro-3.json'),
    button: '',
  },
  {
    title: 'Let`s Deep Into Services',
    description: 'Lets Deep Into Serinc Service`s if you are ready 😎',
    backgroundColor: '#B1DEFC',
    source: require('../../Assets/lottie/intro-4.json'),
    button: 'Skip',
  },
];

class Intro extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      loading: true,
      showRealApp: false,
    };

    this.scrollX = new Animated.Value(0);
    this.animations = new Map();
  }
  componentDidMount() {
    AsyncStorage.getItem('first_time').then(value => {
      this.setState({showRealApp: !!value, loading: false});
    });
  }
  async componentDidMount() {
    this.animations.get(this.state.currentIndex).play();
    await AsyncStorage.setItem('isRTL', JSON.stringify(0));
  }

  onScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / deviceWidth);
    if (this.state.currentIndex !== currentIndex) {
      this.animations.forEach(animation => {
        animation.reset();
      });
      this.animations.get(currentIndex).play();
      this.setState({currentIndex});
    }
  };

  scrollTo = index => {
    this.scrollView._component.scrollTo({
      x: deviceWidth * index,
      animated: true,
    });
  };

  onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({showRealApp: true});
      Actions.home({type: 'reset'});
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#2c3e50" barStyle="light-content" />
        <GradientBackgrounds
          colors={pages.map(page => page.backgroundColor)}
          scrollX={this.scrollX}
          style={{height: '56%'}}
        />
        <Animated.ScrollView
          horizontal
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
            {useNativeDriver: true, listener: this.onScroll},
          )}>
          {pages.map((page, index) => (
            <View
              key={`pages-${index}`}
              style={[
                styles.card,
                {width: deviceWidth, flexDirection: 'column'},
              ]}>
              <Header style={{backgroundColor: 'transparent'}}>
                <LottieView
                  ref={animation => {
                    if (animation) {
                      this.animations.set(index, animation);
                    }
                  }}
                  loop={false}
                  style={styles.lottie}
                  source={page.source}
                />
              </Header>
              <ContentContainer style={{backgroundColor: '#fff'}}>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.description}>{page.description}</Text>
              </ContentContainer>
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.row}>
          <View style={styles.indicatorWrap}>
            <Indicator items={pages} scrollX={this.scrollX} />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.state.currentIndex + 1 === pages.length) {
                this.onSkip();
              } else {
                const next = this.state.currentIndex + 1;
                this.scrollTo(next);
              }
            }}>
            <Text style={styles.btnText}>
              {pages[this.state.currentIndex].button}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null)(Intro);
