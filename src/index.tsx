import { View } from 'react-native';

import { useTailwind } from 'tailwind-rn';
import { Header } from './components/Header';
import { Posts } from './components/Posts';

export const App = () => {
	const tw = useTailwind();

	return (
		<View style={tw('flex flex-col pt-8 bg-gray-100 w-full h-full')}>
			<Header />
			<Posts />
		</View>
	);
};
