import axios from 'axios';

const TOKEN_KEY = 'x-auth-token';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common[TOKEN_KEY] = token;
  } else {
    delete axios.defaults.headers.common[TOKEN_KEY];
  }
};

export default setAuthToken;
