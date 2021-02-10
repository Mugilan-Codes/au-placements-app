import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';

import {useList} from '../../state/providers/listing';
import {List, ListSeparator} from '../../components';

const DashboardScreen = () => {
  // ! Listings call to API must happen here.
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
    // TODO: Pass in ID to display the Listing as a modal
    <List
      title={item.title}
      description={item.description}
      eligible={item.eligible}
    />
  );

  //? https://www.reddit.com/r/reactnative/comments/g1y0s8/loading_data_from_api_best_practice/

  // TODO: Make a bookmark to save listings
  // TODO: Move the bookmarked listings to top of the flatlist
  //? Learn about Flatlist refreshing and other attributes
  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <FlatList
        data={state.listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ItemSeparatorComponent={ListSeparator}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
