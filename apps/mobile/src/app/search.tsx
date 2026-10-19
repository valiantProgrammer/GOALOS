import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const QUICK_ACTIONS = [
  { title: "New Quest", icon: "⚔️", route: "/tasks/create" },
  { title: "New Habit", icon: "➕", route: "/tasks/create" },
  { title: "Start Focus", icon: "⏱️", route: "/(tabs)/focus" },
  { title: "Calendar", icon: "📅", route: "/calendar" },
];

const RECENT_SEARCHES = ["study dsa", "morning routine", "focus timer", "weekly review"];

export default function MobileSearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar with Search Input */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search quests, habits, goals..."
          placeholderTextColor="#64748b"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.title}
              style={styles.actionCard}
              activeOpacity={0.7}
              onPress={() => router.push(action.route as any)}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <View style={styles.list}>
          {RECENT_SEARCHES.map((search) => (
            <TouchableOpacity key={search} style={styles.searchRow}>
              <Text style={styles.clockIcon}>🕒</Text>
              <Text style={styles.searchText}>{search}</Text>
              <Text style={styles.arrowIcon}>&gt;</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Suggestions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: "#00d2ff" }]}>
          ✨ Suggested by AI
        </Text>
        <View style={styles.list}>
          <View style={styles.suggestionCard}>
            <Text style={styles.sugTitle}>Continue: Study DSA (1 hour)</Text>
            <Text style={styles.sugSub}>Due today at 10:00 PM</Text>
          </View>
          <View style={styles.suggestionCard}>
            <Text style={styles.sugTitle}>Start a 25 min focus session</Text>
            <Text style={styles.sugSub}>Highest focus time slot</Text>
          </View>
        </View>
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
    gap: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    paddingRight: 6,
  },
  backArrow: {
    color: "#00d2ff",
    fontSize: 22,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: "#ffffff",
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionTitle: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
  },
  list: {
    gap: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  clockIcon: {
    fontSize: 14,
  },
  searchText: {
    flex: 1,
    color: "#e2e8f0",
    fontSize: 13,
  },
  arrowIcon: {
    color: "#64748b",
    fontSize: 12,
  },
  suggestionCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "rgba(0, 210, 255, 0.3)",
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  sugTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  sugSub: {
    color: "#64748b",
    fontSize: 11,
  },
});
