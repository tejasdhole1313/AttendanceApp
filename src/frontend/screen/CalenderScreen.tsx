import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../header/Header';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = Array.from({ length: 30 }, (_, i) => i + 1);

export default function AttendanceScreen() {
  const today = new Date().getDate(); 
  const isCheckedIn = true; 
let boxStyle = [styles.dateBox]; 
let textStyle = [styles.dateText];
  return (
    <SafeAreaView style={styles.container}>
     <Header
  onMenuPress={() => console.log('Menu pressed')}
  onNotificationPress={() => console.log('Notification pressed')}
/>


      <ScrollView style={styles.scroll}>
        {/* Legends */}
        <View style={styles.legendRow}>
          <Legend color="#16a34a" label="Present" />
          <Legend color="#ef4444" label="Absent" />
          <Legend color="#facc15" label="Weekly off" />
          <Legend color="#2563eb" label="Missed" />
        </View>

        <Text style={styles.monthText}>June 2025</Text>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {days.map((day, i) => (
            <Text key={i} style={styles.dayLabel}>{day}</Text>
          ))}

          {dates.map((date) => {
            let boxStyle = [styles.dateBox];
            let textStyle = [styles.dateText];

          
if (date === today) {
  boxStyle.push(isCheckedIn ? styles.presentBox : styles.absentBox);
  textStyle.push(styles.activeDateText);
}
            return (
              <View key={date} style={boxStyle}>
  <Text style={textStyle}>{date}</Text>
</View>

            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Legend = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendCircle, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 16 },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendCircle: {
    width: 12, height: 12,
    borderRadius: 6,
    marginRight: 4
  },
  legendText: { fontSize: 14, color: '#374151' },
  monthText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 10
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6
  },
  dayLabel: {
    width: 40, textAlign: 'center',
    fontWeight: '600', color: '#374151'
  },
  dateBox: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 6
  },
  dateText: { fontSize: 14, color: '#000' },
  activeDateText: { color: 'white', fontWeight: 'bold' },
  presentBox: { backgroundColor: '#22c55e' },
  absentBox: { backgroundColor: '#ef4444' },
});
