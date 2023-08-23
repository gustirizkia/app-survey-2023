import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <>
      <View className="absolute z-40  h-screen bottom-0 w-full  justify-center items-center">
        <View className="bg-slate-400 opacity-20 w-full min-h-screen top-0  absolute"></View>
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading data</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
