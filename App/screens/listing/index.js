import React, {useEffect, useState} from 'react';
import {
  Text,
  Title,
  Chip,
  Button,
  Subheading,
  Headline,
} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import {useReduxDispatch, useReduxSelector} from 'store';
import {
  selectListing,
  fetchOneListing,
  selectLoading,
} from 'store/slices/listingSlice';
import {getDisplayDate} from 'utils/date';
import {Container, Row, StyledParagraph} from './styles';
import {Loading} from 'components';

// TODO: show tick icon for chip if eligible else show cross icon for ineligible criteria chip
// REF: How to close a React-Native Webview? - https://stackoverflow.com/a/46175014/12381908
const ListingScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useReduxDispatch();
  const [isWebView, setIsWebView] = useState(false);

  const listing = useReduxSelector(selectListing);
  const isLoading = useReduxSelector(selectLoading);

  const start_date = getDisplayDate(listing?.start_date);

  useEffect(() => {
    dispatch(fetchOneListing(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isWebView) {
    // return <WebView source={{uri: listing?.application_url}} />;
    // return <WebView source={{uri: 'https://www.google.com/'}} />;
    return (
      <>
        <Button mode="contained" onPress={() => setIsWebView(false)}>
          Close
        </Button>
        <WebView source={{uri: 'https://www.google.com/'}} />
      </>
    );
  }

  return (
    <Container>
      <Headline>{listing?.title}</Headline>
      <Subheading>{listing?.company_name}</Subheading>
      <StyledParagraph>{listing?.description}</StyledParagraph>

      <Title>Start Date: {start_date}</Title>
      <Text>Eligiblity Criteria</Text>
      <Row>
        <Chip>10th: {listing?.tenth_percentage}%</Chip>
        <Chip>12th: {listing?.twelfth_percentage}%</Chip>
        <Chip>Grad: {listing?.grad_percentage}%</Chip>
      </Row>
      <Row>
        <Chip mode="outlined">CGPA: {listing?.cgpa}</Chip>
        <Chip mode="outlined">Backlogs: {listing?.active_backlog}</Chip>
        <Chip mode="outlined">Backlog History: {listing?.backlog_history}</Chip>
      </Row>
      <Button
        mode="contained"
        color={listing?.eligible ? 'green' : 'red'}
        onPress={() => (listing?.eligible ? setIsWebView(true) : null)}>
        {listing?.eligible ? '' : 'Not '}Eligible
      </Button>
    </Container>
  );
};

export default ListingScreen;
