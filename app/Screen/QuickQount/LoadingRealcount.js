import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

export default function LoadingRealcount() {
  return (
    <View className="h-screen items-center justify-center">
      <View>
        <ActivityIndicator size="large" />
        <Text className="text-center font-semibold mt-2">Tunggu Sebentar </Text>
        <Text className="text-center font-semibold mt-2">
          Sedang Mengambil Data
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
