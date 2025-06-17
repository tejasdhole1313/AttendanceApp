import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  Wifi, MapPin, Send, Camera, Calendar, Users, Info, Settings, LogOut, List,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';

type RootStackParamList = {
  SummaryScreen: undefined;
  Leaves: undefined;
  SalaryScreen: undefined;
  Information: undefined;
  SettingsScreen: undefined;
};

type DashboardOption = {
  id: string;
  label: string;
  icon: any;
  screen?: keyof RootStackParamList | '';
};

const lucideOptions: DashboardOption[] = [
  { id: 'a1', label: 'Wifi', icon: Wifi },
  { id: 'a2', label: 'Office', icon: MapPin },
  { id: 'a3', label: 'GPS', icon: Send },
  { id: 'a4', label: 'Selfie', icon: Camera },
  { id: 'a5', label: 'Summary', icon: Calendar, screen: 'SummaryScreen' },
  { id: 'a6', label: 'Leaves', icon: Users, screen: 'Leaves' },
  { id: 'a7', label: 'Activities', icon: List },
  { id: 'a8', label: 'Payslip', icon: Info, screen: 'SalaryScreen' },
  { id: 'a9', label: 'Information', icon: Info, screen: 'Information' },
  { id: 'a10', label: 'Setting', icon: Settings, screen: 'SettingsScreen' },
  { id: 'a11', label: 'Logout', icon: LogOut  },
];

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [checkStatus] = useState<{ [key: string]: 'none' | 'in' | 'out' }>({});

  const getBackgroundColor = (status: 'none' | 'in' | 'out') => '#fff';

  return (
    <View style={styles.screen}>
      <FlatList
        data={lucideOptions}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item, index }) => {
          const IconComponent = item.icon;
          const status = checkStatus[item.id] || 'none';

          return (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 100}
              duration={600}
              useNativeDriver
            >
              <TouchableOpacity
                style={[styles.card, { backgroundColor: getBackgroundColor(status) }]}
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen as keyof RootStackParamList);
                  } else {
                    Alert.alert(item.label, 'No connected screen yet');
                  }
                }}
                activeOpacity={0.8}
              >
                <View style={styles.iconCircle}>
                  <IconComponent color="#31b8ef" size={28} />
                </View>
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            </Animatable.View>
          );
        }}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 6,
    width: 100,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e6f7fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});
