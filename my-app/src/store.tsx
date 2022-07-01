import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import collectionReducer from "./features/collections/collectionsSlice";

export const store = configureStore({
  reducer: { auth: authReducer, collection: collectionReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
