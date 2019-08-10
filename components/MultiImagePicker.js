import React, { Component } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableWithoutFeedback,
	Image
} from "react-native";
import { ImagePicker, Permissions, Constants } from "expo";
import Icon from "../services/IconService";

class MultiImagePicker extends Component {
	componentDidMount() {
		this.getPermissionAsync();
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

	render() {
		let {
			photos,
			add = () => {},
			remove = () => {},
			segmentIndex,
			single
		} = this.props;
		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 30 }}
				style={{ padding: 15, paddingTop: 0, paddingBottom: 0 }}
			>
				{photos.map((e, i) => {
					return (
						<View
							style={{
								margin: 15,
								marginLeft: 2.5,
								marginRight: 2.5
							}}
						>
							<Image
								source={{ uri: e }}
								style={{
									width: 100,
									height: 100,
									borderRadius: 20
								}}
							/>
							<View
								style={{
									justifyContent: "flex-start",
									alignItems: "flex-end",
									padding: 5,
									marginTop: -105
								}}
							>
								<TouchableWithoutFeedback
									onPress={() => {
										if (single) {
											remove(i);
											return;
										}
										remove(segmentIndex, i);
									}}
								>
									<Icon name="cancel" size={25} color="red" />
								</TouchableWithoutFeedback>
							</View>
						</View>
					);
				})}
				<TouchableWithoutFeedback
					onPress={async () => {
						let result = await ImagePicker.launchImageLibraryAsync({
							mediaTypes: ImagePicker.MediaTypeOptions.Images,
							allowsEditing: true
						});
						if (!result.cancelled) {
							if (single) {
								add(result.uri);
								return;
							}
							add(segmentIndex, result.uri);
						}
					}}
				>
					<View
						style={{
							height: 100,
							width: 100,
							borderRadius: 20,
							borderStyle: "dashed",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#f7f7f7",
							borderWidth: 1,
							margin: 15,
							marginLeft: 2.5,
							marginRight: 2.5,
							borderColor: "#d7d7d7"
						}}
					>
						<Icon name="changephoto" color="#d7d7d7" size={30} />
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		);
	}
}

export default MultiImagePicker;
