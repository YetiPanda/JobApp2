import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer } from "../features/jobs/jobsSlice";
import { favoritesReducer } from "../features/favorites/favoritesSlice";
import { 
  persistStore, 
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true
};

const persistedReducer = persistCombineReducers(config, {
  jobs: jobsReducer,
  favorites: favoritesReducer
});

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