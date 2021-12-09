import React, {useState} from 'react';
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
  TextInput,
  HelperText,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

import {ScreenHeader} from 'components';
import {logout} from 'store/slices/authSlice';
import {load, selectUser} from 'store/slices/userSlice';
import {fetchCourses, selectCourses} from 'store/slices/courseSlice';
import {useTheme} from 'contexts';
import {useReduxDispatch, useReduxSelector} from 'store';
import {validators} from 'utils';

const ProfleScreen = ({navigation}) => {
  const {
    theme: {colors},
  } = useTheme();

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

  // TODO: close modal after submit and refresh profile screen for changes to take effect

  const showMarkModal = () => setMarkModal(true);
  const hideMarkModal = () => setMarkModal(false);
  const onMarkSubmit = (data) => {
    console.log('Mark OnMarkSubmit');
    console.log({data});
  };
  const handleOnMarkSubmit = handleSubmit(onMarkSubmit);

  const showEduModal = () => setEduModal(true);
  const hideEduModal = () => setEduModal(false);
  const onEduSubmit = (data) => {
    console.log('Education OnEduSubmit');
    console.log({data});
  };
  const handleOnEduSubmit = handleSubmit(onEduSubmit);

  const showStudModal = () => {
    getCourses();
    setStudModal(true);
  };
  const hideStudModal = () => setStudModal(false);
  const onStudSubmit = (data) => {
    console.log('Student OnStudSubmit');
    console.log({data});
  };
  const handleOnStudSubmit = handleSubmit(onStudSubmit);

  const containerStyle = {
    backgroundColor: `${colors.background}`,
    color: `${colors.text}`,
    padding: 20,
    margin: 10,
    borderRadius: 10,
  };

  const reloadData = () => {
    console.log('reloading...');
    setRefreshing(true);
    dispatch(load());
    getCourses();
    setRefreshing(false);
  };

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

            {user?.course && (
              <>
                <Text>Level: {user?.course?.degree}</Text>

                <Text>Degree: {user?.course?.course_name}</Text>
              </>
            )}

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
                name="cgpa"
                control={control}
                defaultValue={user?.mark?.cgpa.toString() || ''}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_TEN,
                    message: 'must be between 0 & 10',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Current CGPA"
                      placeholder={user?.mark?.cgpa.toString() || ''}
                      keyboardType="decimal-pad"
                      error={!!errors?.cgpa}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.cgpa}>
                      {errors?.cgpa?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                name="backlog"
                control={control}
                defaultValue={user?.mark?.active_backlog.toString() || ''}
                rules={{
                  min: 0,
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Active Backlog"
                      placeholder={user?.mark?.active_backlog.toString() || ''}
                      keyboardType="number-pad"
                      error={!!errors?.backlog}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.backlog}>
                      {errors?.backlog?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                name="history"
                control={control}
                defaultValue={user?.mark?.backlog_history.toString() || ''}
                rules={{
                  min: 0,
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Backlog History"
                      placeholder={user?.mark?.backlog_history.toString() || ''}
                      keyboardType="number-pad"
                      error={!!errors?.history}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.history}>
                      {errors?.history?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Button mode="contained" onPress={handleOnMarkSubmit}>
                Update Marks
              </Button>
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
                name="tenth"
                control={control}
                defaultValue={
                  user?.education?.tenth_percentage.toString() || ''
                }
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Tenth Percentage"
                      placeholder={
                        user?.education?.tenth_percentage.toString() || ''
                      }
                      keyboardType="decimal-pad"
                      error={!!errors?.tenth}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.tenth}>
                      {errors?.tenth?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                name="twelfth"
                control={control}
                defaultValue={
                  user?.education?.twelfth_percentage.toString() || ''
                }
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Twelfth Percentage"
                      placeholder={
                        user?.education?.twelfth_percentage.toString() || ''
                      }
                      keyboardType="decimal-pad"
                      error={!!errors?.twelfth}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.twelfth}>
                      {errors?.twelfth?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Controller
                name="grad"
                control={control}
                defaultValue={user?.education?.grad_percentage.toString() || ''}
                rules={{
                  pattern: {
                    value: validators.ZERO_TO_HUNDRED,
                    message: 'must be between 0 & 100',
                  },
                }}
                render={({onChange, onBlur, value}) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Grad Percentage"
                      placeholder={
                        user?.education?.grad_percentage.toString() || ''
                      }
                      keyboardType="decimal-pad"
                      error={!!errors?.grad}
                      style={styles.formText}
                    />

                    <HelperText type="error" visible={!!errors?.grad}>
                      {errors?.grad?.message}
                    </HelperText>
                  </View>
                )}
              />

              <Button mode="contained" onPress={handleOnEduSubmit}>
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
                    placeholder={{}}
                    value="pg-mca-r"
                    style={{inputAndroid: {color: `${colors.text}`}}}
                  />
                )}
                defaultValue=""
              />

              <Button onPress={handleOnStudSubmit}>Update</Button>
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
  wrapper: {
    marginBottom: 15,
  },
  formText: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});

export default ProfleScreen;
