import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet,  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../header/Header';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = Array.from({ length: 30 }, (_, i) => i + 1); 

export default function AttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <Header />

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

          {dates.map((date) => (
            <View
              key={date}
              style={[
                styles.dateBox,
                date === 16 && styles.activeDateBox
              ]}
            >
              <Text style={[
                styles.dateText,
                date === 16 && styles.activeDateText
              ]}>
                {date}
              </Text>
            </View>
          ))}
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

const NavItem = ({ icon, label, active }) => (
  <TouchableOpacity style={styles.navItem}>
    <Ionicons name={icon} size={22} color={active ? 'green' : 'gray'} />
    <Text style={{ color: active ? 'green' : 'gray', fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#15803d',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  scroll: { paddingHorizontal: 16 },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12
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
  activeDateBox: { backgroundColor: '#22c55e' },
  activeDateText: { color: 'white', fontWeight: 'bold' },
  overtimeCard: {
    backgroundColor: '#bbf7d0',
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100
  },
  overtimeTitle: { fontSize: 16, fontWeight: '600', color: '#065f46' },
  overtimeHours: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  addButton: {
    backgroundColor: '#fb923c',
    padding: 10,
    borderRadius: 50
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#d1d5db'
  },
 
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
