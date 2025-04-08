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
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import BACKEND_URL  from '../backend_url'; // Adjust the path as necessary
import { useAuth } from './AuthContext'; // Adjust the path as necessary

export default function GrandParentLogin() {
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
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.text(); // Log the raw response text
      console.log('Response:', data);

      if (data.trim() === "") {
        throw new Error("Empty response from server");
      }

      const jsonData = JSON.parse(data); // Parse the JSON response

      if (response.status === 200) {
        Alert.alert('Success', jsonData.message);

        // Assume the response includes the g_id
        const g_id = jsonData.g_id; // Adjust based on your actual response structure
        login(g_id); // Update the context with the g_id

        // Navigate to the home screen after successful login
        router.push('/(tabs)/home');
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
          <Text style={styles.title}>GrandParent Login</Text>

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
    backgroundColor: '#E9F7EF',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#2C3E50',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#85C1E9',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#28B463',
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
