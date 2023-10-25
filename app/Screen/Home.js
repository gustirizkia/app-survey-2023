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
import Loading from "../components/Loading";
import axios from "axios";
import { BASE_URL } from "../components/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [User, SetUser] = useState({});
  const [ListKota, SetListKota] = useState([]);
  const [RiwayatSurvey, SetRiwayatSurvey] = useState([]);
  const [hideLoading, setHideLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    getData("user").then((user) => {
      SetUser(user);
    });

    fetchData();
  }, []);

  const token = getData("token");
  const fetchData = () => {
    token.then((token) => {
      setHideLoading(false);
      axios
        .get(`${BASE_URL}survey-index`, {
          headers: {
            Authorization: "Bearer " + token.value,
          },
        })
        .then((ress) => {
          SetListKota(ress.data.list_kota);
          SetRiwayatSurvey(ress.data.target_list);

          setHideLoading(true);

          setRefreshing(false);
        })
        .catch((err) => {
          console.log("err", err);

          if (err?.response?.data?.message === "Unauthenticated.") {
            AsyncStorage.clear();
            navigation.replace("Login");
          }
        });
    });
  };

  return (
    <>
      {!hideLoading && <Loading />}
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
            <TouchableOpacity className=" items-center">
              <Image source={IC_input} className="w-14 h-14 object-contain" />
              <Text className="text-xs text-slate-500 mt-1">Input Relawan</Text>
            </TouchableOpacity>
            {/* Survey */}
            {User?.target && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Survey")}
                className=" items-center"
              >
                <Image
                  source={IC_survey}
                  className="w-14 h-14 object-contain"
                />
                <Text className="text-xs text-slate-500 mt-1">Survey</Text>
              </TouchableOpacity>
            )}
            {/* Survey end */}

            {/* Real Count */}
            {User?.saksi && (
              <TouchableOpacity
                onPress={() => navigation.navigate("RealCount")}
                className=" items-center"
              >
                <Image source={IC_qc} className="w-14 h-14 object-contain" />
                <Text className="text-xs text-slate-500 mt-1">Quick Qount</Text>
              </TouchableOpacity>
            )}

            {/* Real Count end */}
          </View>
        </View>
        <View>
          <View className="bg-white p-3 mt-3 mb-32">
            <Text className="font-medium mb-5">Riwayat Survey</Text>

            {RiwayatSurvey.map((item) => {
              return (
                <View
                  className="border-b p-2 border-gray-300 pb-3 mb-3"
                  key={item.id}
                >
                  <Text className="">{item.nama}</Text>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600 mt-2">
                      {item.created_at}
                    </Text>
                    <View>
                      {item.foto_bersama ? (
                        <Text>Selesai</Text>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Quiz", {
                              target_id: item.id,
                            })
                          }
                        >
                          <Text className="text-green-700 font-semibold">
                            Lanjut
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
