import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {
  Card,
  Divider,
  Button,
  Title,
  Avatar,
  Paragraph,
  Text,
} from 'react-native-paper';

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

  console.log('ProfileScreen state.user =', state.user);

  // TODO: Create a card to display state.user, state.user.mark and state.user.education

  return (
    <>
      <ScreenHeader title={state?.user?.name} subText="Profile" />
      <Card>
        <Card.Title
          title="User"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Title>{state?.user?.name}</Title>
          <Paragraph>{state?.user?.email}</Paragraph>
          <Text>Register Number: {state?.user?.register_no}</Text>
        </Card.Content>
      </Card>
      <Divider />
      <Card>
        <Card.Title
          title="Marks"
          left={(props) => <Avatar.Icon {...props} icon="counter" />}
        />
        <Card.Actions>
          {state.user?.mark ? (
            <Button onPress={() => Alert.alert('Edit Marks')}>Edit</Button>
          ) : (
            <Button onPress={() => Alert.alert('Add Marks')}>Add</Button>
          )}
        </Card.Actions>
      </Card>
      <Divider />
      <Card>
        <Card.Title
          title="Education"
          left={(props) => <Avatar.Icon {...props} icon="book-open-variant" />}
        />
        <Card.Actions>
          {state.user?.education ? (
            <Button onPress={() => Alert.alert('Edit Education')}>Edit</Button>
          ) : (
            <Button onPress={() => Alert.alert('Add Education')}>Add</Button>
          )}
        </Card.Actions>
      </Card>
      <SafeAreaView style={styles.container}>
        <Button onPress={onLogout}>Logout</Button>
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
