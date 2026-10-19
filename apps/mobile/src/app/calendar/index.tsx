import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const VIEWS = ["Day", "Week", "Month"];
const DATES = [
  { day: "Mo", date: "12" },
  { day: "Tu", date: "13" },
  { day: "We", date: "14", active: true },
  { day: "Th", date: "15" },
  { day: "Fr", date: "16" },
  { day: "Sa", date: "17" },
  { day: "Su", date: "18" },
];

const BLOCKS = [
  { time: "8:00 AM", title: "Morning Workout", color: "#3b82f6" },
  { time: "9:00 AM", title: "Study DSA", color: "#8b5cf6" },
  { time: "12:00 PM", title: "Lunch Break", color: "#10b981" },
  { time: "2:00 PM", title: "Project Work", color: "#f59e0b" },
  { time: "5:00 PM", title: "Read a Book", color: "#ec4899" },
];

export default function MobileCalendarScreen() {
  const [selectedView, setSelectedView] = useState("Day");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Calendar</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* View Switcher */}
        <View style={styles.tabContainer}>
          {VIEWS.map((v) => (
            <TouchableOpacity
              key={v}
              style={[styles.tabBtn, selectedView === v && styles.activeTabBtn]}
              onPress={() => setSelectedView(v)}
            >
              <Text style={[styles.tabText, selectedView === v && styles.activeTabText]}>
                {v}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Title */}
        <Text style={styles.dateHeading}>Oct 14, 2026</Text>

        {/* Horizontal Date Strip */}
        <View style={styles.datesRow}>
          {DATES.map((d, index) => (
            <View key={index} style={styles.dateCol}>
              <Text style={styles.dayLabel}>{d.day}</Text>
              <View style={[styles.dateCircle, d.active && styles.activeDateCircle]}>
                <Text style={[styles.dateNumber, d.active && styles.activeDateNumber]}>
                  {d.date}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Time Blocks */}
        <View style={styles.blocksList}>
          {BLOCKS.map((b) => (
            <View key={b.time} style={styles.blockRow}>
              <Text style={styles.blockTime}>{b.time}</Text>
              <View style={[styles.blockCard, { backgroundColor: b.color }]}>
                <Text style={styles.blockTitle}>{b.title}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/tasks/create")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
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
    paddingBottom: 80,
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
  dateHeading: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0a1224",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#142852",
  },
  dateCol: {
    alignItems: "center",
    gap: 4,
  },
  dayLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "600",
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDateCircle: {
    backgroundColor: "#3b6cf6",
  },
  dateNumber: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  activeDateNumber: {
    color: "#ffffff",
  },
  blocksList: {
    gap: 12,
    marginTop: 8,
  },
  blockRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  blockTime: {
    color: "#64748b",
    fontSize: 11,
    width: 60,
    fontFamily: "monospace",
  },
  blockCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
  },
  blockTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  fabText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: -2,
  },
});
