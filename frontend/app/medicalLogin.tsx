import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import BACKEND_URL from '../backend_url'; // Adjust if needed
import { useAuth } from './AuthContext'; // Adjust if needed

export default function medicalLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('All fields are required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid phone number', 'Please enter a 10-digit phone number.');
      return;
    }

    const loginData = {
      phoneNumber,
      password,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/medical/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.text();
      console.log('Response:', data);

      if (data.trim() === "") {
        throw new Error("Empty response from server");
      }

      const jsonData = JSON.parse(data);

      if (response.status === 200) {
        Alert.alert('Success', jsonData.message);

        const m_id = jsonData.m_id;
        login(m_id); // Store login info in context
        Alert.alert('Login Success');
        // router.push('/(tabs)/home');
      } else {
        Alert.alert('Error', jsonData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Network Error', 'Failed to connect to server or invalid response received');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Medical Professional Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#1565C0',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#90CAF9',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0288D1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
