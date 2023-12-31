import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const ItemList = function ({ navigation, screenProps: { items } }) {
  return (
    <View>
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
  createStackNavigator({ ItemList, Details }, { initialRouteName: "ItemList" })
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
