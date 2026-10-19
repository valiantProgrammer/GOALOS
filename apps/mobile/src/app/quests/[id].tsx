import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function MobileQuestDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [completed, setCompleted] = useState(false);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Quest Details</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Quest Banner Card */}
      <View style={styles.bannerCard}>
        <View style={styles.bannerIconBox}>
          <Text style={styles.bannerIcon}>📖</Text>
        </View>
        <View style={styles.bannerInfo}>
          <Text style={styles.questTitle}>Study DSA (1 hour)</Text>
          <View style={styles.tagRow}>
            <Text style={styles.xpBadge}>+100 XP</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>Study</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descText}>
          Complete 1 hour of DSA practice to strengthen your problem solving skills.
        </Text>
      </View>

      {/* Checklist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Checklist</Text>
        <View style={styles.checklist}>
          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => setCheck1(!check1)}
          >
            <View style={[styles.checkBox, check1 && styles.checkedBox]}>
              {check1 && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={[styles.checkLabel, check1 && styles.completedCheckLabel]}>
              Study for 60 minutes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => setCheck2(!check2)}
          >
            <View style={[styles.checkBox, check2 && styles.checkedBox]}>
              {check2 && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={[styles.checkLabel, check2 && styles.completedCheckLabel]}>
              Solve at least 3 problems
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItem}
            onPress={() => setCheck3(!check3)}
          >
            <View style={[styles.checkBox, check3 && styles.checkedBox]}>
              {check3 && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={[styles.checkLabel, check3 && styles.completedCheckLabel]}>
              Mark as completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Details Box */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Deadline</Text>
          <Text style={styles.detailVal}>Today, 10:00 PM</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailLabel}>Difficulty</Text>
          <Text style={[styles.detailVal, { color: "#f59e0b" }]}>Medium</Text>
        </View>
      </View>

      {/* Rewards Strip */}
      <View style={styles.rewardsCard}>
        <Text style={styles.rewardsTitle}>Quest Rewards</Text>
        <View style={styles.rewardsRow}>
          <Text style={styles.rewardItem}>⚡ +100 XP</Text>
          <Text style={styles.rewardItem}>🪙 +20 Coins</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.primaryButton, completed && styles.completedButton]}
        activeOpacity={0.8}
        onPress={() => setCompleted(!completed)}
      >
        <Text style={styles.buttonText}>
          {completed ? "Quest Completed ✓" : "Mark as Complete"}
        </Text>
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
  bannerCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  bannerIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerIcon: {
    fontSize: 26,
  },
  bannerInfo: {
    flex: 1,
  },
  questTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    alignItems: "center",
  },
  xpBadge: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryBadge: {
    backgroundColor: "rgba(100, 116, 139, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  descText: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 20,
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#64748b",
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  checkMark: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkLabel: {
    color: "#e2e8f0",
    fontSize: 13,
  },
  completedCheckLabel: {
    color: "#64748b",
    textDecorationLine: "line-through",
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  detailBox: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    padding: 12,
  },
  detailLabel: {
    color: "#64748b",
    fontSize: 11,
    marginBottom: 4,
  },
  detailVal: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  rewardsCard: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardsTitle: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
  rewardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  rewardItem: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: "#3b6cf6",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  completedButton: {
    backgroundColor: "#10b981",
    shadowColor: "#10b981",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
