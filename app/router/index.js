import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screen/Home";
import TabItem from "./TabItem";
import Login from "../auth/Login";
import Detail from "../Screen/Detail";
import IndexSurvey from "../Screen/Survey/Index";
import InputDataTarget from "../Screen/Survey/InputDataTarget";
import Quiz from "../Screen/Survey/Quiz";
import Profile from "../Screen/Profile";
import RealCount from "../Screen/QuickQount/RealCount";
import Splash from "../Screen/Splash";
import CreateRelawan from "../Screen/Relawan/CreateRelawan";

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabItem
          {...props}
          screenOptions={{
            tabBarShowLabel: false,
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Survey"
        component={IndexSurvey}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function AppNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RealCount"
        component={RealCount}
        options={{
          title: "Real Count",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="InputRelawan"
        component={CreateRelawan}
        options={{
          title: "Input Relawan",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="input-data-target"
        component={InputDataTarget}
        options={{
          title: "Input Responden",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
