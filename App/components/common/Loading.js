import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loading = ({size, color}) => {
  return (
    <Container>
      <ActivityIndicator animating size={size} color={color} />
    </Container>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
  // color: '#6646ee',
  color: Colors.purpleA700,
};

export default Loading;
