import {configureStore} from "@reduxjs/toolkit"
import FeedReducer from "../Features/FeedsSlice/FeedSlice"
import UserReducers from "../Features/UserSlice/UserSlice"
import {UserApi} from "../Api/UserApi/UserApi"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist/es/constants";

  const authPersistConfig = {
    key: "user",
    storage,
  };
  
  const persistedUserReducer = persistReducer(authPersistConfig, UserReducers);
  

const Store = configureStore({
    reducer:{
        FeedReducer : FeedReducer,
        UserReducers: persistedUserReducer,
        [UserApi.reducerPath] : UserApi.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(UserApi.middleware)
})

export const persistor = persistStore(Store);

export default Store