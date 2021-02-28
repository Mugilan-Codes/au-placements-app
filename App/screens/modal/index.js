import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {Student} from '../../api';

// TODO: Build this to get ID and call API to fetch listings.
const ModalScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [listing, setListing] = useState({});

  useEffect(() => {
    getListing(id);
  }, [id]);

  const getListing = async (list_id) => {
    const {data} = await Student.getOneListing(list_id);
    setListing(data);
  };

  const dismissList = () => {
    setListing({});
    navigation.goBack();
  };

  console.log(listing);
  return (
    <View style={styles.modalView}>
      <Text style={styles.titleStyle}>
        This is a modal! for {listing.title}
      </Text>
      <Button onPress={dismissList} title="Dismiss" />
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
