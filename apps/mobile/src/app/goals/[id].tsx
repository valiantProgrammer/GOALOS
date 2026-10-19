import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["Overview", "Milestones", "Notes"];

const MILESTONES = [
  { id: "m-1", title: "Learn HTML, CSS, JS", status: "Completed" },
  { id: "m-2", title: "Learn React", status: "In Progress" },
  { id: "m-3", title: "Learn Node.js", status: "Not Started" },
  { id: "m-4", title: "Build 3 Projects", status: "Not Started" },
  { id: "m-5", title: "Deploy Portfolio", status: "Not Started" },
];

export default function MobileGoalDetailsScreen() {
  const [activeTab, setActiveTab] = useState("Milestones");

  const getStatusChip = (s: string) => {
    switch (s) {
      case "Completed":
        return { bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#10b981" };
      case "In Progress":
        return { bg: "rgba(0, 210, 255, 0.15)", border: "#00d2ff", text: "#00d2ff" };
      default:
        return { bg: "rgba(100, 116, 139, 0.15)", border: "#64748b", text: "#64748b" };
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Goal Details</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Main Goal Card */}
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>💻</Text>
          </View>
          <View style={styles.goalInfo}>
            <Text style={styles.goalTitle}>Become a Full Stack Developer</Text>
            <Text style={styles.progressPercent}>78% Complete</Text>
          </View>
        </View>

        <View style={styles.track}>
          <View style={[styles.fill, { width: "78%" }]} />
        </View>
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

      {/* Milestones List */}
      <View style={styles.list}>
        {MILESTONES.map((m) => {
          const chip = getStatusChip(m.status);
          return (
            <View key={m.id} style={styles.milestoneCard}>
              <View style={styles.milestoneLeft}>
                <View
                  style={[
                    styles.checkCircle,
                    m.status === "Completed" && styles.checkCompleted,
                    m.status === "In Progress" && styles.checkProgress,
                  ]}
                >
                  <Text style={styles.checkMark}>
                    {m.status === "Completed" ? "✓" : m.status === "In Progress" ? "⚡" : "○"}
                  </Text>
                </View>
                <Text style={styles.milestoneTitle}>{m.title}</Text>
              </View>

              <View
                style={[
                  styles.statusChip,
                  { backgroundColor: chip.bg, borderColor: chip.border },
                ]}
              >
                <Text style={[styles.statusChipText, { color: chip.text }]}>
                  {m.status}
                </Text>
              </View>
            </View>
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
  goalCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  goalHeader: {
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
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressPercent: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
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
  milestoneCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  milestoneLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#64748b",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCompleted: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  checkProgress: {
    borderColor: "#00d2ff",
    backgroundColor: "rgba(0, 210, 255, 0.2)",
  },
  checkMark: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  milestoneTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
