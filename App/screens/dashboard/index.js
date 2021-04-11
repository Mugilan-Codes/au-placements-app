import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {List, ListSeparator, ScreenHeader} from '../../components';
import {Student} from '../../api';
import {Date} from '../../utils';
import {ViewWithHeight} from './styles';

// TODO: Store listings and lastUpdated values in AsyncStorage for Offline Viewing
const DashboardScreen = () => {
  const [listings, setListings] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    const {data} = await Student.getAllListings();
    const time = Date.getCurrentTime();
    setListings(data);
    setLastUpdated(time);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getListings();
    setIsRefreshing(false);
  };

  // todo: Make the item clickable and display individual listing
  // ? https://reactnavigation.org/docs/params
  const renderItem = ({item}) => (
    // TODO: Pass in ID to display the Listing as a modal
    <List
      id={item.id}
      title={item.title}
      description={item.description}
      company_name={item.company_name}
      start_date={item.start_date}
      eligible={item.eligible}
      updated_on={item.updated_on}
    />
  );

  //? https://www.reddit.com/r/reactnative/comments/g1y0s8/loading_data_from_api_best_practice/

  // TODO: Make a bookmark to save listings
  // TODO: Move the bookmarked listings to top of the flatlist
  //? Learn about Flatlist refreshing and other attributes
  return (
    <>
      <ScreenHeader
        title="Dashboard"
        subText={`Last Updated: ${lastUpdated}`}
      />
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={() => <ViewWithHeight />}
        ListFooterComponent={() => <ViewWithHeight />}
      />
    </>
  );
};

export default DashboardScreen;
