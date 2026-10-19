import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { colors } from "@goalos/design-tokens";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#070d1c",
          borderTopColor: "#142852",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#00d2ff",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: {
          fontFamily: "System",
          fontWeight: "600",
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: "Quests",
          tabBarLabel: "Quests",
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarLabel: "Habits",
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: "Focus",
          tabBarLabel: "Focus",
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarLabel: "More",
        }}
      />
    </Tabs>
  );
}
