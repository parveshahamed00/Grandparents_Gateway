import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useAuth } from '../AuthContext';
import BACKEND_URL from '../../backend_url';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function ProfileScreen() {
      const router = useRouter();
    
  const { gId, logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (gId) {
      fetch(`${BACKEND_URL}/profile/${gId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setUser(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch profile.");
          setLoading(false);
        });
    }
  }, [gId]);

  const handleLogout = () => {
    logout();
    router.replace("/start");
    // Navigate to the start screen
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Welcome, {user.fullName?.split(' ')[0]}!</Text>

        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user.fullName}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{user.gender}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{user.age}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{user.phoneNumber}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
  },
  loadingText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF6B6B',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    width: width * 0.9,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    fontSize: 70,
  },
  infoBlock: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#7D5BA6',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  value: {
    fontSize: 18,
    color: '#222',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
