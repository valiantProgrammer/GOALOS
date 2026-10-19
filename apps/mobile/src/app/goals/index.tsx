import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["Active", "Completed", "Archived"];

const GOALS = [
  { id: "g-1", title: "Become a Full Stack Developer", progress: 78, icon: "💻" },
  { id: "g-2", title: "Improve Physical Health", progress: 45, icon: "🛡️" },
  { id: "g-3", title: "Read 50 Books", progress: 20, icon: "📚" },
  { id: "g-4", title: "Build Personal Brand", progress: 10, icon: "📢" },
];

export default function MobileGoalsScreen() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Goals</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.activeTabBtn]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Goals List */}
      <View style={styles.list}>
        {GOALS.map((g) => (
          <TouchableOpacity
            key={g.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push(`/goals/${g.id}` as any)}
          >
            <View style={styles.cardTop}>
              <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>{g.icon}</Text>
                </View>
                <View>
                  <Text style={styles.goalTitle}>{g.title}</Text>
                  <Text style={styles.progressText}>{g.progress}%</Text>
                </View>
              </View>
              <Text style={styles.chevron}>&gt;</Text>
            </View>

            {/* Progress Track */}
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${g.progress}%` }]} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Goal CTA */}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
        <Text style={styles.addButtonText}>+ New Goal</Text>
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
    gap: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  goalTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressText: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
  },
  chevron: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "bold",
  },
  track: {
    height: 6,
    backgroundColor: "#050814",
    borderRadius: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#142852",
  },
  fill: {
    height: "100%",
    backgroundColor: "#00d2ff",
  },
  addButton: {
    backgroundColor: "#3b6cf6",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
