import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {STORAGE} from '../../config/api/routes';

export default SliderCustomSingle = ({
  style,
  item,
  imageKey,
  onPress,
  index,
  active,
  local,
}) => {
  return (
    <TouchableOpacity
      style={[styles.videoContainer]}
      onPress={() => onPress(item)}>
      <View style={[styles.imageContainer, styles.shadow]}>
        <Image
          style={[styles.videoPreview, active ? {} : {height: 120}]}
          source={{uri: STORAGE + `${item[imageKey]}`}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: 275,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  videoPreview: {
    width: 275,
    height: 155,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  desc: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
