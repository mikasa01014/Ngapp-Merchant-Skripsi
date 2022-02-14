import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FoodCards2 from '../../component/atom/FoodCards2';
import { colors as constantColors } from '../../constant'


const Food = ({ navigation }) => {
    const [food, setFood] = useState([])

    const getFoodData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
         axios.get('https://ngapp-backend.herokuapp.com/menu/merchant/product')
            .then(res => {
                setFood(res.data.products)
                console.log(food)
            }).catch(e => {

            })
    }

    useEffect(() => {
        navigation.addListener('focus', getFoodData);
    }, [navigation])


    const onTapFoods = (item) => {
        navigation.navigate('MenuDetails', {
            screen: 'MenuDetails',
            params: { food: item }
        })
    }

    const RenderFooter = () => {
        return (
            <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.signIn, {
                    borderColor: constantColors.default,
                    borderWidth: 1,
                    marginTop: 15
                }]} onPress={() => {navigation.navigate('AddMenus')}}>
                    <Text style={[styles.textSign, {
                        color: constantColors.default
                    }]}>
                        Add Food
            </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={food}
                    renderItem={({ item }) => (
                        <FoodCards2
                            item={item}
                            onPress={onTapFoods}
                        />
                    )}
                    keyExtractor={(item) => `${item.id}`}
                />
                <RenderFooter />
            </View>
        </View>
    )
}

export default Food

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 0.7,
        paddingTop: 5,
    },
    searchBar: {
        flex: 9,
        display: 'flex',
        height: 40,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },
    body: {
        flex: 10,
    },
    emptyCart: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartText: {
        fontSize: 25,
        fontWeight: '700'
    },
    imgCartEmpty: {
        width: 250,
        height: 150,
    },
    footer: {
        flex: 2,
        padding: 10,
        paddingBottom: 20,
    },
    ammountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20

    },
    popUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
    paymentView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 8,
        margin: 4,
        backgroundColor: constantColors.default,

    },
    paymentOption: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    options: {
        display: 'flex',
        height: 115,
        width: 160,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderColor: constantColors.default,
        backgroundColor: '#F2F2F2',
        borderWidth: 0.3,
        borderRadius: 10,
        margin: 8
    },
    optionIcons: {
        width: 100,
        height: 80
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
    },
    signIn: {
        width: 350,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
