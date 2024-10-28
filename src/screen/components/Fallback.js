import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Fallback = () => {
  return (
    <View>
      <Text style={{
        textAlign:'center', 
        fontSize: 20, 
        paddingVertical:100,
        fontStyle:"italic",
        color:"#949494"}}
        >
            Once you add some tasks they will be displayed here.
            
        </Text>
    </View>
  )
}

export default Fallback

const styles = StyleSheet.create({})