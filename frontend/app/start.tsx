import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function StartScreen() {
  const router = useRouter();

  const handleGrandparentPress = () => {
    router.push('/grandparentAuth');
  };

  const handleAdminPress = () => {
    console.log('Admin button pressed');
  };

  return (
    <ImageBackground
      source={require("../assets/images/startScreen.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to GrandParents Gateway</Text>
        <Text style={styles.subtitle}>Compassion • Care • Connection</Text>

        <TouchableOpacity style={[styles.button, styles.grandparentButton]} onPress={handleGrandparentPress}>
          <Text style={styles.buttonText}>I'm a Grandparent</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.adminButton]} onPress={handleAdminPress}>
          <Text style={styles.buttonText}>I'm a Medical Professional</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.73)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E83',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A5C99',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  grandparentButton: {
    backgroundColor: '#FF8C42', // warm orange
  },
  adminButton: {
    backgroundColor: '#6C63FF', // violet blue
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
