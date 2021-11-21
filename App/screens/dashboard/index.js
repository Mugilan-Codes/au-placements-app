import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';

import {List, ListSeparator, ScreenHeader} from '../../components';
import {Student} from '../../api';
import {Date} from '../../utils';
import {ViewWithHeight} from './styles';

// TODO: Store listings and lastUpdated values in AsyncStorage for Offline Viewing
const DashboardScreen = () => {
  const [listings, setListings] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    const {data} = await Student.getAllListings();
    if (data.error) {
      console.log('data error');
    } else {
      setListings(data);
    }
    const time = Date.getCurrentTime();
    setLastUpdated(time);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getListings();
    setIsRefreshing(false);
  };

  // TODO: Style the list empty component
  const _ListEmptyComponent = () => {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };

  // REF: https://reactnavigation.org/docs/params
  const renderItem = ({item}) => {
    return (
      <List
        id={item.id}
        title={item.title}
        company_name={item.company_name}
        start_date={item.start_date}
        eligible={item.eligible}
      />
    );
  };

  // REF: https://www.reddit.com/r/reactnative/comments/g1y0s8/loading_data_from_api_best_practice/

  console.log(listings.length);

  // TODO: Make a bookmark to save listings
  // TODO: Move the bookmarked listings to top of the flatlist
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
        ListEmptyComponent={_ListEmptyComponent}
        ListHeaderComponent={() => <ViewWithHeight />}
        ListFooterComponent={() => <ViewWithHeight />}
      />
    </>
  );
};

export default DashboardScreen;
