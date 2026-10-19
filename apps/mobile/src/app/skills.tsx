import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DEMO_HUNTER } from "@goalos/config";

const TABS = ["Offense", "Defense", "Utility", "Special"];

export default function MobileSkillsScreen() {
  const [activeTab, setActiveTab] = useState("Offense");
  const [skillPoints, setSkillPoints] = useState(DEMO_HUNTER.skillPoints);
  const [focusLevel, setFocusLevel] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleUnlock = () => {
    if (focusLevel >= 5) {
      setToastMessage("Skill is already maxed!");
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }
    setFocusLevel((prev) => prev + 1);
    setSkillPoints((prev) => Math.max(0, prev - 1));
    setToastMessage(`Focus Mastery upgraded to Level ${focusLevel + 1}/5!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Skill Tree</Text>
        <View style={styles.spPill}>
          <Text style={styles.spText}>✨ {skillPoints} SP</Text>
        </View>
      </View>

      {/* Toast Notification */}
      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

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

      {/* Hexagonal Constellation Area */}
      <View style={styles.constellationCard}>
        {/* Decorative Grid Lines */}
        <View style={styles.vertLine} />
        <View style={styles.diagLineLeft} />
        <View style={styles.diagLineRight} />

        {/* Top Node (Time Control) */}
        <View style={[styles.nodeCircle, styles.topNode]}>
          <Text style={styles.nodeIcon}>⏱️</Text>
        </View>

        {/* Left Node (Shadow Surge) */}
        <View style={[styles.nodeCircle, styles.leftNode, styles.emeraldBorder]}>
          <Text style={styles.nodeIcon}>⚡</Text>
        </View>

        {/* Center Node (Focus Mastery - Selected) */}
        <View style={[styles.nodeCircle, styles.centerNode, styles.purpleBorder]}>
          <Text style={styles.centerNodeIcon}>🎯</Text>
        </View>

        {/* Right Node (Mental Fortitude) */}
        <View style={[styles.nodeCircle, styles.rightNode]}>
          <Text style={styles.nodeIcon}>🛡️</Text>
        </View>
      </View>

      {/* Selected Skill Card */}
      <View style={styles.skillCard}>
        <Text style={styles.skillTitle}>Focus Mastery</Text>
        <Text style={styles.skillDesc}>Increase focus duration by 25%</Text>
        <View style={styles.levelRow}>
          <Text style={styles.levelNum}>{focusLevel}</Text>
          <Text style={styles.levelTotal}>/5</Text>
        </View>
      </View>

      {/* Unlock Button */}
      <TouchableOpacity style={styles.unlockBtn} activeOpacity={0.8} onPress={handleUnlock}>
        <Text style={styles.unlockBtnText}>Unlock for 500 XP</Text>
      </TouchableOpacity>

      {/* Recommended Next Section */}
      <Text style={styles.sectionTitle}>Recommended Next</Text>
      <View style={styles.nextList}>
        {/* Row 1 */}
        <View style={styles.nextItem}>
          <View style={[styles.nextIconBox, { borderColor: "#b45309", backgroundColor: "#27170a" }]}>
            <Text style={{ fontSize: 16 }}>⏱️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Time Control</Text>
            <Text style={styles.nextDesc}>Reduces break time by 20%</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.nextItem}>
          <View style={[styles.nextIconBox, { borderColor: "#ca8a04", backgroundColor: "#201a08" }]}>
            <Text style={{ fontSize: 16 }}>🛡️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Mental Fortitude</Text>
            <Text style={styles.nextDesc}>Increase max focus by 1</Text>
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
    paddingBottom: 60,
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
  spPill: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  spText: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
  },
  toast: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#00d2ff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  toastText: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
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
  constellationCard: {
    backgroundColor: "#070e1c",
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 20,
    height: 200,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  vertLine: {
    position: "absolute",
    width: 2,
    height: 120,
    backgroundColor: "#1e3a8a",
    top: 30,
  },
  diagLineLeft: {
    position: "absolute",
    width: 80,
    height: 2,
    backgroundColor: "#10b981",
    transform: [{ rotate: "35deg" }],
    top: 90,
    left: 70,
  },
  diagLineRight: {
    position: "absolute",
    width: 80,
    height: 2,
    backgroundColor: "#3b82f6",
    transform: [{ rotate: "-35deg" }],
    top: 90,
    right: 70,
  },
  nodeCircle: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#091428",
    borderWidth: 2,
    borderColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  topNode: {
    top: 15,
  },
  leftNode: {
    left: 45,
    top: 75,
  },
  centerNode: {
    width: 54,
    height: 54,
    borderRadius: 16,
    top: 105,
    backgroundColor: "#1a082e",
  },
  rightNode: {
    right: 45,
    top: 75,
  },
  emeraldBorder: {
    borderColor: "#10b981",
  },
  purpleBorder: {
    borderColor: "#c084fc",
  },
  nodeIcon: {
    fontSize: 18,
  },
  centerNodeIcon: {
    fontSize: 24,
  },
  skillCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 4,
  },
  skillTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skillDesc: {
    color: "#64748b",
    fontSize: 12,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
  },
  levelNum: {
    color: "#00d2ff",
    fontSize: 18,
    fontWeight: "bold",
  },
  levelTotal: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  unlockBtn: {
    backgroundColor: "#3b6cf6",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  unlockBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  nextList: {
    gap: 10,
  },
  nextItem: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  nextIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nextTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  nextDesc: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
});
