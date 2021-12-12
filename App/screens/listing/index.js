import React from 'react';
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

import {useTheme} from 'contexts';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
  padding: 20px;
`;

const Loading = () => <ActivityIndicator animating size="large" />;

const ListingScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {
    theme: {colors},
  } = useTheme();

  console.log('Listing', id);

  return (
    <Container>
      <Title>Listing Title</Title>
      <Subheading>Company Name</Subheading>
      <StyledParagraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti porro
        quam fuga. Distinctio repellat architecto doloribus ipsa adipisci,
        dolore facere nam sit rem dicta beatae eos omnis, amet excepturi eaque!
      </StyledParagraph>
      <Headline>Start Date: 16th Nov, 2021</Headline>
      <Text>Eligiblity Criteria</Text>
      <Row>
        <Chip>10th: 80%</Chip>
        <Chip>12th: 80%</Chip>
        <Chip>Grad: 70%</Chip>
      </Row>
      <Row>
        <Chip mode="outlined">Current CGPA: 8.5</Chip>
        <Chip mode="outlined">Backlogs: 1</Chip>
        <Chip mode="outlined">History of Backlogs: 2</Chip>
      </Row>
      <Button mode="contained" color="green">
        Eligible
      </Button>
    </Container>
  );
};

export default ListingScreen;
