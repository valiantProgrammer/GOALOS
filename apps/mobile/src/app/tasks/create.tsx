import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

const TYPES = ["Task", "Quest", "Habit"];
const CATEGORIES = ["Study", "Work", "Health", "Personal"];
const PRIORITIES = ["Low", "Medium", "High"];

export default function MobileCreateTaskScreen() {
  const [selectedType, setSelectedType] = useState("Quest");
  const [title, setTitle] = useState("Study DSA (1 hour)");
  const [selectedCategory, setSelectedCategory] = useState("Study");
  const [selectedPriority, setSelectedPriority] = useState("Medium");
  const [date, setDate] = useState("Oct 14, 2026");
  const [time, setTime] = useState("10:00 PM");

  const handleSave = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Create / Edit Task</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Type Selector (Task / Quest / Habit) */}
      <View style={styles.typeContainer}>
        {TYPES.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, selectedType === t && styles.activeTypeBtn]}
            onPress={() => setSelectedType(t)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === t && styles.activeTypeText,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title..."
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Category */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.chipsRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.chip,
                selectedCategory === c && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(c)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === c && styles.activeChipText,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Priority */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Priority</Text>
        <View style={styles.chipsRow}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.chip,
                selectedPriority === p && styles.activeChip,
              ]}
              onPress={() => setSelectedPriority(p)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedPriority === p && styles.activeChipText,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date & Time */}
      <View style={styles.dateTimeRow}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.sectionLabel}>Date</Text>
          <View style={styles.input}>
            <Text style={styles.inputText}>{date}</Text>
          </View>
        </View>
        <View style={styles.dateTimeBox}>
          <Text style={styles.sectionLabel}>Time</Text>
          <View style={styles.input}>
            <Text style={styles.inputText}>{time}</Text>
          </View>
        </View>
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.8}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Create {selectedType}</Text>
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
    gap: 18,
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
  typeContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#142852",
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTypeBtn: {
    backgroundColor: "#3b6cf6",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTypeText: {
    color: "#ffffff",
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: "#ffffff",
    fontSize: 14,
    justifyContent: "center",
  },
  inputText: {
    color: "#ffffff",
    fontSize: 14,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  activeChip: {
    borderColor: "#00d2ff",
    backgroundColor: "rgba(0, 210, 255, 0.15)",
  },
  chipText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  activeChipText: {
    color: "#00d2ff",
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 12,
  },
  dateTimeBox: {
    flex: 1,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#3b6cf6",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
