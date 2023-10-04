import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn';
import { usePagination, useViewportUnits } from '../hooks';

interface Props {
	totalPages: number;
	currentPage: number;
	setPage(page: number): void;
}

type ArrowType = 'prev' | 'next';

const arrowMap: Record<
	ArrowType,
	{
		mobile: string;
		desktop: string;
	}
> = {
	prev: { mobile: '<', desktop: 'Предыдущая' },
	next: { mobile: '>', desktop: 'Следующая' },
};

export const Paginator: React.FC<Props> = React.memo(
	({ setPage, totalPages, currentPage }: Props) => {
		const tw = useTailwind();

		const { isLastIndexVisible, items } = usePagination({ totalPages, currentPage });

		const { vw } = useViewportUnits();

		const isMoblie = vw < 5;

		const arrowElement = (type: ArrowType) => {
			if (
				(type === 'prev' && currentPage === 1) ||
				(type === 'next' && currentPage === totalPages)
			) {
				return null;
			}

			return (
				<TouchableOpacity
					onPress={() => setPage(type === 'next' ? currentPage + 1 : currentPage - 1)}
				>
					<Text style={tw('text-center py-2')}>
						{arrowMap[type][isMoblie ? 'mobile' : 'desktop']}
					</Text>
				</TouchableOpacity>
			);
		};

		const paginatorElement = (item: number) => (
			<TouchableOpacity
				key={item}
				onPress={() => setPage(item)}
				style={tw(`p-2 w-[45px] h-[45px] flex items-center justify-center text-red-400`)}
			>
				<Text
					style={tw(
						`font-semibold text-lg ${item === currentPage ? 'text-red-400' : 'text-black'}`,
					)}
				>
					{item}
				</Text>
			</TouchableOpacity>
		);

		const renderLast = () => {
			if (!isLastIndexVisible) {
				return null;
			}

			return (
				<>
					<Text>. . .</Text>
					{paginatorElement(10)}
				</>
			);
		};

		return (
			<View style={tw('w-full flex justify-center')}>
				<View style={tw('flex flex-row mx-auto items-center')}>
					{arrowElement('prev')}
					{items.map((item) => paginatorElement(item))}
					{renderLast()}
					{arrowElement('next')}
				</View>
			</View>
		);
	},
);

Paginator.displayName = 'Paginator';
