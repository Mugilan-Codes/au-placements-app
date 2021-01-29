import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';

import {useList} from '../../state/providers/listing';
import {List} from '../../components';

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
    <List
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
