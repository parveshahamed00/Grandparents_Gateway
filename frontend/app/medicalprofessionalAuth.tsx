import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function MedicalAuth() {
  const router = useRouter();

  const handleSignUpPress = () => {
    router.push('/medicalSignUp');
  };

  const handleLoginPress = () => {
    router.push('/medicalLogin');
  };

  return (
    <LinearGradient
      colors={['#D0F4F0', '#B3E5FC', '#81D4FA']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🩺 Medical Professionals Portal</Text>

        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>📝 Register</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#004D40',
    textShadowColor: '#b2dfdb',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#004D40',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  buttonAlt: {
    backgroundColor: '#00ACC1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#006064',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
