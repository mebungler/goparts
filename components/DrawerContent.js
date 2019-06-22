import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import Icon from "../services/IconService";
import Logo from "../assets/images/logo.png";
import { connect } from "react-redux";
import { userLoggedOut } from "../actions/actions";

class DrawerContent extends Component {
    renderLogo = () => {};
    renderAccount = () => {};
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingLeft: 10, paddingRight: 15 }}>
                    <Image
                        source={Logo}
                        resizeMode="cover"
                        style={{
                            height: 50,
                            marginTop: 40,
                            width: 270
                        }}
                    />
                </View>
                <View style={{ padding: 30 }}>
                    <DrawerItem iconName="bell" text="My orders" />
                    <DrawerItem iconName="favorites" text="Favorites" />
                    <DrawerItem
                        iconName="shoppingcart"
                        text="Shopping cart"
                        notifications={3}
                    />
                    <DrawerItem iconName="message" text="Order history" />
                    <DrawerItem iconName="user" text="My page" />
                </View>
                <View
                    style={{
                        justifyContent: "flex-end",
                        flex: 1,
                        paddingLeft: 30
                    }}
                >
                    <DrawerItem
                        iconName="logout"
                        text="Logout"
                        onPress={() => {
                            this.props.navigation.closeDrawer();
                            this.props.dispatch(userLoggedOut());
                        }}
                    />
                </View>
            </View>
        );
    }
}

const DrawerItem = ({ iconName, text, notifications, onPress }) => {
    return (
        <TouchableWithoutFeedback {...{ onPress }}>
            <View style={{ flexDirection: "row", margin: 15 }}>
                <View
                    style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon name={iconName} size={20} />
                </View>
                <Text style={{ fontSize: 18 }}>{text}</Text>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                    {notifications > 0 && (
                        <View
                            style={{
                                backgroundColor: "red",
                                borderRadius: 10,
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "100" }}>
                                {notifications}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DrawerContent);
