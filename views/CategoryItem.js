import React, { PropTypes } from "react";
import { Card } from "react-native-elements";
import {
	View,
	Image,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from "react-native";
import Icon from "../services/IconService";
import RoundButton from "../components/RoundButton";
import NavigationService from "../services/NavigationService";
import { urlResolve } from "../api/api";

const CategoryItem = ({ item, horizontal, onCartPress }) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				NavigationService.navigate("Product", { item });
			}}
		>
			<Card
				containerStyle={[
					{
						borderRadius: 20,
						overflow: "hidden",
						marginBottom: 5,
						borderWidth: 1,
						shodowColor: "black",
						shadowOpacity: 0.33,
						shadowOffset: { width: 5, height: 5 },
						backgroundColor: "white",
						elevation: 2
					},
					horizontal
						? {
								width: Dimensions.get("window").width - 45,
								marginBottom: 30,
								marginRight: 0
						  }
						: {}
				]}
			>
				<React.Fragment>
					<View style={{ flexDirection: "row" }}>
						<Image
							resizeMode="cover"
							style={{ height: 100, width: 100 }}
							source={{ uri: urlResolve(item.image) }}
						/>
						<View style={{ flex: 1, padding: 15 }}>
							<Text
								style={{
									textDecorationLine: "underline",
									color: "#cccccc",
									fontSize: 16,
									marginTop: -15,
									marginBottom: 15
								}}
							>
								{item.car_vendor}
							</Text>
							<Text
								numberOfLines={3}
								style={{ fontWeight: "bold", fontSize: 18 }}
							>
								{item.name}
							</Text>
						</View>
						<Icon name="favorites" size={25} color="#cccccc" />
					</View>
					<View
						style={{
							flexDirection: "row",
							flex: 1
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start"
							}}
						>
							<Text
								style={{
									color: "#01a629",
									fontWeight: "bold",
									fontSize: 18
								}}
							>
								{item.purchase_price}
							</Text>
							<Text style={{ fontWeight: "100", fontSize: 18 }}>
								AED
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "flex-end",
								flex: 1
							}}
						>
							<RoundButton
								text="Buy now"
								color="#fe0000"
								onPress={() =>
									NavigationService.navigate("Cart", {
										item
									})
								}
							/>
							<RoundButton
								style={{ marginLeft: 15 }}
								color="#01a529"
								fill
								icon={() => (
									<Icon
										name="shoppingcart"
										size={18}
										color="white"
									/>
								)}
							/>
						</View>
					</View>
				</React.Fragment>
			</Card>
		</TouchableWithoutFeedback>
	);
};

export default CategoryItem;
