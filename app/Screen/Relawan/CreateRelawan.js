import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

export default function CreateRelawan() {
  useEffect(() => {
    console.log("HALLO RELAWAN");
  }, []);

  return (
    <View>
      <Text>CreateRelawan</Text>
    </View>
  );
}
