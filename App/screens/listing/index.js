import React, {useEffect} from 'react';
import {
  Text,
  Title,
  Chip,
  Button,
  Subheading,
  Headline,
} from 'react-native-paper';

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
// TODO: provide link for appication and open it in webview if eligible
const ListingScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useReduxDispatch();

  const listing = useReduxSelector(selectListing);
  const isLoading = useReduxSelector(selectLoading);

  const start_date = getDisplayDate(listing?.start_date);

  useEffect(() => {
    dispatch(fetchOneListing(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <Title>{listing?.title}</Title> */}
      <Headline>{listing?.title}</Headline>
      <Subheading>{listing?.company_name}</Subheading>
      <StyledParagraph>{listing?.description}</StyledParagraph>

      {/* <Headline>Start Date: {start_date}</Headline> */}
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
      <Button mode="contained" color={listing?.eligible ? 'green' : 'red'}>
        {listing?.eligible ? '' : 'Not '}Eligible
      </Button>
    </Container>
  );
};

export default ListingScreen;
