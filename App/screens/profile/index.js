import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, View, RefreshControl} from 'react-native';
import {
  Card,
  Divider,
  Button,
  Title,
  Avatar,
  Paragraph,
  Text,
  Modal,
  Portal,
  DataTable,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

import {FormInput, ScreenHeader} from 'components';
import {logout} from 'store/slices/authSlice';
import {load, selectUser} from 'store/slices/userSlice';
import {fetchCourses, selectCourses} from 'store/slices/courseSlice';
import {useReduxDispatch, useReduxSelector} from 'store';
import {validators} from 'utils';

const ProfleScreen = ({navigation}) => {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector(selectUser);
  const courses = useReduxSelector(selectCourses);

  const [markModal, setMarkModal] = useState(false);
  const [eduModal, setEduModal] = useState(false);
  const [studModal, setStudModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [items, setItems] = useState([]);

  const getCourses = async () => {
    dispatch(fetchCourses());

    setItems(
      courses
        .map((item) => ({label: item.course_name, value: item.id}))
        // .sort((item) => (item.label === user?.course?.course_name ? -1 : 1)),
        .sort((a, b) => {
          if (a.label === user?.course?.course_name) {
            return -1;
          }
          if (b.label === user?.course?.course_name) {
            return 1;
          }
          return a.label < b.label ? -1 : 1;
        }),
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const showMarkModal = () => setMarkModal(true);
  const hideMarkModal = () => setMarkModal(false);

  const showEduModal = () => setEduModal(true);
  const hideEduModal = () => setEduModal(false);

  const showStudModal = () => {
    getCourses();
    setStudModal(true);
  };
  const hideStudModal = () => setStudModal(false);

  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 10};

  // TODO: Add/Edit Marks & Education
  // TODO: close modal after submit and refresh profile screen for changes to take effect
  const onSubmit = (data) => {
    console.log('Mark OnSubmit');
    console.log({data});
  };
  const onEduSubmit = (data) => {
    console.log('Education OnEduSubmit');
    console.log({data});
  };
  const onStudSubmit = (data) => {
    console.log('Student OnStudSubmit');
    console.log({data});
  };

  const reloadData = useCallback(() => {
    console.log('reloading...');
    setRefreshing(true);
    dispatch(load());
    setRefreshing(false);
  }, [dispatch]);

  // useEffect(() => {
  //   reloadData();
  //   dispatch(fetchCourses());
  // }, [dispatch, reloadData]);

  const onLogout = async () => {
    // TODO: Present a Loading
    console.log('logging out...');
    dispatch(logout());
  };

  return (
    <>
      <ScreenHeader title={user?.name} subText="Profile" />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadData} />
        }>
        <Card>
          <Card.Title
            title="Student"
            left={(props) => <Avatar.Icon {...props} icon="account" />}
            right={(props) => <Avatar.Icon {...props} icon="account" />}
          />

          <Card.Content>
            <Title>{user?.name}</Title>

            <Paragraph>{user?.email}</Paragraph>

            <Text>Register Number: {user?.register_no}</Text>

            <Text>Level: {user?.course?.degree}</Text>

            <Text>Degree: {user?.course?.course_name}</Text>

            <Button onPress={showStudModal}>Edit</Button>
          </Card.Content>
        </Card>

        <Divider />

        <Card>
          <Card.Title
            title="Marks"
            left={(props) => <Avatar.Icon {...props} icon="counter" />}
          />

          {user?.mark && (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Course</DataTable.Title>
                <DataTable.Title numeric>CGPA</DataTable.Title>
                <DataTable.Title numeric>Backlog</DataTable.Title>
                <DataTable.Title numeric>History</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>{user?.course?.short_name}</DataTable.Cell>
                <DataTable.Cell numeric>{user?.mark?.cgpa}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user?.mark?.active_backlog}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {user?.mark?.backlog_history}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          )}

          <Card.Actions>
            <Button onPress={showMarkModal}>
              {user?.mark ? 'Edit' : 'Add'}
            </Button>
          </Card.Actions>
        </Card>

        <Divider />

        <Card>
          <Card.Title
            title="Education"
            left={(props) => (
              <Avatar.Icon {...props} icon="book-open-variant" />
            )}
          />

          {user?.education && (
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Course</DataTable.Title>
                <DataTable.Title numeric>Marks</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>10th</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user?.education?.tenth_percentage}%
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>12th</DataTable.Cell>
                <DataTable.Cell numeric>
                  {user?.education?.twelfth_percentage}%
                </DataTable.Cell>
              </DataTable.Row>

              {user?.education?.grad_course && (
                <DataTable.Row>
                  <DataTable.Cell>
                    {user?.education?.grad_course}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {user?.education?.grad_percentage}%
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          )}

          <Card.Actions>
            <Button onPress={showEduModal}>
              {user?.education ? 'Edit' : 'Add'}
            </Button>
          </Card.Actions>
        </Card>

        <View style={styles.container}>
          <Button onPress={onLogout}>Logout</Button>
        </View>

        <Portal>
          <Modal
            visible={markModal}
            onDismiss={hideMarkModal}
            contentContainerStyle={containerStyle}>
            <Title>Marks</Title>

            <View>
              <Controller
                defaultValue={user?.mark?.cgpa.toString() || ''}
                name="cgpa"
                control={control}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_TEN,
                    message: 'must be between 0 & 10',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Current CGPA"
                    type="number"
                    error={errors.cgpa}
                    errorText={errors?.cgpa?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="decimal-pad"
                  />
                )}
              />

              <Controller
                defaultValue={user?.mark?.active_backlog.toString() || ''}
                name="backlog"
                control={control}
                rules={{
                  min: 0,
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Active Backlog"
                    type="number"
                    error={errors.backlog}
                    errorText={errors?.backlog?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="number-pad"
                  />
                )}
              />

              <Controller
                defaultValue={user?.mark?.backlog_history.toString() || ''}
                name="history"
                control={control}
                rules={{
                  min: 0,
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Backlog History"
                    type="number"
                    error={errors.history}
                    errorText={errors?.history?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="number-pad"
                  />
                )}
              />

              <Button onPress={handleSubmit(onSubmit)}>Update Marks</Button>
            </View>

            <Button onPress={hideMarkModal}>Close Modal</Button>
          </Modal>

          <Modal
            visible={eduModal}
            onDismiss={hideEduModal}
            contentContainerStyle={containerStyle}>
            <Title>Education</Title>

            <View>
              <Controller
                defaultValue={
                  user?.education?.tenth_percentage.toString() || ''
                }
                name="tenth"
                control={control}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Tenth Percentage"
                    type="number"
                    error={errors.tenth}
                    errorText={errors?.tenth?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="decimal-pad"
                  />
                )}
              />

              <Controller
                defaultValue={
                  user?.education?.twelfth_percentage.toString() || ''
                }
                name="twelfth"
                control={control}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Twelfth Percentage"
                    type="number"
                    error={errors.twelfth}
                    errorText={errors?.twelfth?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="decimal-pad"
                  />
                )}
              />

              <Controller
                defaultValue={user?.education?.grad_percentage.toString() || ''}
                name="grad"
                control={control}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <FormInput
                    placeholder="Grad Percentage"
                    type="number"
                    error={errors.grad}
                    errorText={errors?.grad?.message}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    keyboardType="decimal-pad"
                  />
                )}
              />

              <Button onPress={handleSubmit(onEduSubmit)}>
                Update Education
              </Button>
            </View>

            <Button onPress={hideEduModal}>Close Modal</Button>
          </Modal>

          <Modal
            visible={studModal}
            onDismiss={hideStudModal}
            contentContainerStyle={containerStyle}>
            <Title>Update Student</Title>

            <View>
              <Controller
                name="course"
                control={control}
                render={({onChange, ...props}) => (
                  <RNPickerSelect
                    {...props}
                    items={items}
                    onValueChange={(value) => onChange(value)}
                    // placeholder={{
                    //   ...(!user.course && {
                    //     label: 'Select Course',
                    //     value: null,
                    //   }),
                    // }}
                    value="pg-mca-r"
                  />
                )}
                defaultValue=""
              />

              <Button onPress={handleSubmit(onStudSubmit)}>Update</Button>
            </View>

            <Button onPress={hideStudModal}>Close Modal</Button>
          </Modal>
        </Portal>
      </ScrollView>
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
