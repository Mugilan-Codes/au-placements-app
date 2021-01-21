import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';
import styled from 'styled-components/native';

import {useList} from '../../state/providers/listing';

const StyledView = styled.View`
  background-color: ${({eligible}) => (eligible ? 'green' : 'red')};
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-style: italic;
`;

// todo: Make this a separate component, a beautifull card perhaps
// todo: Use Styled Components
// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const Listing = ({title, description, eligible}) => {
  return (
    <StyledView eligible={eligible}>
      <StyledText>{title}</StyledText>
      <StyledText>{description}</StyledText>
    </StyledView>
  );
};

const DashboardScreen = ({navigation}) => {
  const {state, loadListings} = useList();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  // todo: also note and display the last refreshed on time for listings
  const onRefresh = () => {
    setIsRefreshing(true);
    loadListings();
    setIsRefreshing(false);
  };

  // todo: Make the item clickable and display individual listing
  // ? https://reactnavigation.org/docs/params
  const renderItem = ({item}) => (
    <Listing
      title={item.title}
      description={item.description}
      eligible={item.eligible}
    />
  );

  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <FlatList
        data={state.listings}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
