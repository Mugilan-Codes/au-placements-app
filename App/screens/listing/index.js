import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  Text,
  Title,
  Chip,
  Button,
  Paragraph,
  Subheading,
  Headline,
  ActivityIndicator,
} from 'react-native-paper';

// import {useTheme} from 'contexts';
import {useReduxDispatch, useReduxSelector} from 'store';
import {
  selectListing,
  fetchOneListing,
  selectLoading,
} from 'store/slices/listingSlice';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* margin: 10px; */
  flex-wrap: wrap;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
  padding: 20px;
`;

const Loading = () => <ActivityIndicator animating size="large" />;

// TODO: show tick icon for chip if eligible else show cross icon for ineligible criteria chip
// TODO: provide link for appication and open it in webview
const ListingScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useReduxDispatch();
  // const {
  //   theme: {colors},
  // } = useTheme();

  const listing = useReduxSelector(selectListing);
  const isLoading = useReduxSelector(selectLoading);

  console.log('Listing id', id);
  console.log('Listing', listing);
  console.log('isLoading', isLoading);

  useEffect(() => {
    dispatch(fetchOneListing(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>{listing?.title}</Title>
      <Subheading>{listing?.company_name}</Subheading>
      <StyledParagraph>{listing?.description}</StyledParagraph>
      <Headline>Start Date: 16th Nov, 2021</Headline>
      <Text>Eligiblity Criteria</Text>
      <Row>
        <Chip>10th: {listing?.tenth_percentage}%</Chip>
        <Chip>12th: {listing?.twelfth_percentage}%</Chip>
        <Chip>Grad: {listing?.grad_percentage}%</Chip>
      </Row>
      <Row>
        <Chip mode="outlined">CGPA: {listing?.cgpa}</Chip>
        <Chip mode="outlined">Active Backlogs: {listing?.active_backlog}</Chip>
        <Chip mode="outlined">Backlog History: {listing?.backlog_history}</Chip>
      </Row>
      <Button mode="contained" color={listing?.eligible ? 'green' : 'red'}>
        {listing?.eligible ? '' : 'Not '}Eligible
      </Button>
    </Container>
  );
};

export default ListingScreen;
