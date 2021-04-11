import styled from 'styled-components/native';

export const ViewWithHeight = styled.View`
  height: ${({height, theme}) => height || theme.specialHeight};
`;
