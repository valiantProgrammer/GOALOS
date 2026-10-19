import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glowCircle} />

      {/* Hero Badge */}
      <View style={styles.heroBox}>
        <View style={styles.emblemContainer}>
          <Text style={styles.emblemIcon}>⚡</Text>
        </View>
        <Text style={styles.title}>GOALOS</Text>
        <Text style={styles.subtitle}>LEVEL UP YOUR LIFE</Text>
      </View>

      {/* Motivational Pillar */}
      <View style={styles.pillarBox}>
        <Text style={styles.pillarText}>DISCIPLINE</Text>
        <Text style={styles.pillarDot}>•</Text>
        <Text style={styles.pillarText}>PROGRESS</Text>
        <Text style={styles.pillarDot}>•</Text>
        <Text style={styles.pillarText}>A STRONGER YOU</Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.8}
        onPress={() => router.push("/(auth)/onboarding")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050814",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  glowCircle: {
    position: "absolute",
    top: "20%",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(59, 108, 246, 0.12)",
  },
  heroBox: {
    alignItems: "center",
    marginTop: 60,
  },
  emblemContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#0a1224",
    borderWidth: 2,
    borderColor: "#00d2ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#00d2ff",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  emblemIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00d2ff",
    letterSpacing: 3,
    marginTop: 6,
  },
  pillarBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0a1224",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#142852",
  },
  pillarText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: 1.5,
  },
  pillarDot: {
    color: "#00d2ff",
    fontSize: 10,
  },
  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
