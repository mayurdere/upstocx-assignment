import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Upstox Holdings</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#7d017d',
        padding: 10
    },
    title: {
        color: '#fff'
    }
})