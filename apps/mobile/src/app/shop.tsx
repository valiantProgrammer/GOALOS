import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const TABS = ["All", "Avatars", "Themes", "Items"];

const ITEMS = [
  { id: "s-1", name: "Shadow Aura", price: 500, icon: "👤" },
  { id: "s-2", name: "Hunter Avatar", price: 700, icon: "🥷" },
  { id: "s-3", name: "Blue Aura Theme", price: 600, icon: "✨" },
  { id: "s-4", name: "Neon Frame", price: 400, icon: "🖼️" },
  { id: "s-5", name: "Title: Focused", price: 1200, icon: "🎖️" },
  { id: "s-6", name: "Night City Theme", price: 800, icon: "🏙️" },
];

export default function MobileRewardShopScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [coins, setCoins] = useState(2450);

  const handleBuy = (price: number) => {
    if (coins >= price) {
      setCoins(coins - price);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Reward Shop</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Coin Balance Banner */}
      <View style={styles.coinBanner}>
        <Text style={styles.coinIcon}>🪙</Text>
        <View>
          <Text style={styles.coinVal}>{coins.toLocaleString()}</Text>
          <Text style={styles.coinLbl}>Hunter Coins</Text>
        </View>
      </View>

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

      {/* Items Grid */}
      <View style={styles.grid}>
        {ITEMS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>🪙 {item.price}</Text>

            <TouchableOpacity
              style={[
                styles.buyBtn,
                coins < item.price && styles.disabledBuyBtn,
              ]}
              disabled={coins < item.price}
              onPress={() => handleBuy(item.price)}
            >
              <Text style={styles.buyText}>Buy</Text>
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
  coinBanner: {
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.4)",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  coinIcon: {
    fontSize: 32,
  },
  coinVal: {
    color: "#f59e0b",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  coinLbl: {
    color: "#64748b",
    fontSize: 11,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 6,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(59, 108, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  icon: {
    fontSize: 24,
  },
  itemName: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemPrice: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "bold",
  },
  buyBtn: {
    backgroundColor: "#3b6cf6",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  disabledBuyBtn: {
    backgroundColor: "#1e293b",
    opacity: 0.5,
  },
  buyText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
