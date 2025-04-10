import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function GrandparentAuth() {
  const router = useRouter();

  const handleSignUpPress = () => {
    router.push("/grandParentSign");
  };

  const handleLoginPress = () => {
    router.push("/grandParentLogin");
  };

  return (
    <LinearGradient
      colors={["#FDEFF9", "#E1F5C4", "#A1C4FD"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>👴 Grandparent Authentication 👵</Text>

        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>📝 Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAlt} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>🔐 Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: "#FF6B81",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#FF6B81",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  buttonAlt: {
    backgroundColor: "#6BCB77",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    shadowColor: "#6BCB77",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
