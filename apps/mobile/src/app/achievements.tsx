import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["All", "Unlocked", "In Progress"];

const ACHIEVEMENTS = [
  { id: "a-1", title: "First Step", desc: "Complete your first quest", status: "Unlocked", icon: "🏆" },
  { id: "a-2", title: "7 Day Streak", desc: "Maintain a 7-day streak", status: "Unlocked", icon: "🔥" },
  { id: "a-3", title: "Early Bird", desc: "Complete 10 morning routines", status: "Unlocked", icon: "🌅" },
  { id: "a-4", title: "Book Reader", desc: "Read 10 books this year", status: "In Progress", icon: "📚" },
  { id: "a-5", title: "Fitness Master", desc: "Log 30 workout sessions", status: "Locked", icon: "💪" },
  { id: "a-6", title: "Knowledge Seeker", desc: "Complete 50 study quests", status: "In Progress", icon: "🧠" },
];

export default function MobileAchievementsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = ACHIEVEMENTS.filter((a) => {
    if (activeTab === "Unlocked") return a.status === "Unlocked";
    if (activeTab === "In Progress") return a.status === "In Progress";
    return true;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Achievements & Titles</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Total Progress</Text>
          <Text style={styles.progressVal}>38%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: "38%" }]} />
        </View>
      </View>

      {/* Filter Tabs */}
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

      {/* Badges List */}
      <View style={styles.list}>
        {filtered.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <View
              style={[
                styles.badge,
                item.status === "Unlocked" && styles.unlockedBadge,
                item.status === "In Progress" && styles.progressBadge,
                item.status === "Locked" && styles.lockedBadge,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  item.status === "Unlocked" && styles.unlockedText,
                  item.status === "In Progress" && styles.progressText,
                  item.status === "Locked" && styles.lockedText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        ))}
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
    gap: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  progressCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },
  progressVal: {
    color: "#00d2ff",
    fontSize: 14,
    fontWeight: "bold",
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#050814",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#142852",
  },
  fill: {
    height: "100%",
    backgroundColor: "#00d2ff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
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
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 22,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardDesc: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  unlockedBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981",
  },
  unlockedText: {
    color: "#10b981",
    fontSize: 10,
    fontWeight: "bold",
  },
  progressBadge: {
    backgroundColor: "rgba(0, 210, 255, 0.15)",
    borderColor: "#00d2ff",
  },
  progressText: {
    color: "#00d2ff",
    fontSize: 10,
    fontWeight: "bold",
  },
  lockedBadge: {
    backgroundColor: "rgba(100, 116, 139, 0.15)",
    borderColor: "#64748b",
  },
  lockedText: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "bold",
  },
});
