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
import {useDispatch, useSelector} from 'react-redux';

import {ScreenHeader} from '../../components';
import {load, logout, selectUser} from '../../store/slices/authSlice';

const ProfleScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // TODO: Add/Edit Marks & Education
  // TODO: Use Modal

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  const onLogout = async () => {
    // TODO: Present a Loading
    console.log('logging out...');
    dispatch(logout());
  };

  console.log('ProfileScreen user =', user);

  // TODO: Create a card to display user, user.mark and user.education

  return (
    <>
      <ScreenHeader title={user?.name} subText="Profile" />
      <Card>
        <Card.Title
          title="User"
          left={(props) => <Avatar.Icon {...props} icon="account" />}
        />
        <Card.Content>
          <Title>{user?.name}</Title>
          <Paragraph>{user?.email}</Paragraph>
          <Text>Register Number: {user?.register_no}</Text>
        </Card.Content>
      </Card>
      <Divider />
      <Card>
        <Card.Title
          title="Marks"
          left={(props) => <Avatar.Icon {...props} icon="counter" />}
        />
        <Card.Actions>
          {user?.mark ? (
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
          {user?.education ? (
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
