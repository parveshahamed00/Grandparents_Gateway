import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
export default function IndexScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in title and slogan
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Looping pulse for "Loading..."
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to start screen after 5s
    const timer = setTimeout(() => {
      router.replace("/start");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Welcome to Grandparents Gateway
        </Animated.Text>
        <Animated.Text style={[styles.slogan, { opacity: fadeAnim }]}>
          💖 Because every grandparent deserves care, love, and connection.
        </Animated.Text>
        <Animated.Text
          style={[styles.loading, { transform: [{ scale: pulseAnim }] }]}
        >
          Loading...
        </Animated.Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDEBD0", // Warm peach
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4A148C", // Deep purple
    textAlign: "center",
    marginBottom: 15,
  },
  slogan: {
    fontSize: 18,
    color: "#D84315", // Deep orange
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
  },
  loading: {
    fontSize: 18,
    color: "#00796B", // Teal
    fontWeight: "600",
  },
});
