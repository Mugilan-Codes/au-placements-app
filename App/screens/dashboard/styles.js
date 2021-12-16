import styled from 'styled-components/native';

export const ViewWithHeight = styled.View`
  height: ${({height, theme}) => height || theme.specialHeight};
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
`;
