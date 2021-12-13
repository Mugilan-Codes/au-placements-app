import styled from 'styled-components/native';
import {Paragraph} from 'react-native-paper';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  flex-wrap: wrap;
`;

export const StyledParagraph = styled(Paragraph)`
  text-align: justify;
  padding: 20px;
`;
