import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDays } from 'lucide-react-native';
import Header from '../header/Header';

type AttendanceStatus = 'Present' | 'Absent' | 'Late';

interface Employee {
  id: string;
  name: string;
  attendance: {
    [date: string]: AttendanceStatus;
  };
  fromStatus?: AttendanceStatus;
  toStatus?: AttendanceStatus;
  status?: AttendanceStatus;
}

const SummaryScreen = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showPickerType, setShowPickerType] = useState<'from' | 'to' | null>(null);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const employeeData: Employee[] = [
    {
      id: '1',
      name: 'Tejas Dhole',
      attendance: {
        '2025-06-17': 'Present',
        '2025-06-18': 'Late',
      },
    },
  
  ];

  const handleSearch = () => {
    const fDate = fromDate.toISOString().split('T')[0];
    const tDate = toDate.toISOString().split('T')[0];

    const result = employeeData.map(emp => {
      const fromStatus = emp.attendance?.[fDate] || 'Absent';
      const toStatus = emp.attendance?.[tDate] || 'Absent';

      let finalStatus: AttendanceStatus = 'Absent';
      if (fromStatus === 'Present' && toStatus === 'Present') finalStatus = 'Present';
      else if (fromStatus === 'Late' || toStatus === 'Late') finalStatus = 'Late';

      return {
        ...emp,
        fromStatus,
        toStatus,
        status: finalStatus,
      };
    });

    setFilteredData(result);
    setSearchClicked(true);
  };

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;

  return (
    <>
    <Header isInternalPage onNotificationPress={() => console.log('Bell')} />

    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Summary</Text>

      <View style={styles.datePickerRow}>
        <TouchableOpacity style={styles.dateBox} onPress={() => setShowPickerType('from')}>
          <CalendarDays color="#31b8ef" size={20} />
          <Text style={styles.dateText}>From: {formatDate(fromDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateBox} onPress={() => setShowPickerType('to')}>
          <CalendarDays color="#31b8ef" size={20} />
          <Text style={styles.dateText}>To: {formatDate(toDate)}</Text>
        </TouchableOpacity>
      </View>

      {showPickerType && (
        <DateTimePicker
          value={showPickerType === 'from' ? fromDate : toDate}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            if (showPickerType === 'from' && selectedDate) setFromDate(selectedDate);
            if (showPickerType === 'to' && selectedDate) setToDate(selectedDate);
            setShowPickerType(null);
          }}
        />
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {searchClicked && (
        <>
          <Text style={styles.resultTitle}>Results:</Text>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.empName}>{item.name}</Text>
                  <Text style={styles.subText}>From: {item.fromStatus}</Text>
                  <Text style={styles.subText}>To: {item.toStatus}</Text>
                </View>
                <Text
                  style={[
                    styles.empStatus,
                    {
                      color:
                        item.status === 'Present'
                          ? 'green'
                          : item.status === 'Absent'
                          ? 'red'
                          : 'orange',
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
    </>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 12,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    width:100,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: '#31b8ef',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  empName: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    color: '#666',
  },
  empStatus: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});
