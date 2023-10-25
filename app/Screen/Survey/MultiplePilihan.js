import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function MultiplePilihan({ TempSoal, callBack }) {
  const [PilihanId, SetPilihanId] = useState(0);

  useEffect(() => {
    if (TempSoal.check_pilihan_target?.pilihan_ganda_id) {
      SetPilihanId(TempSoal.check_pilihan_target?.pilihan_ganda_id);
      callBack(TempSoal.check_pilihan_target?.pilihan_ganda_id, TempSoal);
    }
  }, []);

  return (
    <View>
      {TempSoal.pilihan.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              callBack(item.id, TempSoal);
              SetPilihanId(item.id);
            }}
            key={item.id}
            className={`p-3 rounded-full mb-3 border flex-row items-center ${
              PilihanId === item.id
                ? "bg-green-500 text-white  border-green-500 "
                : "bg-green-100 border-green-100"
            }`}
          >
            <Text className={`${PilihanId === item.id ? " text-white  " : ""}`}>
              {index + 1}.{"  "}
            </Text>
            <Text className={`${PilihanId === item.id ? " text-white  " : ""}`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
