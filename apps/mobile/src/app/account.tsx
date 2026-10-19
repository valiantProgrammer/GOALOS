import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { router } from "expo-router";

export default function MobileAccountScreen() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Account & Privacy</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLbl}>Hunter Name</Text>
            <Text style={styles.tableVal}>Rupayan</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLbl}>Email</Text>
            <Text style={styles.tableVal}>rupayan@example.com</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLbl}>Security Level</Text>
            <Text style={[styles.tableVal, { color: "#10b981" }]}>High (2FA)</Text>
          </View>
        </View>
      </View>

      {/* Security Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security & Access</Text>
        <View style={styles.actionsList}>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLbl}>Change Password</Text>
            <Text style={styles.actionArrow}>&gt;</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <Text style={styles.actionLbl}>Two-Factor Authentication</Text>
            <Switch
              value={twoFactor}
              onValueChange={setTwoFactor}
              trackColor={{ false: "#142852", true: "#10b981" }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLbl}>Manage Active Devices (1)</Text>
            <Text style={styles.actionArrow}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Data & Export */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data & Privacy</Text>
        <View style={styles.actionsList}>
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLbl}>Export My Data (JSON)</Text>
            <Text style={styles.actionArrow}>📥</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionLbl}>Download Activity Log</Text>
            <Text style={styles.actionArrow}>📄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Destructive Zone */}
      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete Account</Text>
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
  tableLbl: {
    color: "#64748b",
    fontSize: 13,
  },
  tableVal: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },
  actionsList: {
    gap: 12,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  actionLbl: {
    color: "#e2e8f0",
    fontSize: 13,
  },
  actionArrow: {
    color: "#64748b",
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#ef4444",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  deleteText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
