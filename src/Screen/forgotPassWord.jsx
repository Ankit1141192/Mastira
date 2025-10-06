import { StyleSheet, Text, View} from 'react-native'
import React from 'react'

const ForgotPassword = () => {
  return (
    <View>
      <Text style={styles.text}>Forgot Password</Text>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    text:{
        color:'black',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center', 
        marginTop:20
    }
})