import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
// text input component
const AddInput = (props) => {
  return (
    <View style={styles.container} >
      {!!props.value.trim() && <Text style={styles.label} >{props.placeholder}</Text>}
        <TextInput style={[styles.input,props.style]} {...props}/>
    </View>
  )
}

export default AddInput

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: "#777",
    paddingHorizontal: 20,
    paddingTop: 5
  }
})