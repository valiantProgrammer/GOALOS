import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";

const TABS = ["Morning", "Afternoon", "Evening", "Night"];

const INITIAL_ROUTINE = [
  { id: "r-1", title: "Wake Up", time: "06:00 AM", enabled: true, icon: "⏰" },
  { id: "r-2", title: "Drink Water", time: "06:10 AM", enabled: true, icon: "💧" },
  { id: "r-3", title: "Morning Exercise", time: "06:30 AM", enabled: true, icon: "🏃" },
  { id: "r-4", title: "Meditation", time: "06:45 AM", enabled: true, icon: "🧘" },
  { id: "r-5", title: "Plan My Day", time: "07:00 AM", enabled: true, icon: "📋" },
];

export default function MobileRoutineBuilderScreen() {
  const [activeTab, setActiveTab] = useState("Morning");
  const [items, setItems] = useState(INITIAL_ROUTINE);

  const toggleItem = (id: string) => {
    setItems(
      items.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it))
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Routine Builder</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Time-of-Day Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.activeTabBtn]}
            onPress={() => setActiveTab(t)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === t && styles.activeTabText,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Routine Items List */}
      <View style={styles.list}>
        {items.map((it) => (
          <View key={it.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.itemIcon}>{it.icon}</Text>
              </View>
              <View>
                <Text style={styles.itemTitle}>{it.title}</Text>
                <Text style={styles.itemTime}>{it.time}</Text>
              </View>
            </View>

            <Switch
              value={it.enabled}
              onValueChange={() => toggleItem(it.id)}
              trackColor={{ false: "#142852", true: "#10b981" }}
              thumbColor="#ffffff"
            />
          </View>
        ))}
      </View>

      {/* Add Item CTA */}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>+ Add Routine Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050814",
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    paddingRight: 10,
  },
  backArrow: {
    color: "#00d2ff",
    fontSize: 22,
    fontWeight: "bold",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#142852",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTabBtn: {
    backgroundColor: "#3b6cf6",
  },
  tabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabText: {
    color: "#ffffff",
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(59, 108, 246, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  itemIcon: {
    fontSize: 18,
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  itemTime: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#00d2ff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
