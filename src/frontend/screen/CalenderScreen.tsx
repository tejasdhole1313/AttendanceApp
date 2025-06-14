import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// ...existing code...
const CalenderScreen = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  type MarkedDate = {
    customStyles: {
      container?: object;
      text?: object;
    };
  };

  let markedDates: { [key: string]: MarkedDate } = {};

  
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date.getDay() === 0) { // 0 = Sunday
      const dateString = date.toISOString().split('T')[0];
      markedDates[dateString] = {
        customStyles: {
          container: { backgroundColor: '' },
          text: { color: '#D32F2F', fontWeight: 'bold' }
        }
      };
    }
  }


  const todayString = today.toISOString().split('T')[0];
  markedDates[todayString] = {
    customStyles: {
      container: { backgroundColor: '#31b8ef', borderRadius: 8 },
      text: { color: '#fff', fontWeight: 'bold' }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#0DAB9A',
        }}
      />
    </View>
  );
};
// ...existing code...
export default CalenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});