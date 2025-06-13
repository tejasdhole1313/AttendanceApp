import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/frontend/screen/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './src/frontend/navigation/TabNavigation'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const App = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabNavigation} />
          <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
