import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <View style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Visual Card */}
      <View style={styles.heroCard}>
        <View style={styles.castleContainer}>
          <Text style={styles.castleIcon}>🏰</Text>
          <View style={styles.castleGlow} />
        </View>
      </View>

      {/* Copy & Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Turn Your Daily Life Into an RPG</Text>
        <Text style={styles.description}>
          Complete quests, build habits, level up and become a better you.
        </Text>

        {/* 5-dot carousel */}
        <View style={styles.carouselDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentSlide ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.8}
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050814",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
  },
  heroCard: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  castleContainer: {
    width: 200,
    height: 200,
    borderRadius: 24,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    alignItems: "center",
    justifyContent: "center",
  },
  castleIcon: {
    fontSize: 72,
  },
  castleGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0, 210, 255, 0.15)",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  carouselDots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: "#00d2ff",
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "#1e293b",
  },
  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
