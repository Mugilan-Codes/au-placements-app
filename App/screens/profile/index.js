import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

import {FormInput, ScreenHeader} from '../../components';
import {load, logout, selectUser} from '../../store/slices/authSlice';
import {validators} from '../../utils';
import {Student} from '../../api';

const ProfleScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eduModal, setEduModal] = useState(false);
  const [studModal, setStudModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedVal, setSelectedVal] = useState('');
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const res = await Student.getCourses();

    const data = await res.data;

    setCourses(data.courses);

    console.log(data.total);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const loadPicker = () => {
    // getCourses();

    return courses.map((course, idx) => {
      return (
        <Picker.Item key={idx} label={course.course_name} value={course.id} />
      );
    });
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleEduModal = () => {
    setEduModal(!eduModal);
  };
  const handleStudModal = () => {
    setStudModal(!studModal);
  };
  const containerStyle = {backgroundColor: 'white', padding: 20};

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

  const reloadData = useCallback(() => {
    console.log('reloading...');
    setRefreshing(true);
    dispatch(load());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const onLogout = async () => {
    // TODO: Present a Loading
    console.log('logging out...');
    dispatch(logout());
  };

  // TODO: add course by updating student. (present all the courses in a dropdown)

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

            <Button onPress={handleStudModal}>Edit</Button>
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
            <Button onPress={handleModal}>{user?.mark ? 'Edit' : 'Add'}</Button>
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
            <Button onPress={handleEduModal}>
              {user?.education ? 'Edit' : 'Add'}
            </Button>
          </Card.Actions>
        </Card>

        <SafeAreaView style={styles.container}>
          <Button onPress={onLogout}>Logout</Button>
        </SafeAreaView>

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={handleModal}
            contentContainerStyle={containerStyle}>
            <Title>Marks</Title>

            <View>
              <Controller
                defaultValue={user?.mark?.cgpa.toString()}
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
                defaultValue={user?.mark?.active_backlog.toString()}
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
                defaultValue={user?.mark?.backlog_history.toString()}
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

            <Button onPress={handleModal}>Close Modal</Button>
          </Modal>

          <Modal
            visible={eduModal}
            onDismiss={handleEduModal}
            contentContainerStyle={containerStyle}>
            <Title>Education</Title>

            <View>
              <Controller
                defaultValue={user?.education?.tenth_percentage.toString()}
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
                defaultValue={user?.education?.twelfth_percentage.toString()}
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
                defaultValue={user?.education?.grad_percentage.toString()}
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

            <Button onPress={handleEduModal}>Close Modal</Button>
          </Modal>

          <Modal
            visible={studModal}
            onDismiss={handleStudModal}
            contentContainerStyle={containerStyle}>
            <Title>Update Student</Title>

            <Picker
              selectedValue={selectedVal}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVal(itemValue)
              }>
              {loadPicker()}
            </Picker>
            {/* <View></View> */}
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
