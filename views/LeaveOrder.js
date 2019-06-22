import React, { Component } from "react";
import {
	ScrollView,
	View,
	TextInput,
	Dimensions,
	Text,
	KeyboardAvoidingView
} from "react-native";
import RoundInput from "../components/RoundInput";
import DefaultPicker from "../components/DefaultPicker";
import MultiImagePicker from "../components/MultiImagePicker";
import {
	populateMakes,
	populateModels,
	populateYears,
	populateCategories
} from "../actions/thunk";
import Icon from "../services/IconService";
import { connect } from "react-redux";
import Header from "../components/Header";
import RoundPicker from "../components/RoundPicker";
import RoundButton from "../components/RoundButton";

let width = Dimensions.get("window").width - 30;

class PartSegment extends Component {
	render() {
		let {
			photos,
			description,
			index,
			descriptionChange,
			add,
			remove
		} = this.props;
		return (
			<View>
				<Text
					style={{
						color: "#069627",
						fontWeight: "bold",
						fontSize: 24,
						textAlign: "center",
						marginBottom: 10
					}}
				>
					PART #{index + 1}
				</Text>
				<RoundInput
					simple
					multiline
					numberOfLines={10}
					placeholder="Part name/description"
				/>
				<MultiImagePicker
					{...{ photos, segmentIndex: index, add, remove }}
				/>
			</View>
		);
	}
}

class LeaveOrder extends Component {
	state = {
		segments: [{ photos: [], description: "" }],
		make: "",
		model: "",
		year: "",
		category: ""
	};
	componentDidMount() {
		this.props.dispatch(populateMakes());
		this.props.dispatch(populateMakes());
	}
	add = (index, el) => {
		let { segments } = this.state;
		segments[index].photos.push(el);
		this.setState({
			...this.state,
			segments
		});
	};
	remove = (segmentIndex, itemIndex) => {
		let { segments } = this.state;
		segments[segmentIndex].photos = [
			...segments[segmentIndex].photos.slice(0, itemIndex),
			...segments[segmentIndex].photos.slice(
				itemIndex + 1,
				segments[segmentIndex].photos.length - 1
			)
		];
		this.setState({ ...this.state, segments });
	};
	descriptionChange = (text, index) => {
		let { segments } = this.state;
		segments[index].description = text;
		this.setState({ ...this.state, segments });
	};
	render() {
		let { make, model, year, category, segments } = this.state;
		let { makes, models, years, categories } = this.props;
		let { descriptionChange, add, remove } = this;
		let cats = categories.map(({ title, id }) => {
			return { label: title, value: title };
		});
		return (
			<React.Fragment>
				<Header
					back
					name="Leave your order"
					description="What you need?"
					openDrawer={this.props.navigation.openDrawer}
				/>

				<KeyboardAvoidingView
					behavior="padding"
					enabled
					style={{ flex: 1 }}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{ backgroundColor: "white" }}
					>
						<View style={{ padding: 15 }}>
							<Text
								style={{
									color: "#069627",
									fontWeight: "bold",
									fontSize: 24,
									textAlign: "center",
									marginBottom: 15
								}}
							>
								Describe your car
							</Text>
							<RoundPicker
								placeholder={{
									label: "Select a Make",
									value: null,
									color: "#c5c5c5"
								}}
								data={makes}
								onValueChange={(e, i) => {
									this.setState({
										...this.state,
										make: e
									});
									this.props.dispatch(populateModels(e));
								}}
							/>
							<RoundPicker
								placeholder={{
									label: "Select a Model",
									value: null,
									color: "#c5c5c5"
								}}
								data={models}
								onValueChange={(e, i) => {
									this.setState({
										...this.state,
										model: e
									});
									this.props.dispatch(populateYears(make, e));
								}}
							/>
							<RoundPicker
								placeholder={{
									label: "Select a Generation",
									value: null,
									color: "#c5c5c5"
								}}
								data={years}
								onValueChange={(e, i) => {
									this.setState({
										...this.state,
										year: e
									});
								}}
							/>
							<RoundPicker
								placeholder={{
									label: "Select a Category",
									value: null,
									color: "#c5c5c5"
								}}
								data={categories}
								onValueChange={(e, i) => {
									this.setState({
										...this.state,
										category: e
									});
								}}
							/>
						</View>
						{segments &&
							segments.length > 0 &&
							segments.map(({ photos, description }, index) => {
								return (
									<PartSegment
										{...{
											index,
											description,
											photos,
											descriptionChange,
											add,
											remove
										}}
									/>
								);
							})}
						<View
							style={{ alignItems: "center", paddingBottom: 30 }}
						>
							<RoundButton
								text="Add parts for current car"
								color="#069627"
								animated
								noMargin
								onPress={() => {
									this.setState({
										...this.state,
										segments: [
											...segments,
											{ photos: [], description: "" }
										]
									});
								}}
							/>
							<RoundButton
								animated
								text="Send order"
								noMargin
								fill
								color="#069627"
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ makes, models, years, categories }) => ({
	makes,
	models,
	years,
	categories
});

export default connect(mapStateToProps)(LeaveOrder);
