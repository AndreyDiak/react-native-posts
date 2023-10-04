import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { useFilteredPosts, useViewportUnits } from '../hooks';

export const Header = React.memo(() => {
	const tw = useTailwind();

	const { vw } = useViewportUnits();

	const { updateQuery } = useFilteredPosts();

	const [query, setQuery] = useState('');

	return (
		<View
			style={[
				tw('flex flex-row items-center bg-gray-700 h-[50px] mx-auto'),
				{
					borderRadius: 9,
					minWidth: vw < 5 ? '90%' : '50%',
				},
			]}
		>
			<TextInput
				placeholder="Заголовок или описание..."
				style={tw('flex-1 text-gray-100 px-3 py-2')}
				value={query}
				onChangeText={setQuery}
			/>
			<TouchableOpacity
				style={[
					tw('bg-white py-2 px-3 h-[50px] flex flex-row items-center'),
					{
						borderBottomRightRadius: 8,
						borderTopRightRadius: 8,
					},
				]}
				onPress={() => updateQuery(query.trim())}
			>
				<Text style={tw('text-gray-700 font-bold')}>Начать</Text>
			</TouchableOpacity>
		</View>
	);
});

Header.displayName = 'Header';
