import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const INITIAL_NOTIFICATIONS = [
  { id: "n-1", section: "Today", title: "Quest Completed!", body: "Morning Workout +80 XP awarded", time: "10 min ago", icon: "⚔️", unread: true },
  { id: "n-2", section: "Today", title: "Level Up!", body: "Congratulations! You reached Level 32", time: "25 min ago", icon: "⭐", unread: true },
  { id: "n-3", section: "Today", title: "New Achievement", body: "Early Bird badge unlocked", time: "1 hour ago", icon: "🏆", unread: false },
  { id: "n-4", section: "Today", title: "Friend Request", body: "Priya sent you a party invitation", time: "2 hours ago", icon: "👥", unread: false },
  { id: "n-5", section: "Yesterday", title: "Weekly Challenge", body: "3 days remaining for Chapter 1", time: "1 day ago", icon: "⏳", unread: false },
  { id: "n-6", section: "Yesterday", title: "Party Invitation", body: "Karan invited you to DSA Study Group", time: "1 day ago", icon: "🛡️", unread: false },
  { id: "n-7", section: "This Week", title: "System Update", body: "GoalOS v1.0 activated with cross-device sync", time: "3 days ago", icon: "⚡", unread: false },
];

export default function MobileNotificationsScreen() {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setItems(items.map((it) => ({ ...it, unread: false })));
  };

  const sections = ["Today", "Yesterday", "This Week"];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markReadText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Grouped Notifications */}
      {sections.map((sec) => {
        const secItems = items.filter((it) => it.section === sec);
        if (secItems.length === 0) return null;
        return (
          <View key={sec} style={styles.sectionBox}>
            <Text style={styles.sectionHeader}>{sec}</Text>
            <View style={styles.list}>
              {secItems.map((n) => (
                <View key={n.id} style={[styles.card, n.unread && styles.unreadCard]}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.icon}>{n.icon}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{n.title}</Text>
                      <Text style={styles.timeText}>{n.time}</Text>
                    </View>
                    <Text style={styles.bodyText}>{n.body}</Text>
                  </View>
                  {n.unread && <View style={styles.unreadDot} />}
                </View>
              ))}
            </View>
          </View>
        );
      })}
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
  markReadText: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionBox: {
    gap: 8,
  },
  sectionHeader: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  list: {
    gap: 10,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  unreadCard: {
    borderColor: "rgba(0, 210, 255, 0.4)",
    backgroundColor: "rgba(10, 18, 36, 0.9)",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  timeText: {
    color: "#64748b",
    fontSize: 11,
  },
  bodyText: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00d2ff",
  },
});
