import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DashboardScreen from '../compound/Dashboard'
import Header from '../header/Header';

const MenuScreen = () => {
  return (
   <ScrollView>
    <Header  onNotificationPress={() => console.log('Bell')} />
    <DashboardScreen></DashboardScreen>
   </ScrollView>
  )
}

export default MenuScreen

const styles = StyleSheet.create({})