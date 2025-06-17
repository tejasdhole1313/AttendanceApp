import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/frontend/screen/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './src/frontend/navigation/TabNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NotificationScreen from './src/frontend/header/NotificationScreen'
import SettingsScreen from './src/frontend/screen/SettingsScreen'
import SummaryScreen from './src/frontend/compound/SummaryScreen'
import SalaryScreen from './src/frontend/compound/SalaryScreen'
import Leaves from './src/frontend/compound/Leaves'
import HolidayList from './src/frontend/compound/HolidayList'
import LeaveStatus from './src/frontend/compound/LeaveStatus'
import Reports from './src/frontend/compound/Reports'
import SalarySlip from './src/frontend/compound/SalarySlip'
import Information from './src/frontend/compound/Information'
import LoginScreen from './src/frontend/screen/LoginScreen'
import SplashScreen from './src/frontend/screen/SplashScreen'
import Pdf from 'react-native-pdf'
import PDFView from './src/frontend/compound/PDFView'


const App = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Splash'>
  <Stack.Screen name="Splash" component={SplashScreen}/>
         <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tab" component={TabNavigation} />
          <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        
            <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
            <Stack.Screen name="SettingsScreen" component={Leaves} />
            <Stack.Screen name="Leaves" component={Leaves} />
            <Stack.Screen name="HolidayList" component={HolidayList} />
            <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
            <Stack.Screen name="Reports" component={Reports} />
             <Stack.Screen name="pdf" component={PDFView} />
   
            
            <Stack.Screen name="SalaryScreen" component={SalaryScreen} />
                   <Stack.Screen name="Information" component={Information} />
      

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
