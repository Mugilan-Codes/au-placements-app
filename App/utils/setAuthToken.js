import axios from 'axios';

const TOKEN_KEY = 'x-auth-token';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common[TOKEN_KEY] = token;
    console.log('AuthToken is set');
  } else {
    delete axios.defaults.headers.common[TOKEN_KEY];
    console.log('AuthToken is removed');
  }
};

export default setAuthToken;
