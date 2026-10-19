import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function MobileWeeklyReviewScreen() {
  const [aiGenerating, setAiGenerating] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Weekly Review</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Hero Celebration Card */}
      <View style={styles.heroCard}>
        <Text style={styles.heroIcon}>🎉</Text>
        <Text style={styles.heroTitle}>Great Week, Hunter!</Text>
        <Text style={styles.heroSub}>
          You completed 21 out of 28 quests and routines.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>21 / 28</Text>
            <Text style={styles.statLbl}>Tasks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: "#f59e0b" }]}>12 Days</Text>
            <Text style={styles.statLbl}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statVal, { color: "#00d2ff" }]}>+2,450</Text>
            <Text style={styles.statLbl}>XP</Text>
          </View>
        </View>
      </View>

      {/* AI Assistant Button */}
      <TouchableOpacity
        style={styles.aiButton}
        activeOpacity={0.8}
        onPress={() => setAiGenerating(!aiGenerating)}
      >
        <Text style={styles.aiButtonText}>
          {aiGenerating ? "✨ Analyzing Hunter Performance..." : "✨ Generate AI Review"}
        </Text>
      </TouchableOpacity>

      {/* Key Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Highlights</Text>
        <View style={styles.highlightList}>
          <View style={styles.highlightRow}>
            <Text style={styles.hlIcon}>🔥</Text>
            <View>
              <Text style={styles.hlTitle}>Maintained 7-Day Streak</Text>
              <Text style={styles.hlDesc}>Bonus XP multiplier active</Text>
            </View>
          </View>

          <View style={styles.highlightRow}>
            <Text style={styles.hlIcon}>📖</Text>
            <View>
              <Text style={styles.hlTitle}>Finished Study DSA Module</Text>
              <Text style={styles.hlDesc}>Mastered Graph Algorithms</Text>
            </View>
          </View>

          <View style={styles.highlightRow}>
            <Text style={styles.hlIcon}>⭐</Text>
            <View>
              <Text style={styles.hlTitle}>Reached Hunter Level 32</Text>
              <Text style={styles.hlDesc}>D-Rank progression at 48%</Text>
            </View>
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
  heroCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  heroIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  heroSub: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#142852",
    paddingTop: 12,
  },
  statBox: {
    alignItems: "center",
  },
  statVal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  statLbl: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  aiButton: {
    backgroundColor: "#3b6cf6",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  aiButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  highlightList: {
    gap: 12,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hlIcon: {
    fontSize: 22,
  },
  hlTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  hlDesc: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 1,
  },
});
