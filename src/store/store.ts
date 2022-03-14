import { configureStore } from "@reduxjs/toolkit";
import { registerClientSlice } from "../store/reducers/RegisterClientSlice";
import { depositSlice } from "../store/reducers/DepositSlice";

export const store = configureStore({
  reducer: {
    registerClient: registerClientSlice.reducer,
    depositSlice: depositSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
