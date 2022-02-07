import React, {PureComponent} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import {debounce} from 'lodash';
import EventEmitter from '../../redux/AppEventEmitter';

const onOpenSearchModal = func =>
  EventEmitter.addListener('modal.search.open', func);

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onSearch = debounce(searchText => {
    if (searchText.trim().length > 2) {
      this.props.onSearch(this.props.isMap, searchText);
    } else {
      this.props.stopSearch();
    }
  }, 500);

  _onFilter = () => {
    let isMap = this.props.isMap;
    onOpenSearchModal(isMap);
  };

  render() {
    const hitSlop = {
      top: 15,
      right: 15,
      left: 15,
      bottom: 15,
    };
    return (
      <KeyboardAvoidingView style={[styles.container]}>
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'Search'}
          placeholderTextColor="#999"
          underlineColorAndroid={'transparent'}
          clearButtonMode={'while-editing'}
          onChangeText={this._onSearch}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    left: 0,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        top: 0,
        shadowColor: '#333',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 0.1,
      },
      android: {
        top: 0,
      },
    }),
  },
  searchIcon: {
    width: 16,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
    marginTop: 5,
  },
  input: {
    marginBottom: 6,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    fontSize: 15,
    paddingLeft: 4,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    backgroundColor: '#eee',
    borderRadius: 40,

    ...Platform.select({
      ios: {
        marginTop: 15,
        paddingVertical: 6,
      },
      android: {
        marginTop: 10,
        padding: 0,
      },
    }),
  },
  btnFilSearch: {
    marginTop: 5,
    marginHorizontal: 10,
    zIndex: 999,
    marginRight: 15,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  iconSearchAdvance: {
    width: 18,
    height: 18,
    tintColor: 'blue',
    resizeMode: 'contain',
  },
});

export default SearchBar;
