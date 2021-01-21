import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

import {useAuth} from '../../state/providers/auth/provider';

const ProfleScreen = ({navigation}) => {
  const {state, loadUser, logout} = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>ProfleScreen</Text>
      <Text>{state?.user?.email}</Text>
      <TouchableHighlight onPress={onLogout}>
        <Text>LOGOUT</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default ProfleScreen;
