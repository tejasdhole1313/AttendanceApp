import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../header/Header'

const SummaryScreen = () => {
  return (
  <ScrollView>
    <View>
        <Header
  onMenuPress={() => console.log('Menu pressed')}
  onNotificationPress={() => console.log('Notification pressed')}
/>



     
      
    </View>
  </ScrollView>  
  )
}

export default SummaryScreen

const styles = StyleSheet.create({})