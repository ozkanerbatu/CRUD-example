import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Store from '../services/Store'
const { height, width } = Dimensions.get("window")
const DetailScreen = (props) => {
  const navigation = useNavigation()
  const { id } = props.route.params
  const [item, setItem] = useState({})
  useEffect(() => {
    Store.getProduct(id).then((res) => {
      if (res.message === 'Success') {
        setItem(res.product)
      } else {
        alert(res.message)
      }
    })
  }, [])

  return (
    <ScrollView>
      <Image source={{ uri: item.avatar }} style={styles.image} />
      <View style={styles.container} >
        <View style={styles.textView} >
          <Text style={styles.text} >{item.name}</Text>
          <Text style={styles.text}>${item.price}</Text>
        </View>
        <Text style={styles.textDesc}>{item.description}</Text>
      </View>
    </ScrollView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  image: {
    width: width,
    height: width,
    borderRadius: 10
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    height: height - width,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textDesc: {
    fontSize: 14,
    color: "#777"

  }
})