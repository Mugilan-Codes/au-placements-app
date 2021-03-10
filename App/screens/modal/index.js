import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {Student} from '../../api';
import {Loading} from '../../components';

// TODO: Build this to get ID and call API to fetch listings.
const ModalScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListing(id);
  }, [id]);

  const getListing = async (list_id) => {
    setLoading(true);
    const {data} = await Student.getOneListing(list_id);
    setListing(data);
    setLoading(false);
  };

  const dismissList = () => {
    setListing(null);
    navigation.goBack();
  };

  console.log(listing);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.modalView}>
          <Text style={styles.titleStyle}>
            This is a modal! for {listing.title}
          </Text>
          <Button onPress={dismissList} title="Dismiss" />
        </View>
      )}
    </>
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
