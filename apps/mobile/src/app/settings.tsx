import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";

const THEMES = [
  { id: "default", name: "Default", color: "#3b6cf6" },
  { id: "purple", name: "Purple", color: "#a855f7" },
  { id: "blue", name: "Blue", color: "#00d2ff" },
  { id: "red", name: "Red", color: "#ef4444" },
];

const DENSITIES = ["Comfortable", "Compact", "Spacious"];

export default function MobileSettingsScreen() {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [selectedDensity, setSelectedDensity] = useState("Comfortable");
  const [autoSave, setAutoSave] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [sound, setSound] = useState(true);
  const [quotes, setQuotes] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Settings</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Theme & Appearance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme & Appearance</Text>
        <View style={styles.themesRow}>
          {THEMES.map((th) => (
            <TouchableOpacity
              key={th.id}
              style={[
                styles.themeCard,
                selectedTheme === th.id && styles.activeThemeCard,
              ]}
              onPress={() => setSelectedTheme(th.id)}
            >
              <View style={[styles.colorPreview, { backgroundColor: th.color }]} />
              <Text style={styles.themeName}>{th.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* UI Density */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UI Density</Text>
        <View style={styles.densityRow}>
          {DENSITIES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[
                styles.densityBtn,
                selectedDensity === d && styles.activeDensityBtn,
              ]}
              onPress={() => setSelectedDensity(d)}
            >
              <Text
                style={[
                  styles.densityText,
                  selectedDensity === d && styles.activeDensityText,
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* General Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.toggleList}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Auto Save</Text>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: "#142852", true: "#3b6cf6" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Enable Animations</Text>
            <Switch
              value={animations}
              onValueChange={setAnimations}
              trackColor={{ false: "#142852", true: "#3b6cf6" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Play Sound Effects</Text>
            <Switch
              value={sound}
              onValueChange={setSound}
              trackColor={{ false: "#142852", true: "#3b6cf6" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Show Motivational Quotes</Text>
            <Switch
              value={quotes}
              onValueChange={setQuotes}
              trackColor={{ false: "#142852", true: "#3b6cf6" }}
              thumbColor="#ffffff"
            />
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
  themesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  themeCard: {
    flex: 1,
    backgroundColor: "#070d1c",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    gap: 6,
  },
  activeThemeCard: {
    borderColor: "#00d2ff",
    backgroundColor: "rgba(0, 210, 255, 0.1)",
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  themeName: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "600",
  },
  densityRow: {
    flexDirection: "row",
    backgroundColor: "#070d1c",
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#142852",
  },
  densityBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeDensityBtn: {
    backgroundColor: "#3b6cf6",
  },
  densityText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
  },
  activeDensityText: {
    color: "#ffffff",
  },
  toggleList: {
    gap: 12,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: {
    color: "#e2e8f0",
    fontSize: 13,
  },
});
