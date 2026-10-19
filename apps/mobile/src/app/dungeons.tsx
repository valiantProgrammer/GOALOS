import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { DUNGEONS_DATA } from "@goalos/config";

const TABS = ["Chapters", "Boss Battles"];

export default function MobileStoryModeScreen() {
  const [activeTab, setActiveTab] = useState("Chapters");
  const [chapters, setChapters] = useState(DUNGEONS_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleContinue = (chapterId: string) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId ? { ...c, progress: Math.min(c.total, c.progress + 1) } : c
      )
    );
    setToastMessage("Combat encounter cleared! +125 XP");
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Story Mode</Text>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>⚔️ Boss Mode</Text>
        </View>
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

      {/* Chapters List */}
      <View style={styles.list}>
        {chapters.map((chapter) => {
          const isLocked = chapter.status === "locked";

          return (
            <View
              key={chapter.id}
              style={[styles.card, isLocked && { opacity: 0.75 }]}
            >
              {/* Thumbnail representation */}
              <View style={styles.thumbBox}>
                <View style={styles.thumbGlow} />
                <Text style={styles.thumbIcon}>
                  {chapter.chapterNumber === 1
                    ? "👤"
                    : chapter.chapterNumber === 2
                    ? "🧘"
                    : chapter.chapterNumber === 3
                    ? "❄️"
                    : "🌑"}
                </Text>
              </View>

              {/* Info */}
              <View style={styles.infoCol}>
                <Text style={styles.chapterNum}>{chapter.title}</Text>
                <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>
                <Text style={styles.chapterDesc} numberOfLines={2}>
                  {chapter.description}
                </Text>

                {/* Button or Locked tag */}
                {!isLocked ? (
                  <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() => handleContinue(chapter.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.continueText}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedRow}>
                    <Text style={styles.lockedIcon}>🔒</Text>
                    <Text style={styles.lockedText}>Locked</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
  badgePill: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#3b6cf6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    color: "#00d2ff",
    fontSize: 11,
    fontWeight: "bold",
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  thumbBox: {
    width: 68,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#050814",
    borderWidth: 1,
    borderColor: "#1e3a8a",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  thumbGlow: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 108, 246, 0.3)",
  },
  thumbIcon: {
    fontSize: 26,
  },
  infoCol: {
    flex: 1,
    gap: 2,
  },
  chapterNum: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "bold",
  },
  chapterSubtitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  chapterDesc: {
    color: "#64748b",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
    marginBottom: 6,
  },
  continueBtn: {
    backgroundColor: "#3b6cf6",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  continueText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
  lockedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  lockedIcon: {
    fontSize: 12,
  },
  lockedText: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "600",
  },
});
