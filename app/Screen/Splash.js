import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import IMG from "../asset/splash_screen.png";
import SP_B from "../asset/splash_screen_b.png";
import SP_T from "../asset/splash_screen_t.png";
import { getData, storeData } from "../Utils/Storage";
import axios from "axios";
import { BASE_URL } from "../components/API";

export default function Splash({ navigation }) {
  const token = getData("token");

  useEffect(() => {
    token.then((resToken) => {
      if (resToken) {
        axios
          .get(`${BASE_URL}user`, {
            headers: {
              Authorization: "Bearer " + resToken.value,
            },
          })
          .then((ress) => {
            storeData("user", ress.data);
            navigation.replace("MainApp");
          })
          .catch((err) => {
            navigation.replace("Login");
          });
      } else {
        navigation.replace("Login");
      }
    });
  }, []);

  return (
    <View className="bg-yellow-50 flex-1 justify-center items-center">
      <Image source={SP_T} className="absolute bottom-0 rotate-180 w-full" />
      <Image source={SP_B} className="absolute top-0 rotate-180" />
      <Image source={IMG} className="w-60 h-60 object-contain" />
    </View>
  );
}

const styles = StyleSheet.create({});
