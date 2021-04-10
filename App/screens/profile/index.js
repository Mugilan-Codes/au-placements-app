import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
} from 'react-native';

import {useAuth} from '../../contexts';
import {ScreenHeader} from '../../components';

const ProfleScreen = ({navigation}) => {
  const {state, loadUser, logout} = useAuth();

  // TODO: Add/Edit Marks & Education
  // TODO: Use Modal

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onLogout = async () => {
    // TODO: Present a Loading
    console.log('logging out...');
    await logout();
  };

  // TODO: Create a card to display state.user, state.user.mark and state.user.education

  return (
    <>
      <ScreenHeader title={state?.user?.name} subText="Profile" />
      <SafeAreaView style={styles.container}>
        {state.user?.mark ? (
          <TouchableHighlight onPress={() => Alert.alert('Edit Marks')}>
            <Text>Edit Marks</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={() => Alert.alert('Add Marks')}>
            <Text>Add Marks</Text>
          </TouchableHighlight>
        )}

        {state.user?.education ? (
          <TouchableHighlight onPress={() => Alert.alert('Edit Education')}>
            <Text>Edit Education</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={() => Alert.alert('Add Education')}>
            <Text>Add Education</Text>
          </TouchableHighlight>
        )}

        <TouchableHighlight onPress={onLogout}>
          <Text>LOGOUT</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
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
