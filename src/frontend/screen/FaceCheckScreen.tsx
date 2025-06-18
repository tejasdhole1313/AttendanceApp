import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

const getCurrentTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export default function FaceCheckScreen() {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [selfie, setSelfie] = useState<string | null>(null);

  const handleCamera = (type: 'checkin' | 'checkout') => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
        saveToPhotos: false,
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'Selfie is required for verification.');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Unknown error');
        } else if (response.assets && response.assets.length > 0) {
          const imgUri = response.assets[0].uri!;
          setSelfie(imgUri);

          const currentTime = getCurrentTime();
          if (type === 'checkin') {
            setCheckInTime(currentTime);
            Alert.alert('Checked In', `Time: ${currentTime}`);
          } else {
            setCheckOutTime(currentTime);
            Alert.alert('Checked Out', `Time: ${currentTime}`);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Verification</Text>

      {selfie && (
        <Image source={{ uri: selfie }} style={styles.selfie} />
      )}

      <View style={styles.timeRow}>
        <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.button}>
          <TouchableOpacity onPress={() => handleCamera('checkin')}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#ef4444', '#b91c1c']} style={styles.button}>
          <TouchableOpacity onPress={() => handleCamera('checkout')}>
            <Text style={styles.buttonText}>Check Out</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Check In Time: {checkInTime || '-- : --'}</Text>
        <Text style={styles.infoText}>Check Out Time: {checkOutTime || '-- : --'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20,
  },
  selfie: {
    width: 200, height: 200, borderRadius: 100, marginBottom: 20,
  },
  timeRow: {
    flexDirection: 'row', justifyContent: 'space-around', width: '100%',
  },
  button: {
    padding: 15, borderRadius: 10, marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold',
  },
  info: {
    marginTop: 30, alignItems: 'center',
  },
  infoText: {
    fontSize: 16, color: '#111', marginVertical: 5,
  },
});
