import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';

import {List, ListSeparator, ScreenHeader} from '../../components';
import {Date} from '../../utils';
import {ViewWithHeight, CenteredView} from './styles';
import {useReduxSelector, useReduxDispatch} from '../../store';
import {
  fetchListings,
  selectListings,
  selectLoading,
  selectError,
} from '../../store/slices/listingSlice';

// TODO: sort by date
const DashboardScreen = () => {
  const [lastUpdated, setLastUpdated] = useState(null);

  const dispatch = useReduxDispatch();
  const listings = useReduxSelector(selectListings);
  const isLoading = useReduxSelector(selectLoading);
  const errorState = useReduxSelector(selectError);

  useEffect(() => {
    getListings();
  }, [getListings]);

  const getListings = useCallback(() => {
    dispatch(fetchListings());

    const time = Date.getCurrentTime();
    setLastUpdated(time);
  }, [dispatch]);

  // TODO: Show a empty state image if there are no listings
  const _ListEmptyComponent = () => {
    return (
      <CenteredView>
        <Text>Empty</Text>
      </CenteredView>
    );
  };

  console.log('errorState', errorState);

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
        onRefresh={getListings}
        refreshing={isLoading}
        ItemSeparatorComponent={ListSeparator}
        ListEmptyComponent={_ListEmptyComponent}
        ListHeaderComponent={() => <ViewWithHeight />}
        ListFooterComponent={() => <ViewWithHeight />}
      />
    </>
  );
};

export default DashboardScreen;
