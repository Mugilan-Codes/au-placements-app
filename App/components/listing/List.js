import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: ${({eligible}) => (eligible ? 'green' : 'red')};
  color: ${({eligible}) => (eligible ? 'red' : 'green')};
  /* flex: 1; */
  justify-content: center;
  align-items: center;
`;

// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({title, description, eligible}) => {
  const _onPress = () => {
    // TODO: Open a almost full screen modal to display the Listing in full detail
    console.log('List Pressed, Opening full screen Modal...');
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.container}>
      <StyledView eligible={eligible}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Text>{eligible ? 'Eligible' : 'Not Eligible'}</Text>
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
