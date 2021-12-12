import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {Student} from 'api';
import {Loading} from 'components';

const ModalScreen = ({route, navigation}) => {
  const {id} = route.params;
  const [listing, setListing] = useState({});
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
    navigation.goBack();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.modalView}>
          <Text style={styles.titleStyle}>
            This is a modal! for {listing?.title}
          </Text>
          <Text>{listing?.description}</Text>
          <Text>{listing?.company_name}</Text>
          <Text>{listing?.start_date}</Text>
          <Text>{listing?.tenth_percentage}</Text>
          <Text>{listing?.twelfth_percentage}</Text>
          <Text>{listing?.grad_percentage}</Text>
          <Text>{listing?.cgpa}</Text>
          <Text>{listing?.active_backlog}</Text>
          <Text>{listing?.backlog_history}</Text>
          <Text>{listing?.eligible}</Text>
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
