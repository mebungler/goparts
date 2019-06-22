import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import {
	createAppContainer,
	createBottomTabNavigator,
	createDrawerNavigator,
	createStackNavigator,
	BottomTabBar
} from "react-navigation";
import Categories from "../views/Categories";
import Product from "../views/Product";
import Filter from "../views/Filter";
import CustomTabBar from "../components/TabBar";
import Header from "../components/Header";
import RoundPicker from "../components/RoundPicker";
import Account from "../views/Account";
import Login from "../views/Login";
import Cart from "../views/Cart";
import Register from "../views/Register";
import Chats from "../views/Chats";
import Chat from "../views/Chat";
import Orders from "../views/Orders";
import LeaveOrder from "../views/LeaveOrder";
import Checkout from "../views/Checkout";

import DrawerContent from "../components/DrawerContent";

import Icon from "../services/IconService";

const accountStack = createStackNavigator(
	{
		Account: {
			screen: Account,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="General information"
						description="Personal settings"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		}
	},
	{}
);

const categoryStack = createStackNavigator(
	{
		Filter: {
			screen: Filter,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Filter"
						description="What you are looking for"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		Categories: {
			screen: Categories,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						clickable
						back
						name="Categories"
						description="Leave order"
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		},
		Cart: {
			screen: Cart,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Shopping cart"
						description="Check all your products"
						openDrawer={navigation.openDrawer}
						back
					/>
				)
			}
		},
		Product: {
			screen: Product,
			navigationOptions: {
				header: ({ navigation }) => (
					<Header
						name="Product info"
						description="Read all about the product"
						back
						openDrawer={navigation.openDrawer}
					/>
				)
			}
		}
	},
	{}
);

const ChatsStack = createStackNavigator(
	{
		Chats: {
			screen: Chats,
			navigationOptions: {
				header: null
			}
		},
		Chat: {
			screen: Chat,
			navigationOptions: {
				header: null
			}
		}
	},
	{}
);

const AppNavigator = createBottomTabNavigator(
	{
		NotificationsTab: {
			screen: Orders,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="bell" size={20} color="white" />;
				}
			}
		},
		FavouriteTab: {
			screen: () => (
				<View>
					<Text>lol</Text>
				</View>
			),
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="favorites" size={20} color="white" />;
				}
			}
		},
		CategoriesTab: {
			screen: categoryStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="shoppingcart" size={20} color="white" />;
				}
			}
		},
		ChatTab: {
			screen: ChatsStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="message" size={20} color="white" />;
				}
			}
		},
		AccountTab: {
			screen: accountStack,
			navigationOptions: {
				tabBarIcon: () => {
					return <Icon name="user-thin" size={20} color="white" />;
				}
			}
		}
	},
	{
		tabBarComponent: CustomTabBar,
		initialRouteName: "CategoriesTab"
	}
);

const MainStack = createDrawerNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				header: null
			}
		},
		Register: {
			screen: Register,
			navigationOptions: {
				header: null
			}
		},
		Main: {
			screen: AppNavigator,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: "Main",
		contentComponent: DrawerContent,
		drawerWidth: 300
	}
);

const MainWithModel = createStackNavigator(
	{
		MainStack,
		LeaveOrder,
		Checkout
	},
	{
		headerMode: "none",
		mode: "modal",
		transparentCard: true,
		cardStyle: {
			backgroundColor: "transparent",
			opacity: 1
		}
	}
);

export default createAppContainer(MainWithModel);
