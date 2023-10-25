import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Essay({ TempSoal, callBack }) {
  const [Jawaban, SetJawaban] = useState(null);
  return (
    <View>
      <TextInput
        multiline={true}
        className="border rounded-lg py-2 border-gray-400 px-2"
        placeholder="Isi Jawaban"
        onChangeText={(text) => {
          SetJawaban(text);
          callBack(text, TempSoal);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
