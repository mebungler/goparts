import React, { Component, PropTypes } from "react";
import { FlatList, ScrollView, View, Text } from "react-native";
import Header from "../components/Header";
import CartItem from "./CartItem";
import RoundButton from "../components/RoundButton";
import { Feather } from "react-native-vector-icons";
import InlinePicker from "../components/InlinePicker";
import Icon from "../services/IconService";
import { connect } from "react-redux";

class Cart extends Component {
	data = [
		{
			id: 0,
			parent: "Nissan",
			name: "Rear Light Right Side of Nissan Murano 2009",
			price: 2555,
			priceTag: "AED",
			quantity: 5,
			photo:
				"https://i.pinimg.com/736x/d2/11/9a/d2119a56b971883195ea195065b9817d--brown-car-parts.jpg"
		},
		{
			id: 1,
			parent: "Nissan",
			name: "Rear Light Right Side of Nissan Murano 2009",
			price: 2555,
			priceTag: "AED",
			quantity: 5,
			photo:
				"https://t2.ftcdn.net/jpg/01/68/00/21/400_F_168002167_OTMRs2ap2YUqd5jxPNW0E34KOsFMC2tR.jpg"
		},
		{
			id: 2,
			parent: "Nissan",
			name: "Rear Light Right Side of Nissan Murano 2009",
			price: 2555,
			priceTag: "AED",
			quantity: 5,
			photo:
				"https://t2.ftcdn.net/jpg/01/68/00/21/400_F_168002167_OTMRs2ap2YUqd5jxPNW0E34KOsFMC2tR.jpg"
		},
		{
			id: 3,
			parent: "Nissan",
			name: "Rear Light Right Side of Nissan Murano 2009",
			price: 2555,
			priceTag: "AED",
			quantity: 5,
			photo:
				"https://t2.ftcdn.net/jpg/01/68/00/21/400_F_168002167_OTMRs2ap2YUqd5jxPNW0E34KOsFMC2tR.jpg"
		}
	];

	render() {
		return (
			<React.Fragment>
				<ScrollView showsVerticalScrollIndicator={false}>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={this.data}
						renderItem={CartItem}
						keyExtractor={el => el.id.toString()}
					/>
					<View
						style={{
							flexDirection: "row",
							padding: 15,
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<RoundButton
							medium
							big
							thin
							color="#c4c4c4"
							text="Back to shop"
							left
							icon={() => (
								<Feather
									style={{ marginRight: 5 }}
									color="#c4c4c4"
									name="arrow-left"
									size={18}
								/>
							)}
						/>
						<RoundButton
							medium
							big
							color="red"
							text="Clear selected"
							icon={() => (
								<Feather
									color="red"
									size={18}
									name="x-circle"
								/>
							)}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							padding: 15,
							flexWrap: "wrap"
						}}
					>
						<Text
							style={{
								fontWeight: "100",
								color: "#c4c4c4",
								fontSize: 16
							}}
						>
							By clicking on Checkout you
						</Text>
						<Text
							style={{
								fontWeight: "bold",
								color: "red",
								fontSize: 16
							}}
						>
							{" "}
							confirm{" "}
						</Text>
						<Text
							style={{
								fontWeight: "100",
								color: "#c4c4c4",
								fontSize: 16
							}}
						>
							the offer and
						</Text>
						<Text
							style={{
								fontWeight: "bold",
								color: "red",
								fontSize: 16
							}}
						>
							{" "}
							privacy policy{" "}
						</Text>
					</View>
					<View
						style={{
							backgroundColor: "#f5f5f5",
							borderRadius: 30,
							padding: 15,
							margin: 15
						}}
					>
						<View
							style={{
								flexDirection: "row",
								marginBottom: 30,
								margin: 15,
								marginLeft: 0,
								justifyContent: "space-between",
								alignItems: "center"
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 30 }}>
								Payment
							</Text>
							<RoundButton
								large
								text="Recount"
								bold
								color="red"
								big
							/>
						</View>
						<View
							style={{
								flex: 1,
								borderBottomWidth: 1,
								borderColor: "#c4c4c4",
								paddingBottom: 15,
								marginTop: 15,
								flexDirection: "row"
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								Subtotal
							</Text>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-end"
								}}
							>
								<Text
									style={{
										color: "#01a629",
										fontWeight: "bold",
										fontSize: 22
									}}
								>
									39999
								</Text>
								<Text
									style={{ fontWeight: "100", fontSize: 18 }}
								>
									AED
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginTop: 15,
								marginBottom: 15
							}}
						>
							<Text style={{ marginRight: 10, fontSize: 18 }}>
								Delivery
							</Text>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								John Smith
							</Text>
						</View>
						<InlinePicker
							data={[{ value: "ol", label: "lol" }]}
							color="#01a229"
							placeholder={{
								label: "Pick up location",
								value: "default"
							}}
							icon={() => (
								<Icon
									name="chevron"
									size={18}
									color="#01a229"
								/>
							)}
							style={{ marginBottom: 15 }}
						/>
						<InlinePicker
							data={[{ value: "ol", label: "lol" }]}
							color="#01a229"
							placeholder={{
								label: "Delivery",
								value: "default"
							}}
							icon={() => (
								<Icon
									name="chevron"
									size={18}
									color="#01a229"
								/>
							)}
						/>
						<View
							style={{
								flex: 1,
								paddingBottom: 15,
								marginTop: 15,
								flexDirection: "row"
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 18 }}>
								Total
							</Text>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-end"
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 22
									}}
								>
									39999
								</Text>
								<Text
									style={{ fontWeight: "100", fontSize: 18 }}
								>
									AED
								</Text>
							</View>
						</View>
						<RoundButton
							big
							large
							fill
							color="#01a229"
							text="Checkout"
							onPress={() => {
								this.props.navigation.navigate("Checkout");
							}}
						/>
					</View>
				</ScrollView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(Cart);
