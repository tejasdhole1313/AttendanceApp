import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../header/Header';
import RNPickerSelect from 'react-native-picker-select';

const Leaves = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [form, setForm] = useState({
    title: '',
    leaveType: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <>
      <Header
  onMenuPress={() => console.log('Menu pressed')}
  onNotificationPress={() => console.log('Notification pressed')}
/>


    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Apply Leave</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        placeholderTextColor={"#888"}
        value={form.title}
        onChangeText={(text) => handleChange('title', text)}
      />
<Text style={styles.label}>Leave Type</Text>
     <View style={styles.pickerContainer}>
  <RNPickerSelect
    onValueChange={(value) => handleChange('leaveType', value)}
    placeholder={{
      label: 'Enter Leave Type',
      value: null,
      color: '#9EA0A4',
    }}
    items={[
      { label: 'Sick Leave', value: 'Sick' },
      { label: 'Casual Leave', value: 'Casual' },
      { label: 'Earned Leave', value: 'Earned' },
      { label: 'Maternity Leave', value: 'Maternity' },
      { label: 'Paternity Leave', value: 'Paternity' },
    ]}
    style={{
      inputIOS: styles.input,
      inputAndroid: styles.input,
    }}
    value={form.leaveType}
  />
</View>
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Number"
        placeholderTextColor={"#888"}
        keyboardType="numeric"
        value={form.contactNumber}
        onChangeText={(text) => handleChange('contactNumber', text)}
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.inputText}>{form.startDate || 'Enter Start Date'}</Text>
        <Icon name="calendar" size={20} color="#888" />
      </TouchableOpacity>

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Text style={styles.inputText}>{form.endDate || 'Enter End Date'}</Text>
        <Icon name="calendar" size={20} color="#888" />
      </TouchableOpacity>

      <Text style={styles.label}>Reason for Leave</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Reason for Leave"
        placeholderTextColor={"#888"}
        multiline
        value={form.reason}
        onChangeText={(text) => handleChange('reason', text)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apply Leave</Text>
      </TouchableOpacity>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(false);
            if (date) {
              handleChange('startDate', date.toDateString());
            }
          }}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(false);
            if (date) {
              handleChange('endDate', date.toDateString());
            }
          }}
        />
      )}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#31b8ef',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#31b8ef',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
  },
  inputText: {
    color: '#333',
  },
  button: {
    backgroundColor: '#31b8ef',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerContainer: {
  borderWidth: 1,
  borderColor: '#00BCD4',
  borderRadius: 5,
  marginBottom: 10,
  backgroundColor: '#fff',
}

});

export default Leaves;