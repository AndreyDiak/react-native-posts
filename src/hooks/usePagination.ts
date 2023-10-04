import { useMemo } from 'react';

interface UsePagination {
	items: number[];
	isLastIndexVisible: boolean;
}

interface Props {
	totalPages: number;
	currentPage: number;
}

const ITEMS_TO_SHOW = 5;
const ITEMS_PER_ROW = 3;

export function usePagination({ totalPages, currentPage }: Props): UsePagination {
	const items = Array(totalPages)
		.fill(null)
		.map((_, index) => index + 1);

	const startIndex =
		currentPage <= ITEMS_PER_ROW
			? 0
			: totalPages - currentPage < ITEMS_PER_ROW
			? totalPages - ITEMS_TO_SHOW
			: currentPage - ITEMS_PER_ROW;

	const shownItems = items.slice(startIndex, startIndex + ITEMS_TO_SHOW);

	const isLastIndexVisible =
		!shownItems.includes(totalPages) && totalPages - currentPage > ITEMS_PER_ROW;

	return useMemo(() => {
		return {
			items: shownItems,
			isLastIndexVisible,
		};
	}, [isLastIndexVisible, shownItems]);
}
