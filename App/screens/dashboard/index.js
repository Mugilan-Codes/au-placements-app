import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {Routes} from '../../config';
import {useAuth} from '../../state/providers/auth/provider';

const DashboardScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  const {state, loadUser} = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  console.log({state});

  return (
    <View>
      <Text>DashboardScreen</Text>
      <Text>{state.user.email}</Text>
      <Text>Get All Listings here</Text>
    </View>
  );
};

export default DashboardScreen;
