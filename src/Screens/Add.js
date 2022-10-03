import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AddInput from '../components/AddInput'
import StoreService from '../services/Store'

const AddScreen = (props) => {
  const { selectedCategory, categories } = props.route.params
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: selectedCategory === "All" ? "" : selectedCategory,
    avatar: "",
    developerEmail: "ozkanerbatuhan@gmail.com"
  })
  const mergeData = (partialState) => {
    setData((prevState) => ({ ...prevState, ...partialState }))
  }
  const handleSubmit = () => {
    StoreService.addProduct(data).then(res => {
      if (res.message === "Success") {
        alert("Product Added")
        const addedCategory = res.product.category
        props.navigation.navigate("Home", { addedCategory })
      } else {
        alert(res.message)
      }
    })
  }
  return (
    <ScrollView style={styles.container} >
      <AddInput
        placeholder="Name"
        style={styles.input}
        value={data.name}
        onChangeText={text => mergeData({ name: text })}
      />
      <AddInput
        placeholder="Price"
        style={styles.input}
        value={data.price}
        onChangeText={text => mergeData({ price: parseFloat(text) })}
        keyboardType="numeric"
      />

      <AddInput
        placeholder="Description"
        style={[styles.input,{textAlignVertical: "top", height: 150}]}
        returnKeyType="done"
        numberOfLines={30}
        multiline
        value={data.description}
        onChangeText={text => mergeData({ description: text })}
      />
      <AddInput
        placeholder="Image"
        style={styles.input}
        value={data.avatar}
        onChangeText={text => mergeData({ avatar: text })}
      />
      <Text style={styles.label} >Selected Category: {data.category}</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { mergeData({ category: item.name }) }} style={[styles.btn, data.category === item.name && { backgroundColor: "#EF7438" }]} >
            <Text style={[styles.text,data.category !== item.name && { color: "black" }]} >{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submit} >
        <Text style={styles.text} >Add</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center'
  },
  submit: {
    backgroundColor: '#EF7438',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop:50,
    marginHorizontal:50
  },
  label: {
    fontSize: 14,
    color: "#777",
    paddingHorizontal: 20,
    paddingTop: 5
  },
  text: {
    color: "white",
    fontWeight: 'bold',
  }
})