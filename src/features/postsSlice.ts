import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../typings';
import { RootState } from '../store';

export interface PostsState {
	posts: Post[];
}

const initialState: PostsState = {
	posts: [],
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setPosts: (state, action: PayloadAction<Post[]>) => {
			state.posts = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setPosts } = postsSlice.actions;

export const postsSelector = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
