import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const MODES = ["Pomodoro", "Short Break", "Long Break"];
const AMBIENCES = [
  { id: "forest", name: "Forest", icon: "🌲" },
  { id: "rain", name: "Rain", icon: "🌧️" },
  { id: "cafe", name: "Cafe", icon: "☕" },
  { id: "night", name: "Night", icon: "🌙" },
];

export default function MobileFocusScreen() {
  const [activeMode, setActiveMode] = useState("Pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAmbience, setSelectedAmbience] = useState("forest");

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Focus Mode</Text>
      </View>

      {/* Mode Tabs */}
      <View style={styles.tabContainer}>
        {MODES.map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.tabBtn, activeMode === m && styles.activeTabBtn]}
            onPress={() => setActiveMode(m)}
          >
            <Text style={[styles.tabText, activeMode === m && styles.activeTabText]}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Circular Timer Display */}
      <View style={styles.timerCircle}>
        <View style={styles.innerCircle}>
          <Text style={styles.timerDigits}>25:00</Text>
          <Text style={styles.timerSub}>Focus Time</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.primaryButton, isRunning && styles.runningButton]}
        activeOpacity={0.8}
        onPress={() => setIsRunning(!isRunning)}
      >
        <Text style={styles.buttonText}>{isRunning ? "Pause Session" : "Start Session"}</Text>
      </TouchableOpacity>

      {/* Ambience Row */}
      <View style={styles.ambienceSection}>
        <Text style={styles.ambienceTitle}>Ambience Audio</Text>
        <View style={styles.ambienceRow}>
          {AMBIENCES.map((amb) => (
            <TouchableOpacity
              key={amb.id}
              style={[
                styles.ambienceCard,
                selectedAmbience === amb.id && styles.activeAmbienceCard,
              ]}
              onPress={() => setSelectedAmbience(amb.id)}
            >
              <Text style={styles.ambienceIcon}>{amb.icon}</Text>
              <Text
                style={[
                  styles.ambienceName,
                  selectedAmbience === amb.id && styles.activeAmbienceName,
                ]}
              >
                {amb.name}
              </Text>
            </TouchableOpacity>
          ))}
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
    alignItems: "center",
    gap: 24,
  },
  header: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
    width: "100%",
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
  timerCircle: {
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 4,
    borderColor: "#00d2ff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a1224",
    shadowColor: "#00d2ff",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginVertical: 10,
  },
  innerCircle: {
    alignItems: "center",
  },
  timerDigits: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  timerSub: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: "#3b6cf6",
    width: "100%",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  runningButton: {
    backgroundColor: "#f59e0b",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  ambienceSection: {
    width: "100%",
    gap: 12,
    marginTop: 10,
  },
  ambienceTitle: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
  },
  ambienceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  ambienceCard: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    gap: 4,
  },
  activeAmbienceCard: {
    borderColor: "#00d2ff",
    backgroundColor: "rgba(0, 210, 255, 0.1)",
  },
  ambienceIcon: {
    fontSize: 20,
  },
  ambienceName: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
  },
  activeAmbienceName: {
    color: "#00d2ff",
  },
});
