// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (email === 'tejas@123.com' && password === '12345') {
      navigation.replace('Main'); 
    } else {
      Alert.alert('Invalid Credentials', 'Please enter correct email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back!</Text>
      <Text style={styles.subtitle}>Glad to see you, Again.</Text>

      <TextInput
        placeholder="Enter your email or user id"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.row}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text>Remember me</Text>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signinHelp}>Not able to sign in?</Text>

      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.contactBtn}><Text>Email us</Text></TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}><Text>Call us</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#fff' },
  welcome: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginBottom: 20, color: '#777' },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  forgotText: { color: 'gray' },
  loginButton: {
    backgroundColor: '#31b8ef',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  loginText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  signinHelp: { textAlign: 'center', color: '#888' },
  contactRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
  contactBtn: {
    backgroundColor: '#fff3e0',
    padding: 10,
    borderRadius: 8,
  },
});

export default LoginScreen;
