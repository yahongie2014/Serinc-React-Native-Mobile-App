import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Keyboard,
  Dimensions,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import {BASEURL} from '../../config/api/routes';

let window = Dimensions.get('window');
const contentHeight = window.height - 150;

const avatarBot = `${BASEURL}logo2.png`;

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.state = {gifted: [], answers: [], height: contentHeight};
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = e => {
    this.setState({height: contentHeight - e.endCoordinates.height});
  };

  _keyboardDidHide = e => {
    this.setState({height: contentHeight});
  };

  componentWillMount() {
    this.setState({
      gifted: [
        {
          _id: 1,
          text: 'Hi! Im Serinc Bot! There is  a lot in store for you on your trip, so ask me if you need anything! 😍',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Serinc',
            avatar: avatarBot,
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      gifted: GiftedChat.append(previousState.gifted, messages),
    }));
    this.getDialogFlow(messages[0].text);
  }

  async getDialogFlow(msg) {
    const ACCESS_TOKEN = 'TOKEN_FROM_DIALOGFLOW';

    try {
      const response = await fetch(
        `https://api.dialogflow.com/v1/query?v=20170712`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query: msg,
            lang: 'en',
            sessionId: 'somerandomthing',
          }),
        },
      );
      let responseJson = [
        {
          id: 0,
          text: 'Welcome in our empire how i can help u 🤷‍♂️ ',
        },
        {
          id: 1,
          text: 'Welcome in our empire how i can help u 🤷‍♂️ ',
        },
        {
          id: 2,
          text: 'We will contact you soon..bye 👌',
        },
      ];
      // let responseJson = await response.json();

      const imageUrl = null;

      // responseJson.result.fulfillment.messages.map((item, i) => {
      //   if (item.payload !== undefined) {
      //     if (item.payload.imageUrl !== undefined) {
      //       imageUrl = item.payload.imageUrl;
      //     }
      //   }
      //   return imageUrl;
      // });

      let answers = [
        {
          _id: responseJson.id,
          text: responseJson[2].text,
          // text: responseJson.result.fulfillment.speech,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Serinc',
            avatar: avatarBot,
          },
          image: imageUrl,
          imageProps: {
            height: 300,
            width: 300,
          },
        },
      ];
      this.setState(previousState => ({
        gifted: GiftedChat.append(previousState.gifted, answers),
      }));

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  renderChat = () => {
    return (
      <GiftedChat
        textInputProps={{autoFocus: true}}
        messages={this.state.gifted}
        placeholder="Ask me anything..."
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  };
  render() {
    if (Platform.OS === 'ios') {
      return this.renderChat();
    } else {
      return (
        <SafeAreaView>
          <KeyboardAvoidingView style={{height: this.state.height}}>
            {this.renderChat()}
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }
}
export default connect(null)(Portfolio);
