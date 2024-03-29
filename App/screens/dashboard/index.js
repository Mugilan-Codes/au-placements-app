import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Text, Headline} from 'react-native-paper';

import {List, ListSeparator, ScreenHeader} from 'components';
import {getCurrentTime} from 'utils/date';
import {useReduxSelector, useReduxDispatch} from 'store';
import {
  fetchListings,
  selectListings,
  selectLoading,
} from 'store/slices/listingSlice';
import {ViewWithHeight, CenteredView, Container} from './styles';

// TODO: sort by date and disable older listings
const DashboardScreen = () => {
  const [lastUpdated, setLastUpdated] = useState(null);

  const dispatch = useReduxDispatch();
  const listings = useReduxSelector(selectListings);
  const isLoading = useReduxSelector(selectLoading);

  useEffect(() => {
    getListings();
  }, [getListings]);

  const getListings = useCallback(() => {
    dispatch(fetchListings());

    const time = getCurrentTime();
    setLastUpdated(time);
  }, [dispatch]);

  const _ListEmptyComponent = () => {
    return (
      <CenteredView>
        <Headline>No listings found</Headline>
        <Text>Try Again</Text>
      </CenteredView>
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

  const contentContainerStyle = {flexGrow: 1};

  // TODO: Make a bookmark to save listings
  // TODO: Move the bookmarked listings to top of the flatlist
  return (
    <Container>
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
        contentContainerStyle={contentContainerStyle}
      />
    </Container>
  );
};

export default DashboardScreen;
