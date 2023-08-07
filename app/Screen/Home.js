import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { getData } from "../Utils/Storage";
import IC_input from "../asset/kategori/input.png";
import IC_qc from "../asset/kategori/qc.jpg";
import IC_survey from "../asset/kategori/survey.png";
import Topbar from "../components/Topbar";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [User, SetUser] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getData("user").then((user) => {
      SetUser(user);
    });
  }, []);

  return (
    <ScrollView
      className="bg-blue-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Topbar />

      <View className="bg-white mx-3 rounded-xl p-3 -mt-6">
        <Text className="font-medium text-lg text-slate-700">
          Kategori Tugas
        </Text>
        <View className="flex-row space-x-7 justify-around mt-2">
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail")}
            className=" items-center"
          >
            <Image source={IC_input} className="w-14 h-14 object-contain" />
            <Text className="text-xs text-slate-500 mt-1">Input Relawan</Text>
          </TouchableOpacity>
          <View className=" items-center">
            <Image source={IC_survey} className="w-14 h-14 object-contain" />
            <Text className="text-xs text-slate-500 mt-1">Survey</Text>
          </View>
          <View className=" items-center">
            <Image source={IC_qc} className="w-14 h-14 object-contain" />
            <Text className="text-xs text-slate-500 mt-1">Quick Qount</Text>
          </View>
        </View>
      </View>
      <View>
        <View className="bg-white p-3 mt-2">
          <Text className="font-medium text-slate-600">Riwayat Tugas</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
