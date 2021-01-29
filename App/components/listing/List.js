import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.Button`
  color: ${({eligible}) => (eligible ? 'green' : 'red')};
`;

// todo: Use Styled Components
// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({title, description, eligible}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <StyledButton disabled={true} title="hi" />
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
