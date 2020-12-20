import AsyncStorage from '@react-native-async-storage/async-storage';

//! Set this properly
const storage = {
  setString: async (value) => {
    try {
      await AsyncStorage.setItem('@storage_key', value);
    } catch (e) {
      console.log(e);
    }
  },
  setObject: async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_key', jsonValue);
    } catch (e) {
      console.log(e);
    }
  },
  getString: async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  },
  getObject: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  },
  removeItem: async () => {
    try {
      await AsyncStorage.removeItem('@MyApp_key');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
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
