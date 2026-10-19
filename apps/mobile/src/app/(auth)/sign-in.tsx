import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

export default function MobileSignInScreen() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Navigate to Hunter Awakening on sign up, or Dashboard on sign in
    if (tab === "signup") {
      router.push("/(auth)/awakening");
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Brand Hero */}
      <View style={styles.heroBox}>
        <View style={styles.avatarEmblem}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <Text style={styles.title}>GOALOS</Text>
        <Text style={styles.subtitle}>LEVEL UP YOUR LIFE</Text>
      </View>

      {/* Segmented Auth Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "signin" && styles.activeTabBtn]}
          onPress={() => setTab("signin")}
        >
          <Text style={[styles.tabText, tab === "signin" && styles.activeTabText]}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === "signup" && styles.activeTabBtn]}
          onPress={() => setTab("signup")}
        >
          <Text style={[styles.tabText, tab === "signup" && styles.activeTabText]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {tab === "signin" && (
          <TouchableOpacity style={styles.forgotBox}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        {/* Primary Submit */}
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {tab === "signin" ? "Sign In" : "Awaken Hunter"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Auth Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialIcon}>G</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, styles.disabledSocialBtn]}>
          <Text style={[styles.socialIcon, { color: "#64748b" }]}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Text style={styles.socialIcon}>💬</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Toggle */}
      <TouchableOpacity
        style={styles.footerRow}
        onPress={() => setTab(tab === "signin" ? "signup" : "signin")}
      >
        <Text style={styles.footerMuted}>
          {tab === "signin" ? "Don't have an account? " : "Already registered? "}
        </Text>
        <Text style={styles.footerLink}>
          {tab === "signin" ? "Create an Account" : "Sign In"}
        </Text>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  heroBox: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarEmblem: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#0a1224",
    borderWidth: 2,
    borderColor: "#3b6cf6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarIcon: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#00d2ff",
    letterSpacing: 2,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#0a1224",
    borderRadius: 12,
    padding: 4,
    width: "100%",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#142852",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTabBtn: {
    backgroundColor: "#3b6cf6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },
  activeTabText: {
    color: "#ffffff",
  },
  form: {
    width: "100%",
    gap: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
  },
  forgotBox: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#00d2ff",
    fontSize: 12,
  },
  submitBtn: {
    backgroundColor: "#3b6cf6",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    shadowColor: "#3b6cf6",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#142852",
  },
  orText: {
    color: "#64748b",
    fontSize: 12,
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#0a1224",
    borderWidth: 1,
    borderColor: "#142852",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledSocialBtn: {
    opacity: 0.4,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerMuted: {
    color: "#64748b",
    fontSize: 13,
  },
  footerLink: {
    color: "#00d2ff",
    fontSize: 13,
    fontWeight: "600",
  },
});
