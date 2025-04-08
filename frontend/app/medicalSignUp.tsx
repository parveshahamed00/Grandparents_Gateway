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
import BACKEND_URL from '../backend_url'; // Adjust the path as necessary
import { useRouter } from 'expo-router';

export default function medicalSignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialization, setSpecialization] = useState(null);
  const [hospital, setHospital] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [items] = useState([
    { label: 'Doctor', value: 'doctor' },
    { label: 'Physiotherapist', value: 'physiotherapist' },
    { label: 'Nurse', value: 'nurse' },
    { label: 'Care-Takers', value: 'care_takers' },
    { label: 'Dentist', value: 'dentist' },
  ]);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async () => {
    if (!fullName || !specialization || !hospital || !phoneNumber || !password) {
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
      specialization,
      hospital,
      phoneNumber,
      password,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/medical-signup`, {
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
        setSpecialization(null);
        setHospital('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        router.push('/medicalLogin');
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
        setSpecialization(item.value);
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
          <Text style={styles.title}>Medical Professional Sign Up</Text>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {specialization ? items.find((item) => item.value === specialization).label : 'Select Specialization'}
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
            placeholder="Hospital"
            placeholderTextColor="#888"
            value={hospital}
            onChangeText={setHospital}
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
