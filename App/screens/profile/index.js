import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from 'react-native';

import {useAuth} from '../../state/providers/auth/provider';

const ProfleScreen = ({navigation}) => {
  const {state, loadUser, logout} = useAuth();

  // TODO: Add/Edit Marks & Education

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfleScreen</Text>
      <Text>{state?.user?.name}</Text>

      {!state.user?.mark ? (
        <TouchableHighlight onPress={() => Alert.alert('Add Marks')}>
          <Text>Add Marks</Text>
        </TouchableHighlight>
      ) : null}

      {!state.user?.education ? (
        <TouchableHighlight onPress={() => Alert.alert('Add Education')}>
          <Text>Add Education</Text>
        </TouchableHighlight>
      ) : null}

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
