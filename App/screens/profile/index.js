import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableHighlight, StyleSheet} from 'react-native';

import {useAuth} from '../../state/providers/auth/provider';

const ProfleScreen = ({navigation}) => {
  const {state, loadUser, logout} = useAuth();

  // todo: Add Buttons to Add/Edit Marks and Education

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfleScreen</Text>
      <Text>{state?.user?.email}</Text>
      <TouchableHighlight onPress={onLogout}>
        <Text>LOGOUT</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfleScreen;
