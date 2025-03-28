import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import {
  authenticationSlice,
  authenticationService,
} from "../feature/authentication";
import { pressReleaseApi } from "../feature/services/api/pressRelease.service";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  [authenticationSlice.name]: authenticationSlice.reducer,
  [authenticationService.reducerPath]: authenticationService.reducer,
  [pressReleaseApi.reducerPath]: pressReleaseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authenticationService.middleware, pressReleaseApi.middleware),
});

export default store;

export const persistor = persistStore(store);
