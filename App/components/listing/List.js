import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled.Button`
  background-color: ${({eligible}) => (eligible ? 'green' : 'red')};
  color: ${({eligible}) => {
    eligible ? 'red' : 'green';
  }};
`;

// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({title, description, eligible}) => {
  const _onPress = () => {
    // TODO: Open a almost full screen modal to display the Listing in full detail
    console.log('List Pressed');
  };

  return (
    <TouchableHighlight onPress={_onPress}>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <StyledButton
          title={eligible ? 'Eligible' : 'Not Eligible'}
          eligible={eligible}
        />
      </View>
    </TouchableHighlight>
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
