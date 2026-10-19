import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface MoreItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  desc: string;
}

const MENU_SECTIONS: { category: string; items: MoreItem[] }[] = [
  {
    category: "Hunter Progression & Signature RPG",
    items: [
      { id: "skills", title: "Skill Tree", icon: "✨", route: "/skills", desc: "Unlock hex constellation passives and focus masteries" },
      { id: "dungeons", title: "Story Mode & Boss Battles", icon: "⚔️", route: "/dungeons", desc: "Conquer chapters, defeat gate bosses, earn titles" },
      { id: "assistant", title: "AI System Assistant", icon: "🤖", route: "/assistant", desc: "Tactical day planning, goal breakdown, motivation" },
      { id: "status", title: "Hunter Status", icon: "⚡", route: "/status", desc: "View attributes, STR, AGI, INT, VIT, LUK" },
      { id: "achievements", title: "Achievements & Titles", icon: "🏆", route: "/achievements", desc: "Track badges, progress, and unlocked titles" },
      { id: "profile", title: "Hunter Profile", icon: "👤", route: "/profile", desc: "View your public hunter showcase" },
    ],
  },
  {
    category: "Productivity & Tracking",
    items: [
      { id: "goals", title: "Goals & Milestones", icon: "🎯", route: "/goals", desc: "Active objectives with progressive milestones" },
      { id: "calendar", title: "Calendar & Schedule", icon: "📅", route: "/calendar", desc: "Time-blocking, schedule and planner" },
      { id: "shop", title: "Reward Shop & Inventory", icon: "💎", route: "/shop", desc: "Spend hunter coins on auras, themes & titles" },
      { id: "analytics", title: "Analytics & Progress", icon: "📊", route: "/analytics", desc: "XP trajectories, habit heatmaps & distributions" },
      { id: "review", title: "Weekly Review", icon: "📝", route: "/review", desc: "Weekly scorecard with AI synthesis" },
      { id: "search", title: "Command Center & Search", icon: "🔍", route: "/search", desc: "Slash commands and quick actions" },
    ],
  },
  {
    category: "Routines & Actions",
    items: [
      { id: "routine-builder", title: "Routine Builder", icon: "🌅", route: "/habits/builder", desc: "Configure morning, afternoon & night routines" },
      { id: "create-task", title: "Create Task / Quest", icon: "➕", route: "/tasks/create", desc: "Add new quests, habits or tasks" },
      { id: "notifications", title: "Notification Center", icon: "🔔", route: "/notifications", desc: "Review chronological quest & level alerts" },
    ],
  },
  {
    category: "System & Preferences",
    items: [
      { id: "settings", title: "Settings & Preferences", icon: "⚙️", route: "/settings", desc: "Theme swatches, sounds, UI density" },
      { id: "account", title: "Account, Privacy & Data", icon: "🔒", route: "/account", desc: "2FA, connected devices, data exports" },
    ],
  },
];


export default function MobileMoreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>System Menu</Text>
        <Text style={styles.subtitle}>Extended Hunter Features</Text>
      </View>

      {MENU_SECTIONS.map((sec) => (
        <View key={sec.category} style={styles.section}>
          <Text style={styles.categoryTitle}>{sec.category}</Text>
          <View style={styles.itemsList}>
            {sec.items.map((it) => (
              <TouchableOpacity
                key={it.id}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => router.push(it.route as any)}
              >
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>{it.icon}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{it.title}</Text>
                  <Text style={styles.cardDesc}>{it.desc}</Text>
                </View>
                <Text style={styles.chevron}>&gt;</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
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
    gap: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  section: {
    gap: 10,
  },
  categoryTitle: {
    color: "#00d2ff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemsList: {
    gap: 10,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 20,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardDesc: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 2,
  },
  chevron: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "bold",
  },
});
