import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// 🔑 Your Firebase Web API Key
const API_KEY = "AIzaSyCwnTxgpft7upsmklRBTiY0Dp3MyH64rZc";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // ----------------- Email/Password Login -----------------
  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email & password');
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        Alert.alert('Error', data.error.message);
      } else {
        Alert.alert('Success', `Welcome back, ${data.email}`);
        // Navigate to home/dashboard
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  // ----------------- Phone Number Login (OTP) -----------------
  // Note: Firebase REST API for phone is limited; normally you need reCAPTCHA verification for web
  // Here you can implement a **mock** or integrate a 3rd party SMS OTP service if testing

  // ----------------- Google Login -----------------
  // Normally requires OAuth flow (firebase.google.com/docs/reference/rest/auth)
  // Use Expo Google Auth or WebView to get ID token, then call:
  // POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=[API_KEY]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindMirror</Text>
      <Text style={styles.subtitle}>Login with Email or Phone</Text>

      {/* Email Login */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleEmailLogin}>
        <Text style={styles.loginText}>Login with Email</Text>
      </TouchableOpacity>

      {/* Placeholder for Google Login */}
      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.loginText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Placeholder for Phone Number Login */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#ccc"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="OTP"
        placeholderTextColor="#ccc"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Login with Phone</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <View style={styles.signupTextContainer}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('Register')}>
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00A8E8',
    fontFamily: 'Cochin',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#112D4E',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#00A8E8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  googleBtn: {
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#00A8E8',
    fontWeight: 'bold',
  },
});
