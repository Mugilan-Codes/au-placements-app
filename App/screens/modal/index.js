import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

// TODO: Build this to get ID and call API to fetch listings.
const ModalScreen = ({route, navigation}) => {
  const {title} = route.params;
  return (
    <View style={styles.modalView}>
      <Text style={styles.titleStyle}>
        This is a modal! for {JSON.stringify(title)}
      </Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
  },
});
