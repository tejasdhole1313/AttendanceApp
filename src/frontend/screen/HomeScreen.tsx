import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../header/Header';
import Dashboard from '../compound/Dashboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type TimeCardProps = {
  icon: string;
  label: string;
  value: string;
  bgColor?: string;
  onPress?: () => void;
};

const TimeCard = ({ icon, label, value, bgColor = '#fff', onPress }: TimeCardProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Icon name={icon} size={24} color="#31b8ef" />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.time}>{value || '-- : --'}</Text>
    </View>
  </TouchableOpacity>
);

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

const HomeScreen = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [activeCard, setActiveCard] = useState<'none' | 'checkin' | 'checkout'>('none');

  useEffect(() => {
    if (checkInTime && checkOutTime) {
      const [inHour, inMin, inPeriod] = checkInTime.split(/[: ]/);
      const [outHour, outMin, outPeriod] = checkOutTime.split(/[: ]/);

      const in24 =
        inPeriod === 'PM' && inHour !== '12'
          ? parseInt(inHour) + 12
          : inPeriod === 'AM' && inHour === '12'
          ? 0
          : parseInt(inHour);
      const out24 =
        outPeriod === 'PM' && outHour !== '12'
          ? parseInt(outHour) + 12
          : outPeriod === 'AM' && outHour === '12'
          ? 0
          : parseInt(outHour);

      const inMinutes = in24 * 60 + parseInt(inMin);
      const outMinutes = out24 * 60 + parseInt(outMin);
      const diff = outMinutes - inMinutes;

      const h = Math.floor(diff / 60);
      const m = diff % 60;
      setTotalHours(`${h}h ${m}m`);
    } else {
      setTotalHours('');
    }
  }, [checkInTime, checkOutTime]);

  const handleCheckIn = () => {
    setCheckInTime(getCurrentTime());
    setActiveCard('checkin');
  };

  const handleCheckOut = () => {
    setCheckOutTime(getCurrentTime());
    setActiveCard('checkout');
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Header
          onMenuPress={() => console.log('Menu clicked')}
          onNotificationPress={() => console.log('Notifications')}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <View style={styles.container}>
            <TimeCard
              icon="login"
              label="Check in"
              value={checkInTime}
              onPress={handleCheckIn}
              bgColor={activeCard === 'checkin' ? '#8ac906' : '#fff'}
            />
            <TimeCard
              icon="logout"
              label="Check out"
              value={checkOutTime}
              onPress={handleCheckOut}
              bgColor={activeCard === 'checkout' ? '#317cef' : '#fff'}
            />
            <TimeCard
              icon="clock-time-four-outline"
              label="Total hours"
              value={totalHours}
            />
          </View>

          <Dashboard />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  card: {
   backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 100,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  time: {
    fontSize: 15,
    marginTop: 2,
  },
});
