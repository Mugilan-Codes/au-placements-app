import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.Button`
  background-color: ${({eligible}) => (eligible ? 'green' : 'red')};
  color: ${({eligible}) => {
    eligible ? 'red' : 'green';
  }};
`;

// TODO: Use Styled Components
// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({title, description, eligible}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <StyledButton title="hi" eligible={eligible} />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
