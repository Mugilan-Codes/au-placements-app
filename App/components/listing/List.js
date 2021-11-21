import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Card, Paragraph, Avatar} from 'react-native-paper';
import {format} from 'date-fns';

import {Routes} from '../../config';

const StyledView = styled.View`
  /* background-color: ${({eligible}) => (eligible ? 'green' : 'red')}; */
  /* color: ${({eligible}) => (eligible ? 'red' : 'green')}; */
  flex: 1;
`;

const Container = styled(TouchableOpacity)`
  margin: 10px;
  border-radius: 6px;
  padding: 0 20px;
`;

const CheckIcon = (props) => <Avatar.Icon {...props} size={24} icon="check" />;
const CloseIcon = (props) => <Avatar.Icon {...props} size={24} icon="close" />;

// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const List = ({id, title, company_name, start_date, eligible}) => {
  const navigation = useNavigation();

  const _onPress = () => {
    // TODO: Open a almost full screen modal to display the Listing in full detail
    console.log('List Pressed, Opening full screen Modal...');
    navigation.navigate(Routes.MODAL, {id});
  };

  const dt = new Date(start_date);
  const formatDate = format(dt, 'MMMM do, yyyy');

  return (
    <Container onPress={_onPress}>
      <StyledView>
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
      </StyledView>
    </Container>
  );
};

export default List;
