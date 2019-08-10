import React, { Component, PropTypes } from "react";
import {
	View,
	ScrollView,
	Image,
	Text,
	TouchableWithoutFeedback
} from "react-native";
import Header from "../components/Header";
import Icon from "../services/IconService";
import DefaultText from "../components/DefaultText";
import { FontAwesome as FIcon } from "react-native-vector-icons";
import { CheckBox } from "react-native-elements";
import RoundButton from "../components/RoundButton";
import { connect } from "react-redux";
import NavigationService from "../services/NavigationService";
import api, { urlResolve } from "../api/api";
import { ImagePicker, Permissions, Constants } from "expo";
import { userLoggedIn, userLoggedOut } from "../actions/actions";
import StorageService from "../services/StorageService";

// import ImagePicker from "react-native-image-picker";

const AccountInfo = ({ user: parent, changePhoto, isEditing, logout }) => {
	let { user } = parent;
	return (
		<ScrollView style={{ backgroundColor: "transparent" }}>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: 30
				}}
			>
				<View>
					<View
						style={{
							borderWidth: 4,
							borderColor: "white",
							borderRadius: 60,
							justifyContent: "center",
							alignItems: "center",
							overflow: "hidden",
							backgroundColor: "#afafaf",
							marginTop: 15
						}}
					>
						<Image
							source={{
								uri:
									user && user.avatar
										? urlResolve(user.avatar)
										: ""
							}}
							style={{
								height: 100,
								width: 100,
								overflow: "hidden"
							}}
						/>
					</View>
					<View
						style={{
							justifyContent: "flex-end",
							alignItems: "flex-end"
						}}
					>
						<TouchableWithoutFeedback
							onPress={() => changePhoto(user)}
						>
							<View
								style={{
									height: 30,
									width: 30,
									borderRadius: 15,
									backgroundColor: "#fc2828",
									justifyContent: "center",
									alignItems: "center",
									marginTop: -30,
									marginRight: 10
								}}
							>
								<Icon name="changephoto" color="white" />
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
				<Text
					style={{
						marginTop: 15,
						fontWeight: "bold",
						fontSize: 18
					}}
				>
					{user.username}
				</Text>
				<View style={{ flexDirection: "row", padding: 15 }}>
					<DefaultText
						style={{ flex: 1 }}
						text={user.location}
						name="City"
						icon={() => (
							<Icon name="location" size={28} color="#c4c4c4" />
						)}
					/>
					<DefaultText
						style={{ flex: 1 }}
						text={user.phone}
						name="Phone"
						icon={() => (
							<Icon name="phone-1" size={28} color="#c4c4c4" />
						)}
					/>
				</View>
				<View
					style={{
						borderRadius: 20,
						backgroundColor: "white",
						shodowColor: "#c4c4c4",
						shadowOpacity: 0.33,
						shadowRadius: 5,
						padding: 30,
						right: 0,
						left: 0,
						marginBottom: 30
					}}
				>
					<DefaultText
						editable
						text={user.email}
						name="Email/Login"
						icon={() => (
							<Icon name="e-mail" size={20} color="#c4c4c4" />
						)}
						editIcon={() => (
							<Icon name="penciledit" size={18} color="#c4c4c4" />
						)}
					/>
					<DefaultText
						editable
						text={user.password}
						name="Password"
						icon={() => (
							<Icon name="password" size={28} color="#c4c4c4" />
						)}
						editIcon={() => (
							<Icon name="penciledit" size={18} color="#c4c4c4" />
						)}
					/>
					{user.user_role === 1 && (
						<DefaultText
							editable
							text={user.legal_info}
							name="Organization"
							icon={() => (
								<Icon
									name="organization"
									size={20}
									color="#c4c4c4"
								/>
							)}
							editIcon={() => (
								<Icon
									name="penciledit"
									size={18}
									color="#c4c4c4"
								/>
							)}
						/>
					)}
				</View>
				{isEditing && (
					<View style={{ flexDirection: "row", marginBottom: 30 }}>
						<RoundButton color="#069327" text="Save Profile" />
					</View>
				)}
				<RoundButton
					big
					fill
					animated
					color="#069327"
					text="Logout"
					onPress={() => logout()}
				/>
			</View>
		</ScrollView>
	);
};

let UnauthorizedScreen = () => {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<RoundButton
				large
				big
				fill
				color="#069327"
				text="Sign in"
				onPress={() => NavigationService.navigate("Login")}
			/>
			<Text style={{ color: "#afafaf", fontSize: 18, margin: 15 }}>
				Or
			</Text>
			<RoundButton
				large
				big
				fill
				color="#069327"
				text="Sign up"
				onPress={() => NavigationService.navigate("Register")}
			/>
		</View>
	);
};

class Account extends Component {
	state = { isEditing: false };
	renderContent = () => {
		let { isAuthenticated, user } = this.props;
		let { isEditing } = this.state;
		let { changePhoto } = this;
		if (!isAuthenticated) {
			return <UnauthorizedScreen />;
		}
		return (
			<AccountInfo
				{...{
					user,
					changePhoto,
					isEditing,
					logout: () => this.props.dispatch(userLoggedOut())
				}}
			/>
		);
	};

	componentDidMount() {
		this.getPermissionAsync();
		// api.user.getInfo().then(res => {
		// 	let { user: parent } = this.props;
		// 	console.warn(res.data);
		// 	this.props.dispatch(
		// 		userLoggedIn({
		// 			...res.data,
		// 			user: { ...res.data.user, password: parent.user.password },
		// 			token: parent.token
		// 		})
		// 	);
		// });
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA_ROLL
			);
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
			}
		}
	};

	changePhoto = async user => {
		this.setState({ ...this.state, isEditing: true });
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			base64: true
		});
		if (!result.canceled) {
			this.props.dispatch(
				userLoggedIn({ ...user, avatar: result.base64 })
			);
		}
	};

	render() {
		return <React.Fragment>{this.renderContent()}</React.Fragment>;
	}
}

const mapStateToProps = ({ user }) => {
	let usr = user;
	if (Object.keys(user).length === 0) {
		usr = StorageService.getState();
		if (
			usr === null ||
			usr === "" ||
			usr === undefined ||
			Object.keys(usr).length === 0
		)
			return {
				isAuthenticated: false,
				user: {}
			};
	}
	return {
		isAuthenticated: true,
		user: usr
	};
};

export default connect(mapStateToProps)(Account);

export { UnauthorizedScreen };

/*<View>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 18,
							marginTop: 30,
							marginBottom: 15
						}}
					>
						Social links
					</Text>
					<Text style={{ fontWeight: "100", marginBottom: 30 }}>
						Add your social links and use them to log in
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 30
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<FIcon
							style={{ margin: 5 }}
							size={24}
							name="facebook-square"
						/>
						<FIcon
							style={{ margin: 5 }}
							size={24}
							name="google-plus-square"
						/>
						<FIcon
							style={{ margin: 5 }}
							size={24}
							name="twitter-square"
						/>
					</View>
					<View style={{ justifyContent: "center" }}>
						<CheckBox
							containerStyle={{
								backgroundColor: "white",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							iconType="feather"
							checkedIcon="check"
							title="Recieve email notifications"
							uncheckedIcon="circle"
							textStyle={{
								color: "black",
								fontWeight: "100",
								width: 120,
								fontSize: 12,
								lineHeight: 12,
								marginTop: 6
							}}
						/>
					</View>
				</View>*/
