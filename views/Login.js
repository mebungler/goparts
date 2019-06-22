import React, { Component, PropTypes } from "react";
import {
	Image,
	View,
	Dimensions,
	Text,
	KeyboardAvoidingView,
	AsyncStorage
} from "react-native";
import Logo from "../assets/images/logo.png";
import MainIcon from "../assets/images/Main_icon.png";
import Icon from "../services/IconService";
import RoundInput from "../components/RoundInput";
import RoundButton from "../components/RoundButton";
import Feather from "react-native-vector-icons/Feather";
import NavigationService from "../services/NavigationService";
import { CheckBox } from "react-native-elements";
import { loginAsync } from "../actions/thunk";
import { connect } from "react-redux";

class Login extends Component {
	state = {
		status: "idle",
		username: "",
		password: "",
		remember: true,
		error: ""
	};
	login = () => {
		let { username, password } = this.state;
		this.setState({ ...this.state, status: "rotate" });
		this.props.dispatch(
			loginAsync({ username, password }, ({ status, data }) => {
				if (status === 200) {
					console.warn("status success");
					NavigationService.navigate("Categories");
					setTimeout(
						() => this.setState({ ...this.state, status: "idle" }),
						200
					);
				} else {
					console.warn(data);
					this.setState({
						...this.state,
						error: data.message,
						status: "idle"
					});
				}
			})
		);
	};
	render() {
		let { navigation } = this.props;
		return (
			<React.Fragment>
				<KeyboardAvoidingView
					behavior="padding"
					enabled
					style={{ alignItems: "center", flex: 1 }}
				>
					<Image
						source={Logo}
						resizeMode="cover"
						style={{
							width: Dimensions.get("window").width - 60,
							height: 60,
							marginTop: 40
						}}
					/>
					<Image
						source={MainIcon}
						resizeMode="cover"
						style={{
							width: Dimensions.get("window").width - 100,
							height: 140,
							marginTop: 40,
							marginBottom: 0
						}}
					/>
					<RoundInput
						onTextChange={(key, val) =>
							this.setState({
								...this.state,
								[key]: val,
								error: ""
							})
						}
						email
						leftIcon={() => (
							<Icon name="user-thin" size={18} color="#069627" />
						)}
						textContentType="emailAddress"
						placeholder="example@email.com"
						rightIcon={() => (
							<Feather name="x" size={18} color="#fb3838" />
						)}
						successIcon={() => (
							<Feather name="check" size={18} color="#069627" />
						)}
					/>
					<RoundInput
						onTextChange={(key, val) =>
							this.setState({
								...this.state,
								[key]: val,
								error: ""
							})
						}
						password
						leftIcon={() => (
							<Icon name="password-o" size={18} color="#069627" />
						)}
						textContentType="emailAddress"
						placeholder="**********"
						rightIcon={() => (
							<Feather name="x" size={18} color="#fb3838" />
						)}
						successIcon={() => (
							<Feather name="check" size={18} color="#069627" />
						)}
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingTop: 15
						}}
					>
						<CheckBox
							checked={this.state.remember}
							containerStyle={{
								backgroundColor: "white",
								borderWidth: 0,
								padding: 0,
								margin: 0,
								justifyContent: "flex-start"
							}}
							checkedColor="green"
							iconType="material-community"
							checkedIcon="circle-slice-8"
							title="Remember"
							uncheckedIcon="checkbox-blank-circle-outline"
							textStyle={{ color: "black", fontWeight: "400" }}
							onPress={() =>
								this.setState({
									...this.state,
									remember: !this.state.remember
								})
							}
						/>
						<View style={{ justifyContent: "center" }}>
							<Text style={{ color: "black" }}>
								Forgot password?
							</Text>
						</View>
					</View>
					<RoundButton
						status={this.state.status}
						fill
						text="Log in"
						color="#069327"
						animated
						big
						onPress={this.login}
					/>
					{this.state.error !== "" && (
						<Text
							style={{
								color: "red",
								fontSize: 16,
								marginTop: 10
							}}
						>
							{this.state.error}
						</Text>
					)}
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
							alignItems: "center",
							paddingBottom: 30
						}}
					>
						<Text style={{ color: "#c4c4c4" }}>
							Don't have an account yet?
						</Text>
						<Text
							style={{
								textDecorationLine: "underline",
								fontWeight: "bold"
							}}
							onPress={() => {
								navigation.navigate("Register", {});
							}}
						>
							Registration
						</Text>
					</View>
				</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}

let mapStateToProps = state => ({});

export default connect(mapStateToProps)(Login);
