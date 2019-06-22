import React from "react";
import { View, Text, FlatList } from "react-native";
import Header from "../components/Header";
import OrderItem from "./OrderItem";

const data = [
	{
		date: "2019-05-09 9:37 AM",
		id: 56,
		name: "Stop Light Right Side Model 2009",
		parent: "Wolksvagen Passat CC",
		fuelType: "Petrol",
		generation: "3",
		transmission: "Automatic",
		driveType: "4 Wheel Drive",
		year: "2019",
		description: "Good condition, 2009 model. Chevrolet Cruze",
		competitorPrices: ["440 AED", "460 AED", "450 AED"],
		myPrice: "440 AED",
		images: [],
		photo:
			"https://topgearrussia.ru/data/topgear/preview/2018-09/20/image-b5ad3c511537426791-640x400.jpg",
		state: "approved"
	}
];

class Orders extends React.Component {
	render() {
		return (
			<View>
				<Header
					name="Order History"
					description="All purchase information"
				/>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<OrderItem {...{ item }} keyExtractor={e => e.id} />
					)}
				/>
			</View>
		);
	}
}

export default Orders;
