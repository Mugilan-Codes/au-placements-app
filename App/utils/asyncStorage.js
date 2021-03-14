import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@';

const ACCESS_TOKEN = `${KEY}access_token`;
const REFRESH_TOKEN = `${KEY}refresh_token`;
const STUDENT_INFO = `${KEY}student_info`;

// TODO: Make this clean.
//! Set this properly
const storage = {
  accessToken: {
    set: async (token) => {
      try {
        await AsyncStorage.setItem(`${ACCESS_TOKEN}`, token);
      } catch (e) {
        console.log(e);
      }
    },
    get: async () => {
      try {
        const value = await AsyncStorage.getItem(`${ACCESS_TOKEN}`);
        if (value !== null) {
          return value;
        }
      } catch (e) {
        console.log(e);
      }
    },
    remove: async () => {
      try {
        const value = await AsyncStorage.getItem(`${ACCESS_TOKEN}`);
        if (value !== null) {
          await AsyncStorage.removeItem(`${ACCESS_TOKEN}`);
          console.log(`Removed ${ACCESS_TOKEN} from AsyncStorage`);
        }
        console.log(`No ${ACCESS_TOKEN} in AsyncStorage`);
      } catch (e) {
        console.log(`Error in removing ${ACCESS_TOKEN} from AsyncStorage =`, e);
      }
    },
  },
  refreshToken: {
    set: async (token) => {
      try {
        await AsyncStorage.setItem(`${REFRESH_TOKEN}`, token);
      } catch (e) {
        console.log(e);
      }
    },
    get: async () => {
      try {
        const value = await AsyncStorage.getItem(`${REFRESH_TOKEN}`);
        if (value !== null) {
          return value;
        }
      } catch (e) {
        console.log(e);
      }
    },
    remove: async () => {
      try {
        const value = await AsyncStorage.getItem(`${REFRESH_TOKEN}`);
        if (value !== null) {
          await AsyncStorage.removeItem(`${REFRESH_TOKEN}`);
          console.log(`Removed ${REFRESH_TOKEN} from AsyncStorage`);
        }
        console.log(`No ${REFRESH_TOKEN} in AsyncStorage`);
      } catch (e) {
        console.log(
          `Error in removing ${REFRESH_TOKEN} from AsyncStorage =`,
          e,
        );
      }
    },
  },
  studentInfo: {
    set: async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`${STUDENT_INFO}`, jsonValue);
      } catch (e) {
        console.log(e);
      }
    },
    get: async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(`${STUDENT_INFO}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    },
    remove: async () => {
      try {
        await AsyncStorage.removeItem(`${STUDENT_INFO}`);
      } catch (e) {
        console.log(e);
      }

      console.log(`Removed ${STUDENT_INFO} from AsyncStorage`);
    },
  },
  getAllKeys: async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(keys);
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  },
  getMultiple: async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key']);
    } catch (e) {
      // read error
    }
    console.log(values);

    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  },

  setMultiple: async () => {
    const firstPair = ['@MyApp_user', 'value_1'];
    const secondPair = ['@MyApp_key', 'value_2'];
    try {
      await AsyncStorage.multiSet([firstPair, secondPair]);
    } catch (e) {
      //save error
    }

    console.log('Done.');
  },
  removeFew: async () => {
    const keys = ['@MyApp_USER_1', '@MyApp_USER_2'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      // remove error
    }

    console.log('Done');
  },
};

export default storage;
