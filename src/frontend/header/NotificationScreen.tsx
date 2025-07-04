import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notifications = [
  { id: '1', title: 'Attendance', message: 'Lorem Ipsum is simply dummy text...', recent: true },
  { id: '2', title: 'Attendance', message: 'Lorem Ipsum is simply dummy text...', recent: false },
  { id: '3', title: 'Attendance', message: 'Lorem Ipsum is simply dummy text...', recent: false },
  { id: '4', title: 'Attendance', message: 'Lorem Ipsum is simply dummy text...', recent: false },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={[styles.card, item.recent && styles.recentCard]}>
      <Icon name="bell-outline" size={22} color="#31b8ef" style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <View>
      <Text style={styles.heading}>Notifications</Text>
      {notifications.some((n) => n.recent) && (
        <>
          <Text style={styles.section}>Recent</Text>
          {notifications.filter(n => n.recent).map((item) => renderItem({ item }))}
          <Text style={styles.section}>This Week</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications.filter((n) => !n.recent)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 6, color: '#333' },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  recentCard: {
    backgroundColor: '#F3F4FF',
    borderColor: 'transparent',
  },
  icon: { marginRight: 12, marginTop: 3 },
  title: { fontWeight: 'bold', marginBottom: 4 },
  message: { color: '#555', fontSize: 13 },
});

export default NotificationScreen;
