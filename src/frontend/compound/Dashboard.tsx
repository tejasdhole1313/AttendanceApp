import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const dashboardItems = [
  { id: '1', title: 'Attendance', icon: 'calendar-check', bgColor: '#E6F4EA', iconColor: '#4CAF50' },
  { id: '2', title: 'Leaves', icon: 'exit-run', bgColor: '#FFF0E6', iconColor: '#FF7043' },
  { id: '3', title: 'Holiday List', icon: 'calendar-month', bgColor: '#E6F0FA', iconColor: '#42A5F5' },
  { id: '4', title: 'Leave Status', icon: 'chart-pie', bgColor: '#F3E8FB', iconColor: '#AB47BC' },
  { id: '5', title: 'Payslip', icon: 'file-document', bgColor: '#E6FAF0', iconColor: '#26A69A' },
  { id: '6', title: 'Reports', icon: 'chart-line', bgColor: '#FDECEA', iconColor: '#EF5350' },
];

type DashboardItem = {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
  iconColor: string;
};

const Dashboard = () => {
  const renderItem = ({ item }: { item: DashboardItem }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.bgColor }]}>
      <Icon name={item.icon} size={30} color={item.iconColor} />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <FlatList
        data={dashboardItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default Dashboard;
