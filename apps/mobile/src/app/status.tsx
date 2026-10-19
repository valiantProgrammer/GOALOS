import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DEMO_HUNTER } from "@goalos/config";

export default function MobileStatusScreen() {
  const [stats, setStats] = useState(DEMO_HUNTER.stats);
  const [unspent, setUnspent] = useState(3);

  const incrementStat = (key: keyof typeof stats) => {
    if (unspent > 0) {
      setStats({ ...stats, [key]: stats[key] + 1 });
      setUnspent(unspent - 1);
    }
  };

  const STAT_CONFIG = [
    { key: "strength" as const, label: "Strength (STR)", icon: "💪" },
    { key: "agility" as const, label: "Agility (AGI)", icon: "⚡" },
    { key: "intelligence" as const, label: "Intelligence (INT)", icon: "🧠" },
    { key: "vitality" as const, label: "Vitality (VIT)", icon: "❤️" },
    { key: "luck" as const, label: "Luck (LUK)", icon: "🍀" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Hunter Status</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Hunter Card */}
      <View style={styles.hunterCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
        <View style={styles.hunterInfo}>
          <Text style={styles.hunterName}>Lv. 32 Shadow Hunter</Text>
          <Text style={styles.rankBadge}>D-RANK HUNTER</Text>
        </View>
      </View>

      {/* Available Points */}
      <View style={styles.pointsBanner}>
        <Text style={styles.pointsText}>⚡ {unspent} Stat Points Available</Text>
      </View>

      {/* Attributes List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attributes</Text>
        <View style={styles.statsList}>
          {STAT_CONFIG.map(({ key, label, icon }) => (
            <View key={key} style={styles.statRow}>
              <View style={styles.statLeft}>
                <Text style={styles.statIcon}>{icon}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
              <View style={styles.statRight}>
                <Text style={styles.statVal}>{stats[key]}</Text>
                <TouchableOpacity
                  style={[
                    styles.plusBtn,
                    unspent === 0 && styles.disabledPlusBtn,
                  ]}
                  disabled={unspent === 0}
                  onPress={() => incrementStat(key)}
                >
                  <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Hunter Profile Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hunter Profile</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Name</Text>
            <Text style={styles.tableVal}>Rupayan</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Class</Text>
            <Text style={styles.tableVal}>Shadow Hunter</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Title</Text>
            <Text style={styles.tableVal}>Discipline Seeker</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Guild</Text>
            <Text style={styles.tableVal}>Solo</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Joined</Text>
            <Text style={styles.tableVal}>Oct 10, 2026</Text>
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
  hunterCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 22,
  },
  hunterInfo: {
    flex: 1,
  },
  hunterName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rankBadge: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
  },
  pointsBanner: {
    backgroundColor: "rgba(0, 210, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(0, 210, 255, 0.4)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  pointsText: {
    color: "#00d2ff",
    fontSize: 13,
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
  statsList: {
    gap: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#142852",
    paddingBottom: 8,
  },
  statLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statIcon: {
    fontSize: 16,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 13,
  },
  statRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statVal: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  plusBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledPlusBtn: {
    backgroundColor: "#1e293b",
    opacity: 0.5,
  },
  plusText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    gap: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#142852",
    paddingBottom: 8,
  },
  tableLabel: {
    color: "#64748b",
    fontSize: 13,
  },
  tableVal: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});
