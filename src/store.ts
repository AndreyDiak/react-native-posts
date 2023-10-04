import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './features/postsSlice';
import filterSlice from './features/filterSlice';

export const store = configureStore({
	reducer: {
		posts: postsSlice,
		filter: filterSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
