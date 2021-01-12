import React, {useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import {Routes} from '../../config';
import {useAuth} from '../../state/providers/auth/provider';

const ProfleScreen = ({navigation}) => {
  const {navigate: navigateTo} = navigation;

  const {state, loadUser, logout} = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onLogout = () => {
    navigation.replace(Routes.AUTH);
    logout();
  };

  return (
    <View>
      <Text>ProfleScreen</Text>
      <Text>{state.user.email}</Text>
      <TouchableHighlight onPress={onLogout}>
        <Text>LOGOUT</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ProfleScreen;
