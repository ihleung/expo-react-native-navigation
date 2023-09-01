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

function ItemList({ navigation }) {
  return (
    /*<View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
    */
    <View>
      <Text>Item List</Text>
      <Button
        title="First Item"
        onPress={() =>
          navigation.navigate("Details", {
            title: "First Item",
            desc: "First item description",
            qtyAvail: 5,
          })
        }
      />
      <Button
        title="Second Item"
        onPress={() =>
          navigation.navigate("Details", {
            title: "Second Item",
            desc: "Second item description",
            qtyAvail: 0,
          })
        }
      />
      <Button
        title="Third Item"
        onPress={() =>
          navigation.navigate("Details", {
            title: "Third Item",
            desc: "Third item description",
            qtyAvail: 15,
          })
        }
      />
    </View>
  );
}

const Details = function ({ navigation }) {
  return (
    <View>
      <Text>Description: {navigation.getParam("desc")}</Text>
    </View>
  );
};

Details.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam("title"),
  headerRight: (
    <Button title="Buy" disabled={navigation.getParam("qtyAvail") === 0} />
  ),
});

export default createAppContainer(
  createStackNavigator(
    { Home, Settings, ItemList, Details },
    { initialRouteName: "Home" }
  )
);
