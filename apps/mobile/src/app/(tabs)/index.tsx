import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { DEMO_HUNTER } from "@goalos/config";

const TODAY_QUESTS = [
  { id: "q-1", title: "Morning Workout", xp: 80, status: "Completed", icon: "🛡️" },
  { id: "q-2", title: "Study DSA (1 hour)", xp: 100, status: "Start", icon: "📖" },
  { id: "q-3", title: "Read a Book", xp: 50, status: "Start", icon: "📚" },
];

export default function MobileDashboardScreen() {
  const hunter = DEMO_HUNTER;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.tabletContent]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning, Hunter</Text>
          <Text style={styles.dateText}>Tue, Oct 14, 2026</Text>
        </View>
        <TouchableOpacity
          style={styles.bellBadge}
          onPress={() => router.push("/notifications")}
        >
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Two-pane wrapper for tablet */}
      <View style={[styles.mainLayout, isTablet && styles.tabletLayout]}>
        {/* Left Pane: Level Card & Stats */}
        <View style={[styles.pane, isTablet && styles.tabletPane]}>
          <View style={styles.levelCard}>
            <View style={styles.avatarRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{hunter.hunterName[0]}</Text>
              </View>
              <View style={styles.hunterInfo}>
                <Text style={styles.levelTitle}>Lv. {hunter.level}</Text>
                <Text style={styles.classTitle}>{hunter.class.toUpperCase()} HUNTER</Text>
              </View>
            </View>

            {/* XP Track */}
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${(hunter.currentXp / hunter.nextLevelXp) * 100}%` }]} />
            </View>
            <Text style={styles.xpText}>{hunter.currentXp} / {hunter.nextLevelXp} XP</Text>

            {/* Stats Row */}
            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>12</Text>
                <Text style={styles.statLbl}>Quests</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>4/8</Text>
                <Text style={styles.statLbl}>Habits</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>🔥 12</Text>
                <Text style={styles.statLbl}>Streak</Text>
              </View>
            </View>
          </View>

          {/* Motivational Quote */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>&ldquo;Discipline today, a stronger you tomorrow.&rdquo;</Text>
          </View>
        </View>

        {/* Right Pane: Today's Quests */}
        <View style={[styles.pane, isTablet && styles.tabletPane]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Quests</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/quests")}>
              <Text style={styles.seeAllText}>See All &gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.questList}>
            {TODAY_QUESTS.map((q) => (
              <TouchableOpacity
                key={q.id}
                style={styles.questCard}
                activeOpacity={0.7}
                onPress={() => router.push(`/quests/${q.id}`)}
              >
                <View style={styles.questLeft}>
                  <Text style={styles.questIcon}>{q.icon}</Text>
                  <View>
                    <Text style={styles.questTitle}>{q.title}</Text>
                    <Text style={styles.questXp}>+{q.xp} XP</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusChip,
                    q.status === "Completed" ? styles.completedChip : styles.startChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      q.status === "Completed" ? styles.completedChipText : styles.startChipText,
                    ]}
                  >
                    {q.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
  tabletContent: {
    padding: 32,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f8fafc",
  },
  dateText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  bellBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0a1224",
    borderColor: "#142852",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bellIcon: {
    fontSize: 16,
  },
  mainLayout: {
    gap: 16,
  },
  tabletLayout: {
    flexDirection: "row",
    gap: 24,
  },
  pane: {
    gap: 16,
  },
  tabletPane: {
    flex: 1,
  },
  levelCard: {
    backgroundColor: "#0a1224",
    borderColor: "#142852",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 20,
  },
  hunterInfo: {
    flex: 1,
  },
  levelTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  classTitle: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "600",
  },
  xpTrack: {
    height: 8,
    backgroundColor: "#050814",
    borderRadius: 4,
    overflow: "hidden",
    borderColor: "#142852",
    borderWidth: 1,
  },
  xpFill: {
    height: "100%",
    backgroundColor: "#00d2ff",
    borderRadius: 4,
  },
  xpText: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "right",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#142852",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statVal: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  statLbl: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  quoteCard: {
    backgroundColor: "#070d1c",
    borderColor: "#142852",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  quoteText: {
    color: "#94a3b8",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  seeAllText: {
    fontSize: 12,
    color: "#00d2ff",
    fontWeight: "600",
  },
  questList: {
    gap: 10,
  },
  questCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  questIcon: {
    fontSize: 20,
  },
  questTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  questXp: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
  },
  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  completedChip: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "#10b981",
  },
  completedChipText: {
    color: "#10b981",
    fontSize: 11,
    fontWeight: "bold",
  },
  startChip: {
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderColor: "#3b6cf6",
  },
  startChipText: {
    color: "#3b6cf6",
    fontSize: 11,
    fontWeight: "bold",
  },
});
