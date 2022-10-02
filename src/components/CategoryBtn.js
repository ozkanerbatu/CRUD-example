import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CategoryBtn = (props) => {
    const { selectedCategory, name, setSelectedCategory, filterProducts } = props
    const onPress = () => {
        filterProducts(name)
        setSelectedCategory(name)
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.btn, selectedCategory === name && { backgroundColor: "red" }]} >
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryBtn

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center'
    }

})