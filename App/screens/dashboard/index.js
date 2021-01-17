import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {useAuth} from '../../state/providers/auth/provider';

const DashboardScreen = ({navigation}) => {
  const {state, loadUser} = useAuth();

  // todo: Get All Listings with Eligiblity satisfied
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  console.log({state});

  return (
    <View>
      <Text>DashboardScreen</Text>
      <Text>{state?.user?.email}</Text>
      <Text>Get All Listings here</Text>
    </View>
  );
};

export default DashboardScreen;
