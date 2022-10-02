import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
// text input component
const AddInput = (props) => {
  return (
    <View style={styles.container} >
        <TextInput style={[styles.input,props.style]} {...props}/>
    </View>
  )
}

export default AddInput

const styles = StyleSheet.create({})