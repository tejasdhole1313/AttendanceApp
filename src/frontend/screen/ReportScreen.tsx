import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import Header from '../header/Header';

const screenWidth = Dimensions.get('window').width;

const ReportScreen = () => {
  const [viewMode, setViewMode] = useState<'month' | 'year'>('year');

  const yearData = {
    labels: [
      'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24',
      'Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25',
    ],
    datasets: [
      { data: [0, 0, 0, 0, 0, 24, 14, 6, 15, 0, 8, 7], color: () => 'red', strokeWidth: 2 },
      { data: [0, 0, 0, 0, 0, 2, 6, 11, 5, 0, 13, 18], color: () => 'orange', strokeWidth: 2 },
      { data: [0, 0, 0, 0, 0, 1, 6, 9, 5, 0, 0, 0], color: () => 'black', strokeWidth: 2 },
      { data: [0, 0, 0, 0, 0, 5, 7, 6, 5, 0, 5, 5], color: () => 'blue', strokeWidth: 2 },
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], color: () => 'purple', strokeWidth: 2 },
    ],
    legend: ['Absent', 'Late In', 'Late In & Early Out', 'Leave/Weekoff', 'Early Out'],
  };

  const monthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { data: [3, 2, 1, 1], color: () => 'red', strokeWidth: 2 },
      { data: [0, 1, 2, 1], color: () => 'orange', strokeWidth: 2 },
      { data: [1, 0, 1, 0], color: () => 'black', strokeWidth: 2 },
      { data: [1, 1, 1, 2], color: () => 'blue', strokeWidth: 2 },
      { data: [0, 0, 1, 1], color: () => 'purple', strokeWidth: 2 },
    ],
    legend: ['Absent', 'Late In', 'Late In & Early Out', 'Leave/Weekoff', 'Early Out'],
  };

  const requestAndroidPermission = async () => {
    if (Platform.OS !== 'android') return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const generatePDF = async () => {
    const hasPermission = await requestAndroidPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Cannot save PDF without storage permission.');
      return;
    }

    const selectedData = viewMode === 'month' ? monthData : yearData;
    const html = `
      <h1 style="text-align:center">${viewMode.toUpperCase()} REPORT</h1>
      <table border="1" style="width:100%; border-collapse: collapse;">
        <tr>
          <th>Label</th>
          ${selectedData.labels.map((label) => `<th>${label}</th>`).join('')}
        </tr>
        ${selectedData.datasets
          .map(
            (ds, index) => `
            <tr>
              <td>${selectedData.legend[index]}</td>
              ${ds.data.map((val) => `<td style="padding:5px">${val}</td>`).join('')}
            </tr>
          `
          )
          .join('')}
      </table>
    `;

    try {
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: `Report_${viewMode}_${Date.now()}`,
        directory: 'Documents',
      });

      if (file.filePath) {
        Alert.alert('Success', 'PDF generated. Opening now...');
        FileViewer.open(file.filePath);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to create or open PDF.');
    }
  };

  const chartData = viewMode === 'month' ? monthData : yearData;
  const chartWidth = chartData.labels.length * 70;

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{viewMode === 'month' ? 'Monthly' : 'Yearly'} Report</Text>

      <View style={styles.buttonRow}>
        <Button title="Month View" onPress={() => setViewMode('month')} />
        <Button title="Year View" onPress={() => setViewMode('year')} />
        <Button title="Download PDF" onPress={generatePDF} />
      </View>

      <ScrollView horizontal contentContainerStyle={{ paddingBottom: 20 }}>
        <LineChart
          data={chartData}
          width={Math.max(chartWidth, screenWidth)}
          height={420}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f1f1f1',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#000',
            labelColor: () => '#555',
            propsForDots: {
              r: '4',
              strokeWidth: '1',
              stroke: '#999',
            },
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chart: {
    marginHorizontal: 5,
    borderRadius: 12,
  },
});

export default ReportScreen;
