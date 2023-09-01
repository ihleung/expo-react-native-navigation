import React, { useState } from "react";
import { View, Text, Platform, Button } from "react-native";
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

const ItemList = function ({ navigation, screenProps: { items } }) {
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
        title={`First Item (${items.first})`}
        onPress={() =>
          navigation.navigate("Details", {
            id: "first",
            title: "First Item",
            desc: "First item description",
          })
        }
      />
      <Button
        title={`Second Item (${items.second})`}
        onPress={() =>
          navigation.navigate("Details", {
            id: "second",
            title: "Second Item",
            desc: "Second item description",
          })
        }
      />
      <Button
        title={`Third Item (${items.third})`}
        onPress={() =>
          navigation.navigate("Details", {
            id: "third",
            title: "Third Item",
            desc: "Third item description",
          })
        }
      />
    </View>
  );
};

ItemList.navigationOptions = {
  title: "Item List",
};

const Details = function ({ navigation }) {
  return (
    <View>
      <Text>Description: {navigation.getParam("desc")}</Text>
    </View>
  );
};

Details.navigationOptions = ({
  navigation,
  screenProps: { items, decrementItem },
}) => {
  const id = navigation.getParam("id");
  const title = navigation.getParam("title");

  return {
    title: `${title} (${items[id]})`,
    headerRight: (
      <Button
        title="Buy"
        onPress={() => decrementItem(id)}
        disabled={items[id] === 0}
      />
    ),
  };
};

const Navigator = createAppContainer(
  createNavigator(
    { Home, ItemList, Details, Settings },
    { initialRouteName: "Home" }
  )
);

export default function App() {
  const [items, setItems] = useState({
    first: 5,
    second: 0,
    third: 15,
  });

  const decrementItem = function (id) {
    setItems({ ...items, [id]: items[id] === 0 ? 0 : items[id] - 1 });
  };

  return <Navigator screenProps={{ items, decrementItem }} />;
}
