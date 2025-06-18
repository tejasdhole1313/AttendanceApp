import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../header/Header';
import Dashboard from '../compound/Dashboard';

type TimeCardProps = {
  icon: string;
  label: string;
  value: string;
  gradient: string[];
  onPress?: () => void;
};

const TimeCard = ({ icon, label, value, gradient, onPress }: TimeCardProps) => (
  <Animatable.View animation="fadeInUp" duration={1000} useNativeDriver>
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient colors={gradient} style={styles.card}>
        <Icon name={icon} size={25} color="#fff" />
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{value || '-- : --'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </Animatable.View>
);

const getCurrentTime = (): string => {
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

      const in24 = inPeriod === 'PM' && inHour !== '12' ? parseInt(inHour) + 12 : inPeriod === 'AM' && inHour === '12' ? 0 : parseInt(inHour);
      const out24 = outPeriod === 'PM' && outHour !== '12' ? parseInt(outHour) + 12 : outPeriod === 'AM' && outHour === '12' ? 0 : parseInt(outHour);

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <Header onMenuPress={() => console.log('Menu clicked')} onNotificationPress={() => console.log('Notifications')} />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}>
            <TimeCard
              icon="login"
              label="Check in"
              value={checkInTime}
              gradient={activeCard === 'checkin' ? ['#6ee7b7', '#3b82f6'] : ['#d1d5db', '#9ca3af']}
              onPress={handleCheckIn}
            />
            <TimeCard
              icon="logout"
              label="Check out"
              value={checkOutTime}
              gradient={activeCard === 'checkout' ? ['#f87171', '#ef4444'] : ['#d1d5db', '#9ca3af']}
              onPress={handleCheckOut}
            />
            <TimeCard
              icon="clock-time-four-outline"
              label="Total hours"
              value={totalHours}
              gradient={['#facc15', '#eab308']}
            />
          </View>

          {/* <Dashboard /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  
    paddingTop: 50,
    textAlign:"center",
    alignContent:"center",
    justifyContent:"center",
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginBottom: 20,
   
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 100,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 4,
  },
});
