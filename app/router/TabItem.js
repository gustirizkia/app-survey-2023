import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default function TabItem({ state, descriptors, navigation }) {
  return (
    <View
      style={{ flexDirection: "row" }}
      className="bg-white py-4 rounded-2xl mx-2 absolute bottom-2"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const IconComponent = () => {
          if (label === "Home") {
            return isFocused ? (
              <Icon name="home" size={20} color="#f59e0b" />
            ) : (
              <Icon name="home" size={20} color="#A3A3A3" />
            );
          } else if (label === "Cart") {
            return isFocused ? (
              <Icon name="handbag" size={20} color="#f59e0b" />
            ) : (
              <Icon name="handbag" size={20} color="#A3A3A3" />
            );
          } else if (label === "Profile") {
            return isFocused ? (
              <Icon name="user" size={20} color="#f59e0b" />
            ) : (
              <Icon name="user" size={20} color="#A3A3A3" />
            );
          } else if (label === "Survey") {
            return isFocused ? (
              <Icon name="book-open" size={20} color="#f59e0b" />
            ) : (
              <Icon name="book-open" size={20} color="#A3A3A3" />
            );
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
            className="justify-center flex items-center  bg-white rounded-xl"
          >
            <IconComponent />
            <Text
              className={`text-xs  ${
                isFocused ? "text-amber-500" : "text-gray-400"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
