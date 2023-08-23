import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CalegBanner from "../../asset/kategori/ss_caleg.jpg";
import UploadGambar from "../../components/UploadGambar";
import { storeData } from "../../Utils/Storage";
import Loading from "../../components/Loading";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function RealCount({ navigation }) {
  const [SuaraSah, SetSuaraSah] = useState(0);
  const [SuaraTidakSah, SetSuaraTidakSah] = useState(0);
  const [HideLoading, SetHideLoading] = useState(true);

  const handelSuaraSah = (e) => {
    let tempSuaraSah = SuaraSah + parseInt(e);
    SetSuaraSah(tempSuaraSah);
  };

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
      {!HideLoading && <Loading />}
      <ScrollView>
        <View className="px-3 bg-white py-3 min-h-screen">
          <Image
            source={CalegBanner}
            className="w-full h-32 object-contain mb-10"
          />
          <View className="mb-4">
            <Text className="font-medium">No 1 Ridwan Alamsyah</Text>
            <TextInput
              onChangeText={(e) => {
                if (e) {
                  handelSuaraSah(e);
                }
              }}
              className="border px-2 mt-3 rounded-lg border-gray-400 text-lg py-1"
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-4">
            <Text className="font-medium">No 2 Topik Hidayat</Text>
            <TextInput
              onChangeText={(e) => {
                if (e) {
                  handelSuaraSah(e);
                }
              }}
              className="border px-2 mt-3 rounded-lg border-gray-400 text-lg py-1"
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-4">
            <Text className="font-medium">No 3 Human</Text>
            <TextInput
              onChangeText={(e) => {
                if (e) {
                  handelSuaraSah(e);
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
              {SuaraSah + parseInt(SuaraTidakSah)}
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
