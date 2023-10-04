import { Provider } from 'react-redux';
import { TailwindProvider } from 'tailwind-rn';
import { App } from './src';
import { store } from './src/store';
import utilities from './tailwind.json';

export default function MainApp() {
	return (
		<Provider store={store}>
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore TaiwindProvider Type Defenition... */}
			<TailwindProvider utilities={utilities}>
				<App />
			</TailwindProvider>
		</Provider>
	);
}
