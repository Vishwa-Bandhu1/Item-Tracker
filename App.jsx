import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen';
import AllItems from './src/screens/AllItems';
import CreateScreen from './src/screens/CreateScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <HomeScreen />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})