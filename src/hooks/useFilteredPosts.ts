import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector, querySelector, setFilter, setQuery } from '../features/filterSlice';
import { RootState } from '../store';
import { Filter } from '../typings';
import { UsePosts, usePosts } from './usePosts';

interface UseFilteredPosts extends UsePosts {
	filter: Filter | null;
	updateQuery(query: string): void;
	updateFilter(filter: Filter | null): void;
}

export function useFilteredPosts(): UseFilteredPosts {
	const rawQuerySelector = useCallback((state: RootState) => querySelector(state), []);
	const rawFilterSelector = useCallback((state: RootState) => filterSelector(state), []);

	const query = useSelector(rawQuerySelector);
	const filter = useSelector(rawFilterSelector);

	const { posts, currentPage, totalPages, setPage } = usePosts();

	const dispatch = useDispatch();

	const updateQuery = useCallback(
		(query: string) => {
			dispatch(setQuery(query));
		},
		[dispatch],
	);

	const updateFilter = useCallback(
		(filter: Filter | null) => {
			dispatch(setFilter(filter));
		},
		[dispatch],
	);

	return useMemo(() => {
		const filteredPosts =
			query === ''
				? posts
				: posts.filter((post) => {
						return (
							post.title.toLowerCase().includes(query.toLowerCase()) ||
							post.body.toLowerCase().includes(query.toLowerCase())
						);
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  });

		const sortedPosts =
			filter === null
				? filteredPosts
				: filteredPosts.sort((a, b) => {
						if (filter === Filter.ID) return a.id - b.id;
						if (filter === Filter.TITLE) return a.title.localeCompare(b.title);
						if (filter === Filter.BODY) return a.body.localeCompare(b.body);
						return a.id - b.id;
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  });

		return {
			posts: sortedPosts,
			currentPage,
			totalPages,
			filter,
			setPage,
			updateQuery,
			updateFilter,
		};
	}, [currentPage, filter, posts, query, setPage, totalPages, updateFilter, updateQuery]);
}
