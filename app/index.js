import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNav from "./router";

export default function Page() {
  return <AppNav />;
}
