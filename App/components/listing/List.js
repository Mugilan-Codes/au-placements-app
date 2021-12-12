import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Card, Paragraph, Avatar} from 'react-native-paper';
import {format} from 'date-fns';

import {Routes} from 'constants/routes';

const StyledView = styled.View`
  flex: 1;
`;

const Container = styled(TouchableOpacity)`
  margin: 10px;
  border-radius: 6px;
  padding: 0 20px;
  /* flex: 1; */
`;

const CheckIcon = (props) => (
  <Avatar.Icon {...props} size={30} icon="check" style={styles.check} />
);
const CloseIcon = (props) => (
  <Avatar.Icon {...props} size={30} icon="close" style={styles.close} />
);

// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({id, title, company_name, start_date, eligible}) => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.navigate(Routes.LISTING, {id});
  };

  const dt = new Date(start_date);
  const formatDate = format(dt, 'MMMM do, yyyy');

  return (
    <Container onPress={_onPress}>
      {/* <StyledView> */}
      <Card>
        <Card.Title
          title={title}
          subtitle={formatDate}
          right={() => (eligible ? <CheckIcon /> : <CloseIcon />)}
        />

        <Card.Content>
          <Paragraph>{company_name}</Paragraph>
        </Card.Content>
      </Card>
      {/* </StyledView> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  check: {
    backgroundColor: 'green',
  },
  close: {
    backgroundColor: 'red',
  },
});

export default List;
