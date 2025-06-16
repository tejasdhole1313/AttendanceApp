import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../header/Header'

const SummaryScreen = () => {
  return (
  <ScrollView>
    <View>
      <Header>

      </Header>
      <Text style={{padding:20, fontSize:20,  }}>Summary</Text>
      
    </View>
  </ScrollView>
  )
}

export default SummaryScreen

const styles = StyleSheet.create({})