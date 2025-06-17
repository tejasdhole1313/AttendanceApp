import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays } from 'lucide-react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../header/Header';

const SalaryScreen = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSalary, setShowSalary] = useState(false);

  const employeeList = [
    { label: 'Tejas Dhole', value: 'emp001' },
    { label: 'Amit Patil', value: 'emp002' },
    { label: 'Sneha Deshmukh', value: 'emp003' },
  ];

  const salaryData = {
    emp001: {
      '2025-06': { basic: 25000, deductions: 1000, net: 24000 },
      '2025-05': { basic: 25000, deductions: 2000, net: 23000 },
    },
    emp002: {
      '2025-06': { basic: 30000, deductions: 500, net: 29500 },
    },
    emp003: {
      '2025-05': { basic: 28000, deductions: 1500, net: 26500 },
    },
  };

  const handleSearch = () => {
    if (selectedEmployee && selectedDate) {
      setShowSalary(true);
    }
  };

  const selectedMonthKey = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
  const salaryInfo = salaryData[selectedEmployee]?.[selectedMonthKey];

  return (
    <>
    <Header isInternalPage onNotificationPress={() => console.log('Bell')} />

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check Salary Slip</Text>

      {/* <Text style={styles.label}>Select Employee</Text>
      <RNPickerSelect
        onValueChange={setSelectedEmployee}
        placeholder={{ label: 'Select Employee', value: null }}
        items={employeeList}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
        }}
        value={selectedEmployee}
      /> */}

      <Text style={styles.label}>Select Month</Text>
      <TouchableOpacity style={styles.inputRow} onPress={() => setShowMonthPicker(true)}>
        <CalendarDays color="#31b8ef" size={20} />
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
      </TouchableOpacity>

      {showMonthPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            if (date) {
              setSelectedDate(date);
            }
            setShowMonthPicker(false);
          }}
        />
      )}

      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Text style={styles.searchText}>View Salary</Text>
      </TouchableOpacity>

      {showSalary && (
        <View style={styles.salaryCard}>
          {salaryInfo ? (
            <>
              <Text style={styles.salaryTitle}>Salary for {selectedMonthKey}</Text>
              <Text style={styles.salaryLine}>Basic Salary: ₹{salaryInfo.basic}</Text>
              <Text style={styles.salaryLine}>Deductions: ₹{salaryInfo.deductions}</Text>
              <Text style={styles.salaryLine}>Net Salary: ₹{salaryInfo.net}</Text>
            </>
          ) : (
            <Text style={styles.noData}>No salary record for selected month.</Text>
          )}
        </View>
      )}
    </ScrollView>
    </>
  );
};

export default SalaryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#31b8ef',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#31b8ef',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  dateText: {
    marginLeft: 10,
    color: '#333',
  },
  searchBtn: {
    backgroundColor: '#31b8ef',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  salaryCard: {
    backgroundColor: '#f5faff',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  salaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  salaryLine: {
    fontSize: 15,
    marginBottom: 4,
    color: '#444',
  },
  noData: {
    color: '#999',
    textAlign: 'center',
  },
});
