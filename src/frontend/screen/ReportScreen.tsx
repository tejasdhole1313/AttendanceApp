import React, { useState } from 'react';
import { View, Dimensions, ScrollView, Button, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Header from '../header/Header';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ReportScreen = () => {
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState('year'); // default

  const yearData = {
    labels: [
      'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24',
      'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 24, 14, 6, 15, 0, 8, 7],
        color: () => 'red',
        strokeWidth: 2,
      },
      {
        data: [0, 0, 0, 0, 0, 2, 6, 11, 5, 0, 13, 18],
        color: () => 'orange',
        strokeWidth: 2,
      },
      {
        data: [0, 0, 0, 0, 0, 1, 6, 9, 5, 0, 0, 0],
        color: () => 'black',
        strokeWidth: 2,
      },
      {
        data: [0, 0, 0, 0, 0, 5, 7, 6, 5, 0, 5, 5],
        color: () => 'blue',
        strokeWidth: 2,
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: () => 'purple',
        strokeWidth: 2,
      },
    ],
    legend: ['Absent', 'Late In', 'Late In & Early Out', 'Leave/Weekoff', 'Early Out'],
  };

  const monthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [3, 2, 1, 1],
        color: () => 'red',
        strokeWidth: 2,
      },
      {
        data: [0, 1, 2, 1],
        color: () => 'orange',
        strokeWidth: 2,
      },
      {
        data: [1, 0, 1, 0],
        color: () => 'black',
        strokeWidth: 2,
      },
      {
        data: [1, 1, 1, 2],
        color: () => 'blue',
        strokeWidth: 2,
      },
      {
        data: [0, 0, 1, 1],
        color: () => 'purple',
        strokeWidth: 2,
      },
    ],
    legend: ['Absent', 'Late In', 'Late In & Early Out', 'Leave/Weekoff', 'Early Out'],
  };

  const handlePDFView = () => {
    navigation.navigate('PDFView'); // Navigate to PDF screen
  };

  return (
    <>
      <Header />
      <View style={styles.buttonRow}>
        <Button  title="Month View" onPress={() => setViewMode('month')} />
        <Button title="Year View" onPress={() => setViewMode('year')} />
        <Button title="View PDF" onPress={handlePDFView} />
      </View>
      <ScrollView horizontal>
        <LineChart
          data={viewMode === 'month' ? monthData : yearData}
          width={1200}
          height={420}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => '#333',
            propsForDots: { r: '3' },
          }}
          bezier
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default ReportScreen;
