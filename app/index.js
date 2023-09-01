import React from "react";
import { View, Text, Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

const Home = function ({ navigation }) {
  return (
    <View>
      <Text>Home Content</Text>
    </View>
  );
};

Home.navigationOptions = {
  title: "Home",
};

const Settings = function ({ navigation }) {
  return (
    <View>
      <Text>Settings Content</Text>
    </View>
  );
};

Settings.navigationOptions = {
  title: "Settings",
};

const { createNavigator } = Platform.select({
  ios: { createNavigator: createBottomTabNavigator },
  android: { createNavigator: createDrawerNavigator },
  default: { createNavigator: createStackNavigator },
});

export default createAppContainer(
  createNavigator({ Home, Settings }, { initialRouteName: "Home" })
);
