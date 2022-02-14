import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar, RefreshControl } from 'react-native'
import axios from 'axios'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import OrderCards from '../../component/atom/Ordercards';
import { colors as constantColors } from '../../constant'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showNotif, cancelAllNotif } from '../../util/notification'

const ViewOrder = ({ navigation, route }) => {
    const [order, setOrder] = useState([]);
    //const [refresh, setRefresh] = useState(true)

    useEffect(async () => {
        try {
            var value = await AsyncStorage.getItem('token')

            if (value != null) {
                global.token = value
            }
        } catch (error) {
            console.log('error')
        }
    })


    const getOrderData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
        axios.get('https://ngapp-backend.herokuapp.com/order/view/merchant')
            .then(res => {
                console.log(`res Order Data : `, res.data.orders)

                setOrder(res.data.orders)

            }).catch(e => {

            })
    }
    console.log(order)

    useEffect(() => {
        navigation.addListener('focus', getOrderData);
        //getOrderData();
    }, [navigation]);

    const onTapOrder = (item) => {
        navigation.navigate('OrderDetail', {
            screen: 'OrderDetail',
            params: { order: item }
        })
    }

    return (
        <View style={styles.container}>
            {order.order_status == 'done' ?
                showNotif('Order Completed', 'Your Customer Order Has Been Completed')
                : null}
            {order.order_status == 'ready' ?
                showNotif('Order Redy', 'Your Customer Order Has Been Ready')
                : null}
            {order.length + 1 ?
                showNotif('New Order', 'Your Customer Orders are in proses')
                : null}
            <StatusBar
                barStyle="light-content"
                backgroundColor={constantColors.default}
            />
            {/* <Text style={{color: 'black'}}>{global.name}</Text> */}
            {/* <Text style={{color: 'black'}}>{order.length + 1}</Text> */}
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: constantColors.default, paddingLeft: 15, paddingTop: 5 }}>Priority Order</Text>
            <View style={[styles.body, {
                borderColor: constantColors.default,
                borderWidth: 2,
                borderRadius: 20,
                marginBottom: 10,
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5
            }]}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={order.filter((item) => {
                    //     return item.order_type.match('priority')
                    // })}
                    // data= {order.filter((item)=>{
                    //     return item.order_type.match('Priority')
                    // })}
                    data={order.sort((a, b) => {
                        return a.id - b.id
                    }).filter((item) => {
                        return item.order_type.match('Priority')
                    })}
                    renderItem={({ item }) => (
                        <View>
                            <OrderCards
                                item={item}
                                onPress={onTapOrder}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => `${item.id}`}
                // refreshing={refresh}
                // onRefresh={() => getOrderData()}
                />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: constantColors.default, paddingLeft: 15, paddingTop: 5 }}>Basic Order</Text>
            <View style={[styles.body, {
                borderColor: constantColors.default,
                borderWidth: 2,
                borderRadius: 20,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5
            }]}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    // data={order.filter((item) => {
                    //     return item.order_type.match('basic')
                    // })}
                    data={order.sort((a, b) => {
                        return a.id - b.id
                    }).filter((item) => {
                        return item.order_type.match('Basic')
                    })}
                    renderItem={({ item }) => (
                        <View>
                            <OrderCards
                                item={item}
                                onPress={onTapOrder}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
            {/* <View>
                <TouchableOpacity style={{
                    width: 350,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: constantColors.default,
                    borderWidth: 1,
                    marginTop: 15}} onPress={() => showNotif('Test', 'Test')}>
                    <Text>Show Notif</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: 350,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: constantColors.default,
                    borderWidth: 1,
                    marginTop: 15}} onPress={() => cancelAllNotif()}>
                    <Text>Cancel Notif</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

export default ViewOrder

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
    }
})
