import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import OrderHistoryItem from "./OrderHistoryItem";
import { connect } from "react-redux";
import StorageService from "../services/StorageService";
import { UnauthorizedScreen as AuthPrompt } from "./Account";
import ListEmptyComponent from "../components/ListEmptyComponent";
import { populatePurchases } from "../actions/thunk";

class OrderHistory extends Component {
	state = { loading: false };
	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		let { user: parent } = this.props;
		this.props.dispatch(
			populatePurchases(res => {
				this.setState({ ...this.state, loading: false });
			})
		);
	}
	render() {
		let { isAuthenticated, purchases, user } = this.props;
		let { loading } = this.state;
		if (!isAuthenticated) {
			return <AuthPrompt />;
		}
		return (
			<FlatList
				data={purchases}
				renderItem={OrderHistoryItem}
				keyExtractor={e => e.id}
				ListEmptyComponent={() => (
					<ListEmptyComponent
						{...{ hasData: purchases.length <= 0, loading }}
					/>
				)}
				style={{ paddingBottom: 30 }}
			/>
		);
	}
}

const mapStateToProps = ({ user, purchases }) => {
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
				user: {},
				purchases
			};
	}
	return {
		isAuthenticated: true,
		user: usr,
		purchases
	};
};

export default connect(mapStateToProps)(OrderHistory);
