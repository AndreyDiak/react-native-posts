import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector, setPosts } from '../features/postsSlice';
import { RootState } from '../store';
import { Post } from '../typings';

export interface UsePosts {
	posts: Post[];
	currentPage: number;
	totalPages: number;
	setPage(pageIndex: number): void;
}
// кол-во отоброжаемых постов на странице
const PAGINATION_COUNT = 10;

export function usePosts(): UsePosts {
	const rawPostsSelector = useCallback((state: RootState) => postsSelector(state), []);
	const rawPosts = useSelector(rawPostsSelector);

	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = useMemo(
		() => Math.ceil(rawPosts.length / PAGINATION_COUNT),
		[rawPosts.length],
	);

	const getPostsData = useCallback(async () => {
		const posts: Post[] = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
			res.json(),
		);
		if (posts.length === 0) return;
		dispatch(setPosts(posts));
	}, [dispatch]);

	useEffect(() => {
		// Первичная загрузка данных
		if (rawPosts.length !== 0) return;
		getPostsData();
	}, [getPostsData, rawPosts.length]);

	return useMemo(() => {
		const paginationIndex = (currentPage - 1) * PAGINATION_COUNT;

		const posts = rawPosts.slice(paginationIndex, paginationIndex + PAGINATION_COUNT);

		return {
			posts,
			totalPages,
			currentPage,
			setPage: setCurrentPage,
		};
	}, [currentPage, rawPosts, totalPages]);
}
