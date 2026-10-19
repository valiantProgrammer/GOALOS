import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["Friends", "Party", "Leaderboard"];

export default function MobileCommunityScreen() {
  const [activeTab, setActiveTab] = useState("Friends");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [parties, setParties] = useState([
    { id: "p-1", name: "Code Hunters", members: "5 Members", focus: "Studying DSA", joined: false },
    { id: "p-2", name: "Study Gang", members: "4 Members", focus: "Daily challenges", joined: false },
    { id: "p-3", name: "Fitness Crew", members: "3 Members", focus: "Workout together", joined: false },
  ]);

  const [friends, setFriends] = useState([
    { id: "f-1", name: "Akash", status: "Online", statusColor: "#22c55e", icon: "👤" },
    { id: "f-2", name: "Riya", status: "In Focus Mode", statusColor: "#ef4444", icon: "👤" },
  ]);

  const handleJoinParty = (id: string) => {
    setParties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, joined: !p.joined } : p))
    );
    const target = parties.find((p) => p.id === id);
    setToastMessage(target?.joined ? "Left party group." : `Joined ${target?.name}!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Friends & Party</Text>
        <Text style={{ fontSize: 16 }}>👥</Text>
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

      {/* Big Create Party Button */}
      <TouchableOpacity
        style={styles.createPartyBtn}
        activeOpacity={0.8}
        onPress={() => {
          setToastMessage("Party formation protocol initiated!");
          setTimeout(() => setToastMessage(null), 2500);
        }}
      >
        <Text style={styles.createPartyText}>Create Party +</Text>
      </TouchableOpacity>

      {/* Section 1: Active Parties */}
      <Text style={styles.sectionTitle}>Active Parties</Text>
      <View style={styles.list}>
        {parties.map((party) => (
          <View key={party.id} style={styles.card}>
            <View style={styles.avatarBox}>
              <Text style={{ fontSize: 20 }}>⚔️</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{party.name}</Text>
              <Text style={styles.cardSub}>{party.members}</Text>
              <Text style={styles.cardFocus}>{party.focus}</Text>
            </View>

            <TouchableOpacity
              style={[styles.joinBtn, party.joined && styles.joinedBtn]}
              onPress={() => handleJoinParty(party.id)}
            >
              <Text style={styles.joinText}>{party.joined ? "Joined" : "Join"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Section 2: Your Friends */}
      <Text style={styles.sectionTitle}>Your Friends</Text>
      <View style={styles.list}>
        {friends.map((f) => (
          <View key={f.id} style={styles.card}>
            <View style={styles.avatarBox}>
              <Text style={{ fontSize: 18 }}>{f.icon}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{f.name}</Text>
              <Text style={[styles.statusText, { color: f.statusColor }]}>{f.status}</Text>
            </View>

            <TouchableOpacity style={styles.chatBtn}>
              <Text style={{ fontSize: 16 }}>💬</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  createPartyBtn: {
    backgroundColor: "#3b6cf6",
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b6cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  createPartyText: {
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
    marginTop: 4,
  },
  list: {
    gap: 10,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    borderWidth: 1,
    borderColor: "#1e3a8a",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  cardSub: {
    color: "#94a3b8",
    fontSize: 11,
  },
  cardFocus: {
    color: "#00d2ff",
    fontSize: 10,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  joinBtn: {
    backgroundColor: "#3b6cf6",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  joinedBtn: {
    backgroundColor: "#065f46",
  },
  joinText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  chatBtn: {
    padding: 6,
  },
});
