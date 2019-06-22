import React from "react";
import { LinearGradient as Gradient } from "expo";
import {
	View,
	Dimensions,
	Animated,
	StyleSheet,
	TouchableWithoutFeedback
} from "react-native";
import { Svg } from "expo";
import * as shape from "d3-shape";
import StaticTabbar from "./StaticTabBar";

const { width } = Dimensions.get("window");
const height = 64;
const { Path } = Svg;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export class TabBarComponent extends React.Component {
	value = new Animated.Value(-width);
	values = [];
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		const tabWidth = width / navigation.state.routes.length;
		this.value.setValue(-width + tabWidth * 2);
		this.values = navigation.state.routes.map(
			(tab, index) => new Animated.Value(index === 2 ? 1 : 0)
		);
	}
	render() {
		const { value, values } = this;
		const { navigation, renderIcon, onTabPress } = this.props;
		const { state } = navigation;
		const tabWidth = width / state.routes.length;
		const tab = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(shape.curveBasis)([
			{ x: width - 15, y: 0 },
			{ x: width, y: 0 },
			{ x: width + 10, y: 10 },
			{ x: width + 25, y: height / 2 },
			{ x: width + tabWidth - 25, y: height / 2 },
			{ x: width + tabWidth - 10, y: 10 },
			{ x: width + tabWidth, y: 0 },
			{ x: width + tabWidth + 15, y: 0 }
		]);
		const left = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)([{ x: 0, y: 0 }, { x: width, y: 0 }]);
		const right = shape
			.line()
			.x(d => d.x)
			.y(d => d.y)([
			{ x: width + tabWidth, y: 0 },
			{ x: width * 2.5, y: 0 },
			{ x: width * 2.5, y: height },
			{ x: 0, y: height },
			{ x: 0, y: 0 }
		]);

		const d = `${left} ${tab} ${right}`;
		return (
			<View style={{ width, height }}>
				<AnimatedSvg
					{...{ height }}
					width={width * 2.5}
					style={{ transform: [{ translateX: value }] }}
				>
					<Path {...{ d }} fill="black" />
				</AnimatedSvg>
				<Gradient
					style={{
						position: "relative",
						right: 0,
						left: 0,
						top: -104,
						height: 40,
						transform: [{ rotate: "180deg" }]
					}}
					colors={["white", "#ffffff00"]}
				/>
				<View style={StyleSheet.absoluteFill}>
					<View style={{ flexDirection: "row" }}>
						{state.routes.map((route, key) => {
							const focused = key === navigation.state.index;
							const scene = { route, focused };
							const activeValue = values[key];
							const translateY = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [32, 0]
							});
							const reverseOpacity = activeValue.interpolate({
								inputRange: [0, 1],
								outputRange: [1, 0]
							});
							return (
								<React.Fragment {...{ key }}>
									<TouchableWithoutFeedback
										key={route.key}
										onPress={() => {
											onTabPress({ route });
											const tabWidth =
												width / state.routes.length;
											values.map((a, i) => {
												a.setValue(0);
											});
											Animated.parallel([
												Animated.spring(activeValue, {
													toValue: 1,
													useNativeDriver: true
												}),
												Animated.spring(value, {
													toValue:
														-width + tabWidth * key,
													useNativeDriver: true
												})
											]).start();
										}}
									>
										<Animated.View
											style={{
												flex: 1,
												justifyContent: "center",
												alignItems: "center",
												height: 64,
												opacity: reverseOpacity
											}}
										>
											{renderIcon(scene)}
										</Animated.View>
									</TouchableWithoutFeedback>

									{focused && (
										<Animated.View
											style={{
												position: "absolute",
												width: tabWidth,
												left: tabWidth * key,
												height: 64,
												top: -30,
												justifyContent: "center",
												alignItems: "center",
												transform: [{ translateY }],
												opacity: activeValue
											}}
										>
											<View
												style={{
													justifyContent: "center",
													alignItems: "center",
													width: 45,
													height: 45,
													borderRadius: 25,
													backgroundColor: "red"
												}}
											>
												{renderIcon(scene)}
											</View>
										</Animated.View>
									)}
								</React.Fragment>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
}

export default TabBarComponent;

// <View
// 			style={{
// 				flexDirection: "row",
// 				justifyContent: "space-between",
// 				padding: 30,
// 				backgroundColor: "#1c1b1b"
// 			}}
// 		>
// 			{state.routes.map((route, index) => {
// 				const focused = index === navigation.state.index;
// 				const scene = { route, focused };
// 				console.warn(
// 					state.routes.length % 2 === 1 &&
// 						parseInt(state.routes.length / 2) === index
// 				);
// 				if (
// 					state.routes.length % 2 === 1 &&
// 					parseInt(state.routes.length / 2) === index
// 				) {
// 					return (
// 						<View>
// 							<View
// 								style={{
// 									flexDirection: "row"
// 								}}
// 							>
// 								<View
// 									style={{
// 										backgroundColor: "white",
// 										marginTop: 0,
// 										borderBottomLeft: 40,
// 										borderBottomRight: 40,
// 										padding: 30,
// 										marginTop: -50,
// 										position: "absolute"
// 									}}
// 								/>
// 								<View
// 									style={{
// 										padding: 30,
// 										backgroundColor: "#1c1b1b",
// 										borderTopRightRadius: 40,
// 										marginTop: -30,
// 										marginLeft: -60,
// 										position: "absolute"
// 									}}
// 								/>
// 								<View
// 									style={{
// 										padding: 15,
// 										backgroundColor: "#1c1b1b",
// 										position: "absolute"
// 									}}
// 								/>
// 							</View>
// 							<View
// 								style={{
// 									backgroundColor: "#fe0505",
// 									borderRadius: 100,
// 									marginTop: -90,
// 									padding: 15,
// 									height: 55
// 								}}
// 							>
// 								{renderIcon(scene)}
// 							</View>
// 						</View>
// 					);
// 				}
// 				return (
// 					<View style={{ alignItems: "center" }}>
// 						{renderIcon(scene)}
// 					</View>
// 				);
// 			})}
// 		</View>
