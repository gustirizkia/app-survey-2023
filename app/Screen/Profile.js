import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getData, storeData } from "../Utils/Storage";
import axios from "axios";
import { BASE_URL } from "../components/API";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [User, setUser] = useState(null);
  const [Name, SetName] = useState(null);
  const [Email, SetEmail] = useState(null);

  useEffect(() => {
    getData("user").then((res) => {
      setUser(res);
    });
  }, []);

  const updateState = (text, type) => {
    if (type === "name") {
      setUser({ ...User, name: text });
    } else if (type === "email") {
      setUser({ ...User, email: text });
    } else if (type === "password") {
      setUser({ ...User, password: text });
    } else if (type === "phone") {
      setUser({ ...User, phone: text });
    }
  };

  const token = getData("token");

  const updateProfile = () => {
    token.then((resToken) => {
      axios
        .post(`${BASE_URL}updateProfile`, User, {
          headers: {
            Authorization: "Bearer " + resToken.value,
          },
        })
        .then((ress) => {
          storeData("user", ress.data.user);
          setUser(ress.data.user);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const handleLogout = () => {
    token.then((resToken) => {
      axios
        .get(`${BASE_URL}logout`, {
          headers: {
            Authorization: "Bearer " + resToken.value,
          },
        })
        .then((ress) => {
          AsyncStorage.clear();
          navigation.replace("Login");
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  return (
    <ScrollView>
      <View className="bg-white p-3 mt-3 min-h-screen">
        <View className="mb-3">
          <Text className="text-lg font-medium">Username</Text>
          <TextInput
            className="border border-gray-400 rounded-lg px-2 py-1 mt-2"
            value={User?.username}
            editable={false}
          />
        </View>
        <View className="mb-3">
          <Text className="text-lg font-medium">Nama</Text>
          <TextInput
            onChangeText={(text) => updateState(text, "name")}
            className="border border-gray-400 rounded-lg px-2 py-1 mt-2"
            value={User?.name}
          />
        </View>
        <View className="mb-3">
          <Text className="text-lg font-medium">Email</Text>
          <TextInput
            onChangeText={(text) => updateState(text, "email")}
            className="border border-gray-400 rounded-lg px-2 py-1 mt-2"
            value={User?.email}
          />
        </View>
        <View className="mb-3">
          <Text className="text-lg font-medium">Nomor Telepon</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => updateState(text, "phone")}
            className="border border-gray-400 rounded-lg px-2 py-1 mt-2"
            value={User?.phone}
          />
        </View>
        <View className="mb-3">
          <Text className="text-lg font-medium">Password baru</Text>
          <TextInput
            onChangeText={(text) => updateState(text, "password")}
            className="border border-gray-400 rounded-lg px-2 py-1 mt-2"
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={updateProfile}
            className="bg-yellow-600 mt-5 py-2 rounded-lg"
          >
            <Text className="text-white text-center">Update</Text>
          </TouchableOpacity>

          <View className="mt-10 flex-row justify-center">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center"
            >
              <Icon name="logout" size={20} color={"red"} />
              <Text className=" text-center px-4 text-lg text-red-500">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
