import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { getData, storeData } from "../Utils/Storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { BASE_URL } from "../components/API";
import Loading from "../components/Loading";
import Logo from "../../assets/logo_1.png";
import Header_IC from "../asset/login/header.png";

export default function Login({ navigation }) {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [hideLoading, SetHideLoading] = useState(true);

  const handleSubmit = () => {
    SetHideLoading(false);
    axios
      .post(`${BASE_URL}login`, {
        email: Email,
        password: Password,
      })
      .then((res) => {
        SetHideLoading(true);
        let token = res.data.token;
        let user = res.data.user;
        storeData("token", { value: token });
        storeData("user", user);

        navigation.replace("MainApp");
      })
      .catch((err) => {
        SetHideLoading(true);
        console.log("err", err);
        showMessage({
          message: "Gagal Login ",
          description: "Periksa Email dan Password Anda!",
          type: "error",
          backgroundColor: "#d9435e",
        });
      });
  };

  return (
    <>
      {!hideLoading && (
        <>
          <Loading LoadingShow={hideLoading} />
        </>
      )}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        <Image source={Header_IC} className="absolute" />
        <SafeAreaView className="flex-1 px-2 justify-center ">
          <View>
            <View className="flex-row justify-center mb-10">
              <Image source={Logo} className="w-40 h-40 object-contain" />
            </View>
            <View className="border border-gray-300 px-3  flex-row rounded-full items-center justify-between">
              <Icon name="user" size={18} color="#aaa" />
              <TextInput
                className=" rounded-full py-2  flex-1 ml-2"
                placeholder="Masukan Email"
                onChangeText={SetEmail}
              />
            </View>
            <View className="border border-gray-300 px-3  flex-row rounded-full items-center justify-between mt-6">
              <Icon name="lock" size={18} color="#aaa" />
              <TextInput
                className=" rounded-full py-2  flex-1 ml-2"
                placeholder="Masukan Password"
                secureTextEntry
                onChangeText={SetPassword}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-green-600 py-3 px-2 rounded-full mt-4"
            >
              <Text className="text-white text-center">Login</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-center text-gray-300 absolute bottom-5 mx-auto left-0 right-0">
            DEVELOPER BY NCT{" "}
          </Text>
        </SafeAreaView>
        <FlashMessage position="center" />
      </ScrollView>
    </>
  );
}
