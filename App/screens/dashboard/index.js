import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';

import {useList} from '../../state/providers/listing';

// todo: Make this a separate component, a beautifull card perhaps
// todo: Use Styled Components
// id, title, description, company_name, start_date, tenth_percentage, twelfth_percentage, grad_percentage, cgpa, active_backlog, backlog_history, created_on, updated_on
const Listing = ({title, description, eligible}) => {
  return (
    <View style={{backgroundColor: eligible ? 'red' : 'green'}}>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
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
    <SafeAreaView style={{flex: 1}}>
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
