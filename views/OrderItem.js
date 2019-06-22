import React from "react";
import {
    Animated,
    Image,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "../services/IconService";
import RoundButton from "../components/RoundButton";

class OrderItem extends React.Component {
    state = { collapsed: true, minHeight: 0, maxHeight: 0 };
    value = new Animated.Value();
    toggle = () => {
        let { collapsed, minHeight, maxHeight } = this.state;
        let toValue = minHeight;
        if (this._childRef) if (!collapsed) toValue = minHeight + maxHeight;
        this.setState({ collapsed: !collapsed }, () =>
            Animated.spring(this.value, {
                toValue
            }).start()
        );
    };

    render() {
        let { item } = this.props;
        return (
            <Animated.View
                style={[
                    {
                        backgroundColor: "white",
                        borderRadius: 30,
                        padding: 15,
                        margin: 15,
                        shadowColor: "black",
                        shadowOpacity: 0.1,
                        shadowOffset: { height: 5 },
                        flex: 1
                    },
                    { height: this.value }
                ]}
            >
                <View
                    onLayout={({ nativeEvent }) => {
                        this.setState({
                            ...this.state,
                            minHeight: nativeEvent.layout.height + 30
                        });
                    }}
                    style={{ flexDirection: "row" }}
                >
                    <View>
                        <Image
                            source={{ uri: item.photo }}
                            style={{
                                height: 120,
                                width: 80,
                                borderRadius: 20
                            }}
                        />
                        <View
                            style={{
                                borderRadius: 15,
                                height: 30,
                                width: 30,
                                backgroundColor: "#00904c",
                                position: "absolute",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 68
                            }}
                        >
                            <Icon name="ok" size={12} color="white" />
                        </View>
                    </View>
                    <View style={{ paddingLeft: 15, flex: 1 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                borderBottomWidth: 1,
                                borderColor: "#cbcbcb"
                            }}
                        >
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text
                                    style={{ color: "#afafaf", fontSize: 12 }}
                                >
                                    {item.date}
                                </Text>
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 12 }}
                                >
                                    {item.time}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "green",
                                    fontSize: 14
                                }}
                            >
                                # {item.id}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "space-between",
                                    paddingTop: 10
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{ fontWeight: "bold", fontSize: 14 }}
                                >
                                    {item.parent}
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    style={{ fontWeight: "400", fontSize: 14 }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{ fontWeight: "400", fontSize: 14 }}
                                >
                                    {item.fuelType}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: 10
                                }}
                            >
                                <TouchableWithoutFeedback
                                    onPress={() => this.toggle()}
                                >
                                    <View
                                        style={{
                                            height: 30,
                                            width: 30,
                                            borderRadius: 18,
                                            borderColor: "#00904c",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 0.5
                                        }}
                                    >
                                        <Icon
                                            name="chevrondown"
                                            size={6}
                                            color="#00904c"
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
                {!this.state.collapsed && (
                    <Animated.View ref={ref => (this._childRef = ref)}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>
                                Generation
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                Transmission
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                Drive type
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>Year</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>
                                {item.generation}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.transmission}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.driveType}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {item.year}
                            </Text>
                        </View>
                        <Text style={{ fontWeight: "bold" }}>Description</Text>
                        <Text style={{ fontWeight: "400" }}>
                            {item.description}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                            Competitor prices
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <Text style={{ color: "#00904c" }}>
                                1) {item.competitorPrices[0]}
                            </Text>
                            <Text style={{ color: "#00904c" }}>
                                2) {item.competitorPrices[1]}
                            </Text>
                            <Text style={{ color: "#00904c" }}>
                                3) {item.competitorPrices[2]}
                            </Text>
                        </View>
                        <Text style={{ fontWeight: "bold" }}>My price</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text
                                style={{ color: "#00904c", fontWeight: "bold" }}
                            >
                                440 AED
                            </Text>
                            <Icon name="penciledit" color="#afafaf" size={18} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={{ uri: item.photo }}
                                style={{ height: 120, width: 120 }}
                            />
                            <Image
                                source={{ uri: item.photo }}
                                style={{ height: 120, width: 120 }}
                            />
                            <Image
                                source={{ uri: item.photo }}
                                style={{ height: 120, width: 120 }}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <RoundButton
                                big
                                text={"Remove order"}
                                color={"red"}
                                icon={() => (
                                    <Icon
                                        name={"cancel-circled"}
                                        color={"red"}
                                    />
                                )}
                            />
                            <RoundButton
                                fill
                                text={"Send request"}
                                color={"#00904c"}
                                icon={() => (
                                    <Icon name={"left-arrow"} color={"white"} />
                                )}
                                big
                            />
                        </View>
                    </Animated.View>
                )}
            </Animated.View>
        );
    }
}

export default OrderItem;
