import { ScrollView, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../header/Header'
import { useState } from 'react';
import Dashboard from '../compound/Dashboard';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


type TimeCardProps = {
  icon: string;
  label: string;
  value: string;
};

const TimeCard = ({ icon, label, value }: TimeCardProps) => (
  <View style={styles.card}>
    <Icon name={icon} size={24} color="#0DAB9A" />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.time}>{value}  </Text>
  </View>
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

  
  React.useEffect(() => {
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
  };

  const handleCheckOut = () => {
    setCheckOutTime(getCurrentTime());
  };

  return (
    <SafeAreaView>
   <Header 
  onMenuPress={() => console.log('Menu clicked')} 
  onNotificationPress={() => console.log('Notifications')} 
/>

      <ScrollView>
        <View>
          <View style={styles.container}>
            <TouchableOpacity  onPress={handleCheckIn}>
            <TimeCard icon="login" label="Check in" value={checkInTime || '-- : --'} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleCheckOut}>
            <TimeCard icon="logout" label="Check out" value={checkOutTime || '-- : --'} />
            </TouchableOpacity>
            
            <TimeCard icon="clock-time-four-outline" label="Total hours" value={totalHours || '--'} />
          </View>
        </View>
        <View>
          <Dashboard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  timerCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    margin: 16,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  timerValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0DAB9A',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkInBtn: {
    backgroundColor: '#0DAB9A',
    padding: 12,
    borderRadius: 8,
    width: '90%',
    marginBottom: 4,
  },
  checkOutBtn: {
    backgroundColor: '#64748B',
    padding: 12,
    borderRadius: 8,
    width: '90%',
    marginBottom: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#1E293B',
    marginTop: 4,
  },
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



    
