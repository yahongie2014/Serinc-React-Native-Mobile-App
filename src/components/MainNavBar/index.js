import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';
import Hamburger from 'react-native-animated-hamburger';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Menu, MenuItem} from '../Menu';

class MainNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      menuOpened: true,
      // mobileNo: '01096187357',
      mobileNo: '01091950488',
      message: 'I want Make a Deal ?',
    };
    this.onBtnPress = this.onBtnPress.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        active: false,
        menuOpened: false,
      });
    }, 500);
  }

  handleClick(id) {
    let {active} = this.state;
    this.setState({
      active: [...active.slice(0, id), !active[id], ...active.slice(id + 1)],
    });
  }
  onBtnPress() {
    this.setState({
      menuOpened: !this.state.menuOpened,
    });
  }

  openWhatsApp = () => {
    let msg = this.state.message;
    let mobile = this.state.mobileNo;
    if (mobile) {
      if (msg) {
        let url =
          'whatsapp://send?text=' +
          this.state.message +
          '&phone=20' +
          this.state.mobileNo;
        Linking.openURL(url)
          .then(data => {
            console.log('WhatsApp Opened successfully ' + data);
          })
          .catch(() => {
            alert('Make sure WhatsApp installed on your device');
          });
      } else {
        alert('Please enter message to send');
      }
    } else {
      alert('Please enter mobile no');
    }
  };

  render() {
    const {active} = this.state;
    const navigation = this.props.navigation;

    return (
      <>
        <View style={styles.sidemenu}>
          <Menu inactiveItemColor="#34495e" isOpened={this.state.menuOpened}>
            <MenuItem
              onPress={() => Linking.openURL('fb://page/824740320941661')}>
              <Icon name="facebook" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() =>
                Linking.openURL('http://instagram.com/_u/serinc.tech')
              }>
              <Icon name="instagram" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() => Linking.openURL('https://twitter.com/SerincTech')}>
              <Icon name="twitter" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() =>
                Linking.openURL('https://www.behance.net/serinconlinellc')
              }>
              <Icon name="behance" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() => Linking.openURL('https://github.com/Serionline')}>
              <Icon name="github" size={25} color="#fff" />
            </MenuItem>

            <MenuItem onPress={this.openWhatsApp}>
              <Icon name="whatsapp" size={25} color="#fff" />
            </MenuItem>

            <MenuItem
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/company/18643646')
              }>
              <Icon name="linkedin" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/channel/UCgBr246o1bSSm0lx8xHvQXQ?fbclid=IwAR31UHo2UbxO3nMDY_bmtb1KT6IKzgcHlERf2a39bPDkfOdtV41qsveSvt8/',
                )
              }>
              <Icon name="youtube-play" size={25} color="#fff" />
            </MenuItem>
            <MenuItem
              onPress={() =>
                Linking.openURL(
                  'https://drive.google.com/file/d/1LqojMUwUX6QfRHTkDxdPlmixjgpj48gu/view',
                )
              }>
              <Icon name="file-pdf-o" size={25} color="#fff" />
            </MenuItem>
            <MenuItem onPress={() => Linking.openURL('https://serinc.tech/')}>
              <Icon name="globe" size={25} color="#fff" />
            </MenuItem>
          </Menu>
        </View>

        <View style={styles.container}>
          <View style={styles.burger}>
            <Hamburger
              type="spinCross"
              active={active}
              menuClicked={this.handleClick.bind(this, 0)}
              onPress={() => {
                this.setState({
                  active: !this.state.active,
                  menuOpened: !this.state.menuOpened,
                });
              }}
              style={styles.burger}
              color="white"
              borderRadius={0}
              animationDuration={0.5}
              underlayColor="transparent"></Hamburger>
          </View>
          <View style={styles.textHyper}>
            <Text style={styles.Text}>Serinc</Text>
          </View>
          <View style={styles.contact}>
            {/* Actions.contact */}
            <TouchableOpacity onPress={Actions.contact}>
              <Icon name="telegram" size={30} color="#FFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%',
    backgroundColor: '#34495e',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    height: 43,
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    overflow: 'hidden',
    resizeMode: 'cover',
    elevation: 5,
  },
  sidemenu: {
    flexDirection: 'row',
    marginTop: 42,
  },
  burger: {
    marginRight: 320,
    marginTop: 10,
    flexDirection: 'column-reverse',
    display: 'flex',
  },
  contact: {
    marginLeft: 330,
    alignItems: 'center',
    marginTop: -37,
  },
  textHyper: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    position: 'absolute',
  },
  Text: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: 'white',
    justifyContent: 'flex-start',
  },
  search: {
    flex: 1,
    width: '100%',
    marginTop: -100,
  },
});

export default connect(null)(MainNavBar);
