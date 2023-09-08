import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { getData, storeData } from "../../Utils/Storage";
import { BASE_URL, STORAGE_URL } from "../../components/API";
import UploadGambar from "../../components/UploadGambar";
import LoadingRealcount from "./LoadingRealcount";

export default function RealCount({ navigation }) {
  const [SuaraSah, SetSuaraSah] = useState(0);
  const [SuaraGolput, SetSuaraGolput] = useState(0);
  const [SuaraTidakSah, SetSuaraTidakSah] = useState(0);
  const [HideLoading, SetHideLoading] = useState(false);
  const [Dapil, SetDapil] = useState(null);
  const [Caleg, SetCaleg] = useState([]);

  useEffect(() => {
    getData("token").then((ressToken) => {
      console.log("ressToken", ressToken.value);
      axios
        .get(`${BASE_URL}real-count-get-data`, {
          headers: {
            Authorization: "Bearer " + ressToken.value,
          },
        })
        .then((ress) => {
          console.log("ress", ress.data);
          SetDapil(ress.data.dapil);

          let tempDapil = [];
          ress.data.caleg.forEach((element) => {
            element.suara = 0;
            tempDapil.push(element);
          });
          SetCaleg(tempDapil);

          SetHideLoading(true);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  }, []);

  const handelSuaraSah = (e, id) => {
    let tempCaleg = [];
    Caleg.forEach((element) => {
      if (element.id === id) {
        element.suara = parseInt(e);
      }

      tempCaleg.push(element);
    });

    SetCaleg(tempCaleg);
  };

  useEffect(() => {
    let tempSuaraSah = 0;
    Caleg.forEach((element) => {
      tempSuaraSah += parseInt(element.suara);
    });

    SetSuaraSah(tempSuaraSah);
  }, [Caleg]);

  const handleSubmit = () => {
    storeData("real_count", true);
    SetHideLoading(false);
    setTimeout(() => {
      showMessage({
        message: "Berhasil Input Real Count",
        description: "Data real count sudah dikirim ",
        type: "success",
        duration: 5850,
      });

      SetHideLoading(true);
    }, 2000);

    setTimeout(() => {
      navigation.replace("MainApp");
    }, 3000);
  };

  return (
    <>
      {!HideLoading && <LoadingRealcount />}
      <ScrollView>
        <View className="px-3 bg-white py-3 min-h-screen">
          <Image
            source={{
              uri: `${STORAGE_URL}${Dapil?.image}`,
            }}
            className="w-full h-32 object-contain mb-10"
            resizeMode="contain"
          />
          {Caleg.map((item) => {
            return (
              <View className="mb-4" key={item.id}>
                <Text className="font-medium">
                  No {item.nomor} {item.nama}
                </Text>
                <TextInput
                  onChangeText={(e) => {
                    if (e) {
                      handelSuaraSah(e, item.id);
                    } else {
                      handelSuaraSah(0, item.id);
                    }
                  }}
                  className="border px-2 mt-3 rounded-lg border-gray-400 text-lg py-1"
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            );
          })}

          <View className="mb-4">
            <Text className="font-medium">Suara Golput</Text>
            <TextInput
              onChangeText={(e) => {
                if (e) {
                  SetSuaraGolput(e);
                } else {
                  SetSuaraGolput(0);
                }
              }}
              className="border px-2 mt-3 rounded-lg border-gray-400 text-lg py-1"
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4">
            <Text className="font-medium">Jumlah Suara Tidak Sah</Text>
            <TextInput
              onChangeText={(e) => {
                if (e) {
                  SetSuaraTidakSah(e);
                } else {
                  SetSuaraTidakSah(0);
                }
              }}
              className="border px-2 mt-3 rounded-lg border-gray-400 text-lg py-1"
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4 border-b border-gray-400 pb-2">
            <Text className="font-medium mb-3">Jumlah Suara Sah</Text>
            <Text className="text-lg">{SuaraSah}</Text>
          </View>
          <View className="mb-4 border-b border-gray-400 pb-2">
            <Text className="font-medium mb-3">Total Suara</Text>
            <Text className="text-lg">
              {SuaraSah + parseInt(SuaraTidakSah) + parseInt(SuaraGolput)}
            </Text>
          </View>

          <View className="mb-6">
            <UploadGambar callbackImage={(data) => {}} Title="Upload Foto C1" />
          </View>
          <View className="flex-row justify-center mb-10">
            <UploadGambar
              callbackImage={(data) => {}}
              Title="Upload Foto Diri di TPS"
              // TypeCamera="camera"
            />
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-yellow-600 text-white rounded-lg py-3 mb-4"
          >
            <Text className="text-white text-center font-medium">
              Submit Data
            </Text>
          </TouchableOpacity>
        </View>
        <FlashMessage position="center" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
