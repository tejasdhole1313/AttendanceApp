import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type MenuItem = {
  id: number;
  title: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { id: 1, title: 'Personal Details', icon: 'account-outline' },
  { id: 2, title: 'Professional Details', icon: 'briefcase-outline' },
  { id: 3, title: 'Contact us', icon: 'email-outline' },
  { id: 4, title: 'Change Password', icon: 'lock-reset' },
  { id: 5, title: 'Logout', icon: 'logout' },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.iconTitle}>
        <Icon name={item.icon} size={24} color="#31b8ef" />
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#3333" />
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      {/* Header Bar */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons
          name="arrow-back"
          size={28}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.screenTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: '' }} // Add fallback image if needed
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Tejas Dhole</Text>
          <Text style={styles.role}>Frontend Developer</Text>
          <View style={styles.row}>
            {/* <View style={styles.badge}>
              <Text style={styles.badgeText}>Tenure - 1.4 year</Text>
            </View> */}
            <Text style={styles.empId}>485738574</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.menuList}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 25,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  profileInfo: {
    flex: 1,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#555' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  empId: {
    fontSize: 12,
    color: '#666',
  },
  menuList: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    marginLeft: 10,
  },
});

export default SettingsScreen;
