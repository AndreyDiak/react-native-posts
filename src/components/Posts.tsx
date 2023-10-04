import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';
import { useTailwind } from 'tailwind-rn';
import { useFilteredPosts } from '../hooks';
import { Filter } from '../typings';
import { Paginator } from './Paginator';

const flexArr = [1, 3, 6];

const headFilterToTitleMap: Record<Filter, string> = {
	[Filter.ID]: 'ID',
	[Filter.TITLE]: 'Заголовок',
	[Filter.BODY]: 'Описание',
};

const borderStyle = {
	borderWidth: 1,
	borderColor: '#C1C0B9',
};

export const Posts = React.memo(() => {
	const {
		posts,
		setPage,
		totalPages,
		currentPage,
		updateFilter,
		filter: currentFilter,
	} = useFilteredPosts();

	const tw = useTailwind();

	const filterPosts = (filter: Filter) => {
		if (filter === currentFilter) {
			updateFilter(null);
			return;
		}
		updateFilter(filter);
	};

	const headElement = (value: Filter) => (
		<TouchableOpacity onPress={() => filterPosts(value)}>
			<View style={tw('flex flex-row justify-center items-center')}>
				<Text style={tw('px-1')}>{value === currentFilter ? '▲' : '▼'}</Text>
				<Text style={tw('text-center py-2')}>{headFilterToTitleMap[value]}</Text>
			</View>
		</TouchableOpacity>
	);

	const tableHead = [headElement(Filter.ID), headElement(Filter.TITLE), headElement(Filter.BODY)];

	return (
		<ScrollView style={tw('relative')}>
			<View style={tw('mt-2 px-1')}>
				<View>
					<Table borderStyle={borderStyle}>
						<Row data={tableHead} flexArr={flexArr} />
					</Table>
					<ScrollView horizontal={false}>
						<Table borderStyle={borderStyle}>
							{posts.map((post) => (
								<Row
									key={post.id}
									data={[post.id, post.title, post.body]}
									flexArr={flexArr}
									textStyle={{ textAlign: 'center' }}
								/>
							))}
						</Table>
					</ScrollView>
				</View>
			</View>
			<Paginator currentPage={currentPage} totalPages={totalPages} setPage={setPage} />
		</ScrollView>
	);
});

Posts.displayName = 'Posts';
