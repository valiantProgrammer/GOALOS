import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function MobileAnalyticsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Analytics & Progress</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* KPI Cards 2x2 Grid */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Total XP</Text>
          <Text style={styles.kpiVal}>25,450</Text>
          <Text style={styles.kpiDelta}>+12% this month</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Tasks Completed</Text>
          <Text style={styles.kpiVal}>186</Text>
          <Text style={styles.kpiDelta}>+8% this month</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Habit Streak</Text>
          <Text style={[styles.kpiVal, { color: "#f59e0b" }]}>12 Days</Text>
          <Text style={styles.kpiDelta}>+50% vs avg</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Focus Time</Text>
          <Text style={[styles.kpiVal, { color: "#00d2ff" }]}>42h 30m</Text>
          <Text style={styles.kpiDelta}>+18% productivity</Text>
        </View>
      </View>

      {/* Completion Gauge Card */}
      <View style={styles.chartCard}>
        <Text style={styles.cardHeader}>Task Completion Rate</Text>
        <View style={styles.donutRow}>
          <View style={styles.donutCircle}>
            <Text style={styles.donutText}>78%</Text>
          </View>
          <View style={styles.donutLegend}>
            <Text style={styles.legendItem}>🟢 Completed: 78%</Text>
            <Text style={styles.legendItem}>🔵 In Progress: 15%</Text>
            <Text style={styles.legendItem}>⚪ Not Started: 7%</Text>
          </View>
        </View>
      </View>

      {/* Time Allocation Card */}
      <View style={styles.chartCard}>
        <Text style={styles.cardHeader}>Time Distribution (42h 30m)</Text>
        <View style={styles.progressStack}>
          <View style={styles.distRow}>
            <Text style={styles.distLabel}>Study & DSA</Text>
            <Text style={styles.distPercent}>45%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: "45%", backgroundColor: "#3b6cf6" }]} />
          </View>

          <View style={styles.distRow}>
            <Text style={styles.distLabel}>Work & Projects</Text>
            <Text style={styles.distPercent}>25%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: "25%", backgroundColor: "#00d2ff" }]} />
          </View>

          <View style={styles.distRow}>
            <Text style={styles.distLabel}>Health & Fitness</Text>
            <Text style={styles.distPercent}>15%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: "15%", backgroundColor: "#10b981" }]} />
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
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  kpiCard: {
    width: "48%",
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  kpiLabel: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
  },
  kpiVal: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  kpiDelta: {
    color: "#10b981",
    fontSize: 10,
    fontWeight: "bold",
  },
  chartCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  donutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 8,
  },
  donutCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "#00d2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  donutText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  donutLegend: {
    gap: 6,
  },
  legendItem: {
    color: "#94a3b8",
    fontSize: 12,
  },
  progressStack: {
    gap: 8,
  },
  distRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  distPercent: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  track: {
    height: 6,
    backgroundColor: "#050814",
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
