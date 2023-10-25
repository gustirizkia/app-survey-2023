import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { getData } from "../Utils/Storage";

export default function Topbar() {
  const [User, SetUser] = useState({});

  useEffect(() => {
    getData("user").then((user) => {
      SetUser(user);
    });
  }, []);

  return (
    <View className="bg-green-600 rounded-b-3xl h-32 px-3">
      <SafeAreaView className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Icon name="user" size={24} color="#fff" />
          <View className="ml-3">
            <Text className="text-white text-lg">{User?.name}</Text>
            {/* <Text className="text-gray-300">
              {User?.role === "user" ? "Surveyor" : User?.role}
            </Text> */}
          </View>
        </View>
        <View>
          <Icon name="bell" size={24} color="#fff" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
