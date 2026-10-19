import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["Daily", "Weekly", "Story", "Special"];

const QUESTS = [
  { id: "q-1", title: "Morning Workout", xp: 80, status: "Completed", icon: "🛡️" },
  { id: "q-2", title: "Study DSA (1 hour)", xp: 100, status: "In Progress", icon: "📖" },
  { id: "q-3", title: "Read a Book", xp: 50, status: "Start", icon: "📚" },
  { id: "q-4", title: "Drink 2L Water", xp: 30, status: "Start", icon: "💧" },
  { id: "q-5", title: "Meditate (10 min)", xp: 50, status: "Start", icon: "🧘" },
  { id: "q-6", title: "Plan Tomorrow", xp: 40, status: "Locked", icon: "📅" },
];

export default function MobileQuestLogScreen() {
  const [activeTab, setActiveTab] = useState("Daily");

  const getChipStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return { bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#10b981" };
      case "In Progress":
        return { bg: "rgba(0, 210, 255, 0.15)", border: "#00d2ff", text: "#00d2ff" };
      case "Locked":
        return { bg: "rgba(100, 116, 139, 0.15)", border: "#64748b", text: "#64748b" };
      default:
        return { bg: "rgba(59, 108, 246, 0.15)", border: "#3b6cf6", text: "#3b6cf6" };
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quests</Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/tasks/create")}
        >
          <Text style={styles.actionBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented Filter Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quest Cards */}
      <View style={styles.list}>
        {QUESTS.map((q) => {
          const chip = getChipStyle(q.status);
          return (
            <TouchableOpacity
              key={q.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push(`/quests/${q.id}`)}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.cardIcon}>{q.icon}</Text>
                <View>
                  <Text style={styles.cardTitle}>{q.title}</Text>
                  <Text style={styles.cardXp}>+{q.xp} XP</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusChip,
                  { backgroundColor: chip.bg, borderColor: chip.border },
                ]}
              >
                <Text style={[styles.statusChipText, { color: chip.text }]}>
                  {q.status}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  actionBtn: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnText: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
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
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabText: {
    color: "#ffffff",
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
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
  cardIcon: {
    fontSize: 22,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  cardXp: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: "bold",
  },
});
