import React from 'react';
import {FlatList, li, Text, View} from 'react-native';

const Suggestions = (props) => {
  const options = props.results.map((r) => <li key={r.id}>{r.name}</li>);
  return (
    <View>
      <FlatList
        data={options}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default Suggestions;
