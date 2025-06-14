import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const dashboardItems = [
  { id: '1', title: 'Attendance', icon: 'calendar-check', bgColor: '#fff', iconColor: '#31b8ef' },
  { id: '2', title: 'Leaves', icon: 'exit-run', bgColor: '#fff', iconColor: '#31b8ef' },
  { id: '3', title: 'Holiday List', icon: 'calendar-month', bgColor: '#fff', iconColor: '#31b8ef' },
  { id: '4', title: 'Leave Status', icon: 'chart-pie', bgColor: '#fff', iconColor: '#31b8ef' },
  { id: '5', title: 'Payslip', icon: 'file-document', bgColor: '#fff', iconColor: '#31b8ef' },
  { id: '6', title: 'Reports', icon: 'chart-line', bgColor: '#fff', iconColor: '#31b8ef' },
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
