import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {Routes} from '../../config';

const StyledView = styled.View`
  background-color: ${({eligible}) => (eligible ? 'green' : 'red')};
  color: ${({eligible}) => (eligible ? 'red' : 'green')};
  justify-content: center;
  align-items: center;
`;

// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({
  id,
  title,
  description,
  company_name,
  start_date,
  eligible,
  updated_on,
}) => {
  const navigation = useNavigation();

  const _onPress = () => {
    // TODO: Open a almost full screen modal to display the Listing in full detail
    console.log('List Pressed, Opening full screen Modal...');
    navigation.navigate(Routes.MODAL, {id});
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.container}>
      <StyledView eligible={eligible}>
        <Text>Title: {title}</Text>
        <Text>Description: {description}</Text>
        <Text>Company: {company_name}</Text>
        <Text>Start Date: {start_date}</Text>
        {/* <Text>{eligible ? 'Eligible' : 'Not Eligible'}</Text> */}
        <Text>Updated On: {updated_on}</Text>
      </StyledView>
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 6,
    paddingHorizontal: 20,
  },
});
