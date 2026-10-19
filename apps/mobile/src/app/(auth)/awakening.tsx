import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

const CLASSES = [
  { id: "shadow", name: "Shadow", icon: "⚔️" },
  { id: "mage", name: "Mage", icon: "🔮" },
  { id: "fighter", name: "Fighter", icon: "🛡️" },
  { id: "rogue", name: "Rogue", icon: "🗡️" },
];

const AVATARS = ["👤", "🥷", "🧙", "⚡"];

export default function HunterAwakeningScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState("Rupayan");
  const [selectedClass, setSelectedClass] = useState("shadow");
  const [goal, setGoal] = useState("Become a Full Stack Developer");

  const handleFinish = () => {
    router.replace("/(tabs)");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Hunter Awakening</Text>
          <Text style={styles.subtitle}>Let's set up your journey</Text>
        </View>
      </View>

      {/* Main Avatar Preview */}
      <View style={styles.mainAvatarContainer}>
        <View style={styles.mainAvatar}>
          <Text style={styles.mainAvatarText}>{AVATARS[selectedAvatar]}</Text>
        </View>
      </View>

      {/* Avatar Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Choose Your Avatar</Text>
        <View style={styles.avatarRow}>
          {AVATARS.map((av, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarChoice,
                selectedAvatar === index && styles.activeAvatarChoice,
              ]}
              onPress={() => setSelectedAvatar(index)}
            >
              <Text style={styles.avatarChoiceText}>{av}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hunter Name */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Hunter Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter hunter name"
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Class Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Choose Your Class</Text>
        <View style={styles.classRow}>
          {CLASSES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[
                styles.classCard,
                selectedClass === c.id && styles.activeClassCard,
              ]}
              onPress={() => setSelectedClass(c.id)}
            >
              <Text style={styles.classIcon}>{c.icon}</Text>
              <Text
                style={[
                  styles.className,
                  selectedClass === c.id && styles.activeClassName,
                ]}
              >
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Primary Goal */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Set Your Goal</Text>
        <TextInput
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
          placeholder="e.g. Become a Full Stack Developer"
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Next CTA */}
      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleFinish}>
        <Text style={styles.buttonText}>Complete Awakening</Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backBtn: {
    paddingRight: 16,
  },
  backArrow: {
    color: "#00d2ff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  mainAvatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#0a1224",
    borderWidth: 2,
    borderColor: "#00d2ff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00d2ff",
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  mainAvatarText: {
    fontSize: 44,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: 8,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarChoice: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    alignItems: "center",
    justifyContent: "center",
  },
  activeAvatarChoice: {
    borderColor: "#00d2ff",
    backgroundColor: "rgba(0, 210, 255, 0.15)",
  },
  avatarChoiceText: {
    fontSize: 24,
  },
  input: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    color: "#ffffff",
    fontSize: 14,
  },
  classRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  classCard: {
    flex: 1,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
  },
  activeClassCard: {
    borderColor: "#3b6cf6",
    backgroundColor: "rgba(59, 108, 246, 0.15)",
  },
  classIcon: {
    fontSize: 20,
  },
  className: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
  },
  activeClassName: {
    color: "#00d2ff",
  },
  primaryButton: {
    backgroundColor: "#3b6cf6",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
