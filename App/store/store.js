import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setAuthToken} from '../config';

import authSlice from './slices/authSlice';
import listingSlice from './slices/listingSlice';
import userSlice from './slices/userSlice';
import courseSlice from './slices/courseSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  listing: listingSlice,
  user: userSlice,
  course: courseSlice,
});

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.accessToken !== currentState.auth.accessToken) {
    console.log('subscribe to store accessToken');
    const token = currentState.auth.accessToken;
    setAuthToken(token);
  }
});
