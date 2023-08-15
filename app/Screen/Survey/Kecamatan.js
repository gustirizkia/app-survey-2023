import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { BottomSheet } from "react-native-sheet";

export default function KecamatanSelect({ Kecamatan = [], callBackKecamatan }) {
  const bottomSheet = useRef(null);
  const [selectData, setSelectData] = useState(null);
  const handelSelectAlamat = (param) => {
    callBackKecamatan(param.id);
    bottomSheet.current.hide();
    setSelectData(param.nama);
  };
  return (
    <View className="mb-3">
      <Text className="text-lg font-medium">Kecamatan</Text>
      <View className="">
        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          {selectData ? (
            <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
              {selectData}
            </Text>
          ) : (
            <Text className="border mt-2 rounded-lg py-2 border-gray-400 px-2">
              Pilih Kecamatan
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <BottomSheet height={600} ref={bottomSheet}>
        <ScrollView className="p-4">
          <Text className="font-semibold text-center mb-4">
            Pilih Kecamatan
          </Text>
          {Kecamatan.map((item) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  handelSelectAlamat({
                    nama: item.nama,
                    id: item.id_kecamatan,
                  })
                }
                key={item.id}
                className="mb-4 pb-4 border-b border-gray-300"
              >
                <Text>{item.nama}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
