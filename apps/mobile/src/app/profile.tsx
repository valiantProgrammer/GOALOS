import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DEMO_HUNTER } from "@goalos/config";

export default function MobileProfileScreen() {
  const hunter = DEMO_HUNTER;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Hunter Profile</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Main Avatar & Identity */}
      <View style={styles.heroCard}>
        <View style={styles.avatarGlow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{hunter.hunterName[0]}</Text>
          </View>
        </View>
        <Text style={styles.hunterName}>{hunter.hunterName}</Text>
        <Text style={styles.hunterClass}>Lv. {hunter.level} • {hunter.class.toUpperCase()} HUNTER</Text>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>D-RANK HUNTER</Text>
        </View>
        <Text style={styles.motto}>&ldquo;{hunter.motto}&rdquo;</Text>
      </View>

      {/* Quick Statistics Strip */}
      <View style={styles.statsStrip}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>2,430</Text>
          <Text style={styles.statLbl}>XP</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>42</Text>
          <Text style={styles.statLbl}>Quests</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>🔥 12</Text>
          <Text style={styles.statLbl}>Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>28h</Text>
          <Text style={styles.statLbl}>Focus</Text>
        </View>
      </View>

      {/* Equipped Titles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipped Title</Text>
        <View style={styles.titleCard}>
          <Text style={styles.titleIcon}>🎖️</Text>
          <View>
            <Text style={styles.titleName}>{hunter.equippedTitle}</Text>
            <Text style={styles.titleDesc}>Earned by maintaining a 7-day uninterrupted streak</Text>
          </View>
        </View>
      </View>

      {/* Profile Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLbl}>Guild</Text>
            <Text style={styles.detailVal}>Solo</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLbl}>Joined Date</Text>
            <Text style={styles.detailVal}>October 10, 2026</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLbl}>System Version</Text>
            <Text style={styles.detailVal}>GoalOS v1.0 (PWA/Native)</Text>
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
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  avatarGlow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(59, 108, 246, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
  },
  hunterName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  hunterClass: {
    fontSize: 12,
    color: "#00d2ff",
    fontWeight: "600",
    marginTop: 2,
  },
  rankBadge: {
    backgroundColor: "rgba(0, 210, 255, 0.15)",
    borderColor: "#00d2ff",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
  },
  rankText: {
    color: "#00d2ff",
    fontSize: 10,
    fontWeight: "bold",
  },
  motto: {
    color: "#94a3b8",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 10,
  },
  statsStrip: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
  },
  statVal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLbl: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
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
  titleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#070d1c",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#142852",
  },
  titleIcon: {
    fontSize: 24,
  },
  titleName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  titleDesc: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  detailsList: {
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#142852",
    paddingBottom: 8,
  },
  detailLbl: {
    color: "#64748b",
    fontSize: 13,
  },
  detailVal: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
});
