import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Stocks = ({data}) => {
  return (
      <View style={styles.mainContainer}>
        <View style={styles.sectionContainer}>
            <View style={styles.stockContainer}>
                <Text style={styles.stockName}>{data?.symbol}</Text>
                <Text style={styles.normalText}>LTP: <Text style={{fontWeight: 800, color: '#000000'}}>₹ {data?.ltp?.toFixed(2)}</Text></Text>
            </View>
            <View style={styles.stockContainer}>
                <Text style={styles.normalText}>{data?.quantity}</Text>
                <Text style={styles.normalText}>P/L: <Text style={{fontWeight: 800, color: '#000000'}}>₹ {((data?.ltp * data?.quantity) - (data.avgPrice * data?.quantity)).toFixed(2)}</Text></Text>
            </View>
        </View>
        </View>
  )
}

export default Stocks

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff'
    },
    sectionContainer: {
        borderBottomColor: '#e8e9ea',
        borderBottomWidth: 1,
        marginHorizontal:10
    },
    stockContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical: 3
    },
    stockName: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 15
    },
    normalText: {
        fontSize: 13,
        color: '#000000'
    }
})