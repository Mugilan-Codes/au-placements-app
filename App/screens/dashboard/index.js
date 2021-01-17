import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {useList} from '../../state/providers/listing';

const DashboardScreen = ({navigation}) => {
  const {state, loadListings} = useList();

  // todo: Get All Listings with Eligiblity satisfied
  useEffect(() => {
    loadListings();
  }, [loadListings]);

  console.log({state});

  return (
    <View>
      <Text>DashboardScreen</Text>
      <Text>Get All Listings here</Text>
    </View>
  );
};

export default DashboardScreen;
