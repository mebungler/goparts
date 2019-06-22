import React from "react";
import { View } from "react-native";
import { Font, Asset } from "expo";
import NavigationService from "./services/NavigationService";
import Router from "./router/AppRouter";
import logo from "./assets/images/logo.png";
import mainIcon from "./assets/images/Main_icon.png";
import Fontello from "./assets/fonts/fontello.ttf";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import StorageService from "./services/StorageService";
const store = configureStore();

export default class App extends React.Component {
	state = { font: false };
	async componentDidMount() {
		await Font.loadAsync({ fontello: Fontello });
		await Asset.fromModule(logo).downloadAsync();
		await Asset.fromModule(mainIcon).downloadAsync();
		this.setState({ font: true });
	}

	componentWillMount() {
		StorageService.initialize();
	}
	componentWillUnmount() {
		StorageService.saveChanges();
	}

	render() {
		if (!this.state.font) return <View />;
		return (
			<Provider store={store}>
				<Router
					ref={navigatorRef => {
						NavigationService.setTopLevelNavigator(navigatorRef);
					}}
				/>
			</Provider>
		);
	}
}
