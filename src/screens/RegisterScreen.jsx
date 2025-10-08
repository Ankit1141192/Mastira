import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Email/Password registration
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // Optionally, update display name
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({ displayName: name });
      }
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  // Phone number registration/login
  const handlePhoneLogin = async () => {
    if (!phone) {
      alert('Enter your phone number');
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      // Navigate to verification screen with confirmation object
      navigation.navigate('PhoneVerification', { confirmation });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Register</Text>

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up with Email</Text>
        </TouchableOpacity>

        <Text style={{ marginVertical: 15, fontSize: 16, color: '#555' }}>OR</Text>

        <TextInput
          placeholder="Phone Number (+1234567890)"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={handlePhoneLogin}>
          <Text style={styles.buttonText}>Sign Up / Login with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f6ff',
    padding: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 35,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
  link: {
    color: '#1e90ff',
    marginTop: 22,
    fontSize: 15,
  },
});
