import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AddInput from '../components/AddInput'
import CategoryBtn from '../components/CategoryBtn'
import StoreService from '../services/Store'

const AddScreen = (props) => {
  const { selectedCategory, categories, setSelectedCategory } = props.route.params
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: selectedCategory,
    avatar: "",
    developerEmail: "ozkanerbatuhan@gmail.com"
  })
  const mergeData = (partialState) => {
    setData((prevState) => ({ ...prevState, ...partialState }))
  }
  const handleSubmit = () => {
    StoreService.addProduct(data).then(res => {
      if(res.message === "Success"){
        alert("Product Added")
        const addedCategory = res.product.category
        props.navigation.navigate("Home",{addedCategory})
      }else{
        alert(res.message)
      }
    })
  }
  return (
    <View style={styles.container} >
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
        style={[styles.input]}
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
      <FlatList
        data={[{ name: "All", _id: "1" }, ...categories]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { mergeData({ category: item.name }) }} style={[styles.btn, data.category === item.name && { backgroundColor: "red" }]} >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submit} >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center'

  }
})