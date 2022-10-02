import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import StoreService from '../services/Store'
import { useNavigation } from '@react-navigation/native'
import CategoryBtn from '../components/CategoryBtn'
import ProductCard from '../components/ProductCard'

import { AntDesign } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window")
const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    useEffect(() => {
        console.log('get products');
        StoreService.getProduct()
            .then(res => { res.message === 'Success' ? setProducts(res.products) : alert(res.message) })
    }, [])
    useEffect(() => {
        StoreService.getCategory().then(res => { res.message === 'Success' ? setCategories(res.categories) : alert(res.message) })
    }, [])
    const filterProducts = (category) => {
        if (category === 'All') {
            StoreService.getProduct().then(res => { res.message === 'Success' ? setProducts(res.products) : alert(res.message) })
        } else {
            setProducts(prev => prev.filter(item => item.category === category))
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container} >
                <View style={styles.categoriesView} >
                    <FlatList
                        data={[{ name: "All", _id: "1" }, ...categories]}
                        renderItem={({ item }) => <CategoryBtn selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} filterProducts={filterProducts} name={item.name} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.productsView} >
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        data={products}
                        renderItem={({ item }) => <ProductCard item={item} />}
                        ListEmptyComponent={() => <View style={styles.emptyView} ><Text style={styles.emptyText} >No Products</Text></View>}
                        numColumns={2}

                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Add", { selectedCategory, categories })} style={styles.iconView} >
                <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    categoriesView: {
        height: 50,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    productsView: {
        backgroundColor: '#fff',
        height: height * 0.9,
    },
    iconView: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.1,
        padding: 10,
        borderRadius: 100,
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})