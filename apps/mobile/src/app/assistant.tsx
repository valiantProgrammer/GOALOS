import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";

const TABS = ["Chat", "Plan", "Analyze"];

const QUICK_PROMPTS = [
  { label: "Plan my day", icon: "📅", query: "Plan my day" },
  { label: "Break down a big goal", icon: "🎯", query: "Break down a big goal" },
  { label: "Suggest a better routine", icon: "🔥", query: "Suggest a better routine" },
  { label: "Explain a concept", icon: "📖", query: "Explain a concept" },
  { label: "Motivate me", icon: "🏆", query: "Motivate me" },
  { label: "Analyze my progress", icon: "📊", query: "Analyze my progress" },
];

interface MessageItem {
  id: string;
  role: "assistant" | "user";
  text: string;
}

export default function MobileAssistantScreen() {
  const [activeTab, setActiveTab] = useState("Chat");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "initial-1",
      role: "assistant",
      text: "How can I help you today, Hunter?",
    },
  ]);

  const handleSend = (text?: string) => {
    const toSend = text || inputText;
    if (!toSend.trim()) return;

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      text: toSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      let reply = "Tactical Protocol executed, Hunter. Maintain consistent execution across all quests.";
      const lower = toSend.toLowerCase();
      if (lower.includes("plan")) {
        reply = "Daily Battle Plan: 1. DSA Study (60m), 2. Workout & Mobility, 3. Project Engineering, 4. Evening Review. Completing all 4 unlocks +50 XP bonus.";
      } else if (lower.includes("goal")) {
        reply = "Deconstructed into 4 milestones: Architecture (W1), Core API (W2), UI Polish (W3), Deployment (W4). Total bounty: 2,500 XP.";
      } else if (lower.includes("routine")) {
        reply = "Optimized Sequence: 06:00 AM Hydration & Sunlight -> 06:30 AM 25m Focus Block -> 09:30 PM Digital Sunset.";
      } else if (lower.includes("motivate")) {
        reply = "A stronger you builds a brighter tomorrow. Every completed task quietly manifests your monarch rank.";
      } else if (lower.includes("analyze")) {
        reply = "Diagnostics: Lv. 32 Shadow Hunter with 12-day streak. 2,570 XP required for C-Rank awakening.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: reply,
        },
      ]);
    }, 400);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>AI Assistant</Text>
        <Text style={{ fontSize: 16 }}>🤖</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, activeTab === t && styles.activeTabBtn]}
            onPress={() => {
              setActiveTab(t);
              if (t === "Plan") handleSend("Plan my day");
              if (t === "Analyze") handleSend("Analyze my progress");
            }}
          >
            <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Messages */}
        <View style={styles.messagesList}>
          {messages.map((m) => {
            const isAi = m.role === "assistant";
            return (
              <View
                key={m.id}
                style={[
                  styles.msgRow,
                  isAi ? styles.aiRow : styles.userRow,
                ]}
              >
                {isAi && (
                  <View style={styles.avatarAi}>
                    <Text style={{ fontSize: 13 }}>🤖</Text>
                  </View>
                )}

                <View
                  style={[
                    styles.bubble,
                    isAi ? styles.aiBubble : styles.userBubble,
                  ]}
                >
                  <Text style={isAi ? styles.aiText : styles.userText}>
                    {m.text}
                  </Text>
                </View>

                {!isAi && (
                  <View style={styles.avatarUser}>
                    <Text style={{ fontSize: 13 }}>👤</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Quick Prompts List matching MM-20 */}
        <View style={styles.promptsList}>
          {QUICK_PROMPTS.map((q, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptItem}
              onPress={() => handleSend(q.query)}
              activeOpacity={0.7}
            >
              <View style={styles.promptIconBox}>
                <Text style={{ fontSize: 15 }}>{q.icon}</Text>
              </View>
              <Text style={styles.promptLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Input Field */}
      <View style={styles.inputBar}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask anything..."
          placeholderTextColor="#64748b"
          style={styles.inputField}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050814",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#142852",
    marginHorizontal: 20,
    marginBottom: 12,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 90,
    gap: 16,
  },
  messagesList: {
    gap: 10,
  },
  msgRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  aiRow: {
    justifyContent: "flex-start",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  avatarAi: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(59, 108, 246, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(168, 85, 247, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    maxWidth: "80%",
  },
  aiBubble: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
  },
  userBubble: {
    backgroundColor: "#3b6cf6",
  },
  aiText: {
    color: "#e2e8f0",
    fontSize: 13,
    lineHeight: 18,
  },
  userText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  promptsList: {
    gap: 8,
    marginTop: 6,
  },
  promptItem: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  promptIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  promptLabel: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  inputBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputField: {
    flex: 1,
    color: "#ffffff",
    fontSize: 13,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
