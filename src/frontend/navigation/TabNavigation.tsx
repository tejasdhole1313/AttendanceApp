import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screen/HomeScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CalenderScreen from '../screen/CalenderScreen'
import SettingsScreen from '../screen/SettingsScreen'
import TeamScreens from '../screen/TeamScreens'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline'
          else if (route.name === 'Attendance') iconName = focused ? 'calendar' : 'calendar-outline'
          else if (route.name === 'Team') iconName = focused ? 'people' : 'people-outline'
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline'

          return <Ionicons name={iconName ?? 'help'} size={size} color={color} />
        },
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#ffffff',
          elevation: 10,
        },
        tabBarActiveTintColor: '#31b8ef',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Attendance" component={CalenderScreen} />
        <Tab.Screen name="Team" component={TeamScreens} />
        <Tab.Screen name="Settings" component={SettingsScreen} />

      

    </Tab.Navigator>
  )
}

export default TabNavigation


const styles = StyleSheet.create({})