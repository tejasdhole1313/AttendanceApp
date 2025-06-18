import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/HomeScreen';
import CalenderScreen from '../screen/CalenderScreen';
import SettingsScreen from '../screen/SettingsScreen';
import TeamScreens from '../screen/ReportScreen';
import MenuScreen from '../screen/MenuScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
  >
    <View style={styles.menuButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Attendance') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Report') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'Menu') iconName = focused ? 'menu' : 'menu';

          return <Ionicons name={iconName ?? 'help'} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#ffffff',
          elevation: 10,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#31b8ef',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Attendance" component={CalenderScreen} />

      {/* Middle Menu Icon Button */}
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen name="Report" component={TeamScreens} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const EmptyScreen = () => {
  // This can be a modal trigger or custom menu later
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 18 }}>Menu Button Clicked!</Text>
    </View>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  customButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
