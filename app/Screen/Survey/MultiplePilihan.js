import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function MultiplePilihan({ TempSoal, callBack }) {
  const [PilihanId, SetPilihanId] = useState(0);

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
                ? "bg-yellow-500 text-white  border-yellow-500 "
                : "bg-yellow-100 border-yellow-100"
            }`}
          >
            <Text className={`${PilihanId === item.id ? " text-white  " : ""}`}>
              {index + 1}.
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
