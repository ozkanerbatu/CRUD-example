import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DetailScreen = (props) => {
  const navigation = useNavigation()
  const { item } = props.route.params
  console.log(item);
  return (
    <View>
      <Image source={{ uri: item.avatar }} style={styles.image} />
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Text>{item.description}</Text>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})