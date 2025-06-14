import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/frontend/screen/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './src/frontend/navigation/TabNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationScreen from './src/frontend/header/NotificationScreen'
import SettingsScreen from './src/frontend/screen/SettingsScreen'
import AttendanceScreen from './src/frontend/compound/AttendanceScreen'
import Leaves from './src/frontend/compound/Leaves'
import HolidayList from './src/frontend/compound/HolidayList'
import LeaveStatus from './src/frontend/compound/LeaveStatus'
import Reports from './src/frontend/compound/Reports'
import SalarySlip from './src/frontend/compound/SalarySlip'


const App = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabNavigation} />
          <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
            <Stack.Screen name="SettingsScreen" component={Leaves} />
            <Stack.Screen name="Leaves" component={Leaves} />
            <Stack.Screen name="HolidayList" component={HolidayList} />
            <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
            <Stack.Screen name="Reports" component={Reports} />
            <Stack.Screen name="SalarySlip" component={SalarySlip} />
      

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
