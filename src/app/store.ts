import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from '@/services/states/auth-slice';
import threadReducer from '@/services/states/thread-slice';
import userReducer from '@/services/states/user-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    user: userReducer,
    loadingBar: loadingBarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
