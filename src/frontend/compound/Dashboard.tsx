import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  Wifi, MapPin, Send, Camera, Calendar, Users, Info, Settings, LogOut, List,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/Types';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DashboardOption = {
  id: string;
  label: string;
  icon: any;
  screen?: keyof RootStackParamList;
};


const lucideOptions = [
  { id: 'a1', label: 'Wifi', icon: Wifi ,screen:''},
  { id: 'a2', label: 'Office', icon: MapPin ,screen:'' },
  { id: 'a3', label: 'GPS', icon: Send ,screen:'' },
  { id: 'a4', label: 'Selfie', icon: Camera  ,screen:''},
  { id: 'a5', label: 'Summary', icon: Calendar, screen: 'SummaryScreen' },
  { id: 'a6', label: 'Leaves', icon: Users, screen: 'Leaves' },
  { id: 'a7', label: 'Activities', icon: List  ,screen:''},
  { id: 'a8', label: 'UnScheduled', icon: List  ,screen:''},
  { id: 'a9', label: 'Payslip', icon: Info, screen: 'SalaryScreen' },
  { id: 'a10', label: 'Information', icon: Info, screen: 'Information' },
  { id: 'a11', label: 'Setting', icon: Settings  ,screen:'SettingsScreen'},
  { id: 'a12', label: 'Logout', icon: LogOut  ,screen:''},
];
 
const DashboardScreen = () => {
 
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [checkStatus, setCheckStatus] = useState<{ [key: string]: 'none' | 'in' | 'out' }>({});
  const [lastTap, setLastTap] = useState<{ [key: string]: number }>({});
  

  const getBackgroundColor = (status: 'none' | 'in' | 'out') => {
    switch (status) {
      case 'in':
      case 'out':
        return '#fff';
      default:
        return '#fff';
    }
  };
  
  return (
    <View style={styles.screen}>
     
      <FlatList
        data={lucideOptions}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const IconComponent = item.icon;
          const status = checkStatus[item.id] || 'none';
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: getBackgroundColor(status) }]}
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  // Alert.alert(item.label, 'No screen defined');
                }
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <IconComponent color="#31b8ef" size={28} />
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  card: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6f7fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: { fontSize: 14, textAlign: 'center' },
});





