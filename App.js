import React from "react";
import { View } from "react-native";
import { Font, Asset, AppLoading } from "expo";
import NavigationService from "./services/NavigationService";
import AppRouter from "./router/AppRouter";
import logo from "./assets/images/logo.png";
import mainIcon from "./assets/images/Main_icon.png";
import Fontello from "./assets/fonts/fontello.ttf";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import StorageService from "./services/StorageService";
const store = configureStore();

export default class App extends React.Component {
	state = { isLoading: true };
	async componentDidMount() {
		await Font.loadAsync({ fontello: Fontello });
		await Asset.fromModule(logo).downloadAsync();
		await Asset.fromModule(mainIcon).downloadAsync();
		await StorageService.initialize();
		this.setState({ isLoading: false });
	}

	componentWillUnmount() {
		StorageService.saveChanges();
	}

	render() {
		if (this.state.isLoading) {
			return <AppLoading />;
		}
		return (
			<Provider store={store}>
				<AppRouter />
			</Provider>
		);
	}
}
