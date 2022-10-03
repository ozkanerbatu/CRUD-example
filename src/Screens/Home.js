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
    const [fullProducts, setFullProducts] = useState([])
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [loading, setLoading] = useState(true)
    const getProducts = async () => {
        setLoading(true)
        StoreService.getProduct().then((res) => {
            if (res.message === 'Success') {
                setFullProducts(res.products)
                setProducts(res.products)
                setLoading(false)
            } else {
                alert(res.message)
                setLoading(false)
            }
        })
    }
    const getCategories = () => {
        StoreService.getCategory().then((res) => {
            if (res.message === 'Success') {
                setCategories(res.categories)
            } else {
                alert(res.message)
            }
        })
    }
    useEffect(() => {
        console.log('get products');
        getProducts()
    }, [props.route])
    useEffect(() => {
        getCategories()
    }, [])
    const filterProducts = (category) => {
        if (category === 'All') {
            getProducts()
        } else {
            setProducts(fullProducts.filter(item => item.category === category))
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
                        contentContainerStyle={{ backgroundColor: "white",alignContent:"center",alignItems:"center" }}
                    />
                </View>
                <View style={styles.productsView} >
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        data={products}
                        renderItem={({ item }) => <ProductCard item={item} />}
                        ListEmptyComponent={() => !loading && <View style={styles.emptyView} ><Text style={styles.emptyText} >No Products</Text></View>}
                        numColumns={2}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                    {loading && <View style={styles.loadingView} ><Text style={styles.loadingText} >Loading...</Text></View>}
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Add", { selectedCategory, categories })} style={styles.iconView} >
                <AntDesign name="plus" size={24} color="white" />
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
    },
    productsView: {
        backgroundColor: '#fff',
        height: height * 0.9,
    },
    iconView: {
        backgroundColor: '#EF7438',
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
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.8)",
        position: "absolute",
        height: height,
        width: width,
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#EF7438"
    }
})