import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function YesNo({ TempSoal, callbackData }) {
  const [YesNo, SetYesNo] = useState(null);

  useEffect(() => {
    if (TempSoal.check_pilihan_target) {
      SetYesNo(TempSoal.check_pilihan_target.yes_no);
      callbackData(TempSoal.check_pilihan_target.yes_no, TempSoal);
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          SetYesNo("iya");
          callbackData("iya", TempSoal);
        }}
        className={`p-3 rounded-full mb-3 border flex-row items-center ${
          YesNo === "iya"
            ? "bg-green-500 text-white  border-green-500 "
            : "bg-green-100 border-green-100"
        }`}
      >
        <Text
          className={`mr-2 text-sm ${YesNo === "iya" ? " text-white   " : ""}`}
        >
          1.
        </Text>
        <Text className={`text-sm ${YesNo === "iya" ? " text-white   " : ""}`}>
          Iya
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          SetYesNo("tidak");
          callbackData("tidak", TempSoal);
        }}
        className={`p-3 rounded-full mb-3 border flex-row items-center ${
          YesNo === "tidak"
            ? "bg-green-500 text-white  border-green-500 "
            : "bg-green-100 border-green-100"
        }`}
      >
        <Text
          className={`mr-2 text-sm ${
            YesNo === "tidak" ? " text-white   " : ""
          }`}
        >
          2.
        </Text>
        <Text
          className={`text-sm ${YesNo === "tidak" ? " text-white   " : ""}`}
        >
          Tidak
        </Text>
      </TouchableOpacity>
    </>
  );
}
