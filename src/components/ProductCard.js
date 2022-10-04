import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const ProductCard = (props) => {
    const { item } = props
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Details", { id:item._id })} >
            <Image source={{ uri: item.avatar }} style={styles.image} />
            <View style={styles.textView} >
                <Text style={styles.text} >{item.name}</Text>
                <Text style={styles.text} >$ {item.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent:"space-between",
        margin: 10,
        elevation: 5
    },
    image: {
        width: 100,
        height: 120,
        alignSelf: "center",
        marginTop: 10
    },
    textView: {
        backgroundColor: "#EF7438",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    text: {
        color: "white",
        fontWeight: "bold"
    }

})