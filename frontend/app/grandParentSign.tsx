import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import  BACKEND_URL  from '../backend_url'; // Adjust the path as necessary
import { useRouter } from 'expo-router';

export default function GrandParentSign() {
    const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [items] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' },
  ]);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async () => {
    if (!fullName || !gender || !age || !phoneNumber || !password) {
      Alert.alert('All fields are required');
      return;
    }
  
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid phone number', 'Please enter a 10-digit phone number.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
  
    const formData = {
      fullName,
      gender,
      age: parseInt(age),
      phoneNumber,
      password,
    };
  
    try {
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.text(); // Log the raw response text
      console.log('Response:', data);
  
      if (data.trim() === "") {
        throw new Error("Empty response from server");
      }
  
      const jsonData = JSON.parse(data); // Parse the JSON response
  
      if (response.status === 201) {
        Alert.alert('Success', jsonData.message);
        setFullName('');
        setGender(null);
        setAge('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        router.push('/grandParentLogin');

      } else {
        Alert.alert('Error', jsonData.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Network Error', 'Failed to connect to server or invalid response received');
    }
  };
  

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setGender(item.value);
        setModalVisible(false);
      }}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>GrandParent Sign Up</Text>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {gender ? items.find((item) => item.value === gender).label : 'Select Gender'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#888"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

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

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              renderItem={renderDropdownItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
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
  dropdownButton: {
    borderColor: '#85C1E9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  dropdownButtonText: {
    color: '#2C3E50',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28B463',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    maxHeight: '50%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
