import axios from "axios";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getData } from "../../Utils/Storage";
import { BASE_URL } from "../../components/API";
import Topbar from "../../components/Topbar";
import Loading from "../../components/Loading";

export default function IndexSurvey({ navigation }) {
  const [ListKota, SetListKota] = useState([]);
  const [RiwayatSurvey, SetRiwayatSurvey] = useState([]);
  const [User, SetUser] = useState({});
  const [LocationData, SetLocationData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("kami mebutuhkan akses location");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!location.mocked) {
        SetLocationData(location);
      } else {
        alert("Sitem mendeteksi fake gps");
      }
    })();
  }, []);

  useEffect(() => {
    getData("user").then((user) => {
      SetUser(user);
    });
  }, []);

  const token = getData("token");
  const fetchData = () => {
    token.then((token) => {
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
        });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <>
      {!hideLoading && <Loading />}
      <ScrollView
        className="bg-blue-50 pb-56 "
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Topbar />
        <View className="bg-white mx-3 rounded-xl p-3 -mt-6 ">
          <Text className="">Total Survey</Text>
          <Text className="text-2xl text-green-600 font-medium">
            {RiwayatSurvey.length}
          </Text>
        </View>

        <View className="bg-white p-3 mt-3">
          <Text className="font-medium mb-5">Tugas Survey</Text>
          {ListKota.map((item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("input-data-target", {
                    kota: item.kota_id,
                  })
                }
                key={item.id}
                className="mb-4 border border-gray-300 p-2 rounded-lg flex-row justify-between items-center"
              >
                <Text>{item.kota.nama}</Text>
                <Icon name="chevron-right" />
              </TouchableOpacity>
            );
          })}
        </View>
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
                  <Text className="text-gray-600 mt-2">{item.created_at}</Text>
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
                        <Text className="text-green-700">Lanjut</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
