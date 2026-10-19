import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const DAYS = [
  { day: "Mon", date: "21" },
  { day: "Tue", date: "22" },
  { day: "Wed", date: "23" },
  { day: "Thu", date: "24" },
  { day: "Fri", date: "25" },
  { day: "Sat", date: "26" },
  { day: "Sun", date: "27" },
];

const INITIAL_HABITS = [
  { id: "h-1", title: "Workout", freq: "Daily • 1/1", done: true, icon: "🏃" },
  { id: "h-2", title: "Study", freq: "Daily • 2/2", done: true, icon: "📚" },
  { id: "h-3", title: "Read", freq: "Daily • 0/1", done: false, icon: "📖" },
  { id: "h-4", title: "Healthy Food", freq: "Daily • 1/1", done: true, icon: "🥗" },
  { id: "h-5", title: "No Social Media", freq: "Daily • 0/1", done: false, icon: "📵" },
];

export default function MobileHabitsScreen() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Habits</Text>
        <TouchableOpacity
          style={styles.routineBtn}
          onPress={() => router.push("/habits/builder")}
        >
          <Text style={styles.routineBtnText}>Routines &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Week Day Selector */}
      <View style={styles.daysRow}>
        {DAYS.map((d, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBox,
              selectedDay === index && styles.activeDayBox,
            ]}
            onPress={() => setSelectedDay(index)}
          >
            <Text
              style={[
                styles.dayLabel,
                selectedDay === index && styles.activeDayLabel,
              ]}
            >
              {d.day}
            </Text>
            <Text
              style={[
                styles.dateLabel,
                selectedDay === index && styles.activeDateLabel,
              ]}
            >
              {d.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Habits List */}
      <View style={styles.list}>
        {habits.map((h) => (
          <TouchableOpacity
            key={h.id}
            style={styles.habitCard}
            activeOpacity={0.8}
            onPress={() => toggleHabit(h.id)}
          >
            <View style={styles.habitLeft}>
              <View style={styles.iconCircle}>
                <Text style={styles.habitIcon}>{h.icon}</Text>
              </View>
              <View>
                <Text style={styles.habitTitle}>{h.title}</Text>
                <Text style={styles.habitFreq}>{h.freq}</Text>
              </View>
            </View>

            <View style={[styles.checkCircle, h.done && styles.doneCircle]}>
              {h.done && <Text style={styles.checkIcon}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Habit CTA */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => router.push("/tasks/create")}
      >
        <Text style={styles.addButtonText}>+ Add Habit</Text>
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
  routineBtn: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  routineBtnText: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayBox: {
    width: 44,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    alignItems: "center",
    gap: 4,
  },
  activeDayBox: {
    backgroundColor: "#3b6cf6",
    borderColor: "#3b6cf6",
  },
  dayLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "600",
  },
  activeDayLabel: {
    color: "#ffffff",
  },
  dateLabel: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "bold",
  },
  activeDateLabel: {
    color: "#ffffff",
  },
  list: {
    gap: 12,
    marginBottom: 24,
  },
  habitCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  habitLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(59, 108, 246, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(59, 108, 246, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  habitIcon: {
    fontSize: 18,
  },
  habitTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  habitFreq: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#142852",
    alignItems: "center",
    justifyContent: "center",
  },
  doneCircle: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  checkIcon: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
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
