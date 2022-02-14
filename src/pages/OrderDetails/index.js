import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import FoodCards from '../../component/atom/FoodCards';
import { colors as constantColors } from '../../constant';
import moment from 'moment'
import { showNotif, cancelAllNotif } from '../../util/notification'

const OrderDetails = ({ navigation, route }) => {
    const { order } = route.params;
    const [orders, setOrders] = useState([])
    const [qty, setQty] = useState([])




    const getOrderData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
        axios.get(`https://ngapp-backend.herokuapp.com/order/detail/merchant/${order.id}`)
            .then(res => {
                console.log('res food data: ', res.data.order)

                setOrders(res.data.order)
                setQty(res.data.order.unit)

                console.log(order)

            }).catch(e => {

            })
    }

    console.log(qty)


    useEffect(() => {
        navigation.addListener('focus', getOrderData);
    }, [navigation])


    const onReadydOrder = () => {
        axios.patch(`https://ngapp-backend.herokuapp.com/order/ready/${order.id}`).then(res => {
            console.log('res order Status ready', res.data)
        }).catch(e => {
            console.log(e)
        })
    }


    const onTapReadyOrder = () => {
        Alert.alert(
            'Ready Order',
            'Do you want to Ready this order ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        onReadydOrder();
                        navigation.goBack();
                        showNotif('Order Ready', 'Your Customer Order Has Been Ready')
                    }
                }
            ],
            { cancelable: false }
        )
    }


    const headerCards = () => {
        if (order.order_status.toLowerCase() === "ready") {
            return (
                <>
                    <View style={styles.headerContainer}>

                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Order Type: {orders.order_type}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Order Amount: Rp.{orders.total_price}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Paid Through: {orders.paid_thru}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Status: {orders.order_status}
                        </Text>
                        {/* <Text style={styles.headerText}>
                            Customer Name: {orders.customer.first_name}, {orders.customer.last_name}
                        </Text> */}
                    </View>
                    {/* <View style={{
                        display: 'flex',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 70,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'red',
                        borderRadius: 15,
                    }}>
                        <Text style={[styles.headerText, {
                            fontWeight: '700',
                            fontSize: 25,
                            color: 'red',
                        }]}>
                            Cancelled Time: {moment(orders.orderCancelledTime).format('HH:mm')}
                        </Text>
                    </View> */}
                </>
            )
        } else if (order.order_status.toLowerCase() === "done") {
            return (
                <>
                    <View style={styles.headerContainer}>
                        {/* <Text style={styles.headerText}>
                            Order Date: {moment(orders.pickupTime).format('DD MMMM YYYY')}
                        </Text> */}
                        <Text style={[styles.headerText, { color: 'green' }]}>
                            Order Type: {orders.order_type}
                        </Text>
                        <Text style={[styles.headerText, { color: 'green' }]}>
                            Order Amount: Rp.{orders.total_price}
                        </Text>
                        <Text style={[styles.headerText, { color: 'green' }]}>
                            Paid Through: {orders.paid_thru}
                        </Text>
                        <Text style={[styles.headerText, { color: 'green' }]}>
                            Status: {orders.order_status}
                        </Text>
                        {/* <Text style={styles.headerText}>
                            Customer Name: {orders.customer.first_name}, {orders.customer.last_name}
                        </Text> */}
                    </View>
                    {/* <View style={{
                        display: 'flex',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 70,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'green',
                        borderRadius: 15,
                    }}>
                        <Text style={[styles.headerText, {
                            fontWeight: '700',
                            fontSize: 25,
                            color: 'green',
                        }]}>
                            Completed Time: {moment(orders.orderCompletedTime).format('HH:mm')}
                        </Text>
                    </View> */}
                </>
            )
        } else {
            return (
                <>
                    <View style={styles.headerContainer}>
                        {/* <Text style={styles.headerText}>
                            Order Date: {moment(orders.pickupTime).format('DD MMMM YYYY')}
                        </Text> */}
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Order Type: {orders.order_type}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Order Amount: Rp.{orders.total_price}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Paid Through: {orders.paid_thru}
                        </Text>
                        <Text style={[styles.headerText, { color: constantColors.default }]}>
                            Status: {orders.order_status}
                        </Text>
                        {/* <Text style={styles.headerText}>
                            Customer Name: {orders.customer.first_name} {orders.customer.last_name}
                        </Text> */}
                    </View>
                    {/* <View style={{
                        display: 'flex',
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 70,
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: constantColors.default,
                        borderRadius: 15,
                    }}>
                        <Text style={[styles.headerText, {
                            fontWeight: '700',
                            fontSize: 25,
                            color: constantColors.default,
                        }]}>
                            PickUp Time: {moment(orders.pickupTime).format('HH:mm')}
                        </Text>
                    </View> */}
                </>
            )
        }
    }

    const footerCards = () => {
        if (order.order_status.toLowerCase() === "ready") {
            if (order.order_type === 'Basic') {
                return (
                    <View style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 300,
                        borderWidth: 2,
                        borderColor: constantColors.default,
                        borderRadius: 15,
                        margin: 10,
                    }}>
                        <View>
                            <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Order With </Text>
                            <Text style={{ fontSize: 35, color: constantColors.default, textAlign: 'center', fontWeight: 'bold' }}> No. {orders.id}</Text>
                            <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Have Been Ready</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        marginBottom: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 300,
                        borderWidth: 2,
                        borderColor: constantColors.default,
                        borderRadius: 15,
                        margin: 10,
                    }}>
                        <View>
                            <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Order With </Text>
                            <Text style={{ fontSize: 35, color: constantColors.default, textAlign: 'center', fontWeight: 'bold' }}> No. {orders.id}</Text>
                            <Text style={{ fontSize: 18, color: constantColors.default, textAlign: 'center' }}> Have Been Ready</Text>
                        </View>
                    </View>
                )
            }
        } else if (order.order_status.toLowerCase() === "done") {
            if (order.order_type === 'Basic') {
                return (
                    <View >
                        <View style={{
                            marginBottom: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300,
                            borderWidth: 2,
                            borderColor: 'green',
                            borderRadius: 15,
                            margin: 10,
                        }}>
                            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Order With </Text>
                            <Text style={{ fontSize: 35, color: 'green', textAlign: 'center', fontWeight: 'bold' }}> No. {orders.id}</Text>
                            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Have Been Completed</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View >
                        <View style={{
                            marginBottom: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300,
                            borderWidth: 2,
                            borderColor: 'green',
                            borderRadius: 15,
                            margin: 10,
                        }}>
                            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Order With </Text>
                            <Text style={{ fontSize: 35, color: 'green', textAlign: 'center', fontWeight: 'bold' }}> No. {orders.id}</Text>
                            <Text style={{ fontSize: 18, color: 'green', textAlign: 'center' }}> Have Been Completed</Text>
                        </View>
                    </View>
                )
            }
        } else {
            if (order.order_type === 'Basic') {
                return (
                    <View>
                        <View style={{
                            display: 'flex',
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300,
                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderColor: constantColors.default,
                            borderRadius: 15,
                        }}>
                            <Text style={{ fontSize: 28, color: constantColors.default }}> Order No. </Text>
                            <Text style={{ fontSize: 40, color: constantColors.default, fontWeight: 'bold' }}> {orders.id} </Text>
                        </View>
                        {/* <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.signIn, {
                                borderColor: constantColors.default,
                                borderWidth: 1,
                                marginTop: 15
                            }]} onPress={onTapCompletedOrder}>
                                <Text style={[styles.textSign, {
                                    color: constantColors.default
                                }]}>
                                    Ready Order
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.signIn, {
                                borderColor: constantColors.default,
                                borderWidth: 1,
                                marginTop: 15
                            }]} onPress={onTapReadyOrder}>
                                <Text style={[styles.textSign, {
                                    color: constantColors.default
                                }]}>
                                    Ready Order
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View>
                        <View style={{
                            display: 'flex',
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300,
                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderColor: constantColors.default,
                            borderRadius: 15,
                        }}>
                            <Text style={{ fontSize: 28, color: constantColors.default }}> Order No. </Text>
                            <Text style={{ fontSize: 40, color: constantColors.default, fontWeight: 'bold' }}> {order.id} </Text>
                        </View>
                        {/* <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.signIn, {
                                borderColor: constantColors.default,
                                borderWidth: 1,
                                marginTop: 15
                            }]} onPress={onTapCompletedOrder}>
                                <Text style={[styles.textSign, {
                                    color: constantColors.default
                                }]}>
                                    Complete Order
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.signIn, {
                                borderColor: constantColors.default,
                                borderWidth: 1,
                                marginTop: 15
                            }]} onPress={onTapReadyOrder}>
                                <Text style={[styles.textSign, {
                                    color: constantColors.default
                                }]}>
                                    Ready Order
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
    }

    return (
        // <View>
        //     <Text>OrderDetails page</Text>
        //     <Text>{order.orderDate}</Text>
        //     <Text>Rp. {order.totalAmount}</Text>
        // </View>

        <View style={styles.container}>
            {order.order_status == 'done' ?
                showNotif('Order Completed', 'Your Customer Order Has Been Completed')
                : null}
            {order.order_status == 'ready' ?
                showNotif('Order Ready', 'Your Customer Order Has Been Ready')
                : null}
             {/* {order.order_status == 'processing' ?
                showNotif('New Order', 'Your Customer Orders are in proses')
                : null} */}
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={order.products}
                    renderItem={({ item, index }) => <FoodCards
                        item={item}
                        onPress={() => { }}
                        unit={qty[index]}
                    />
                    }
                    keyExtractor={(item) => `${item.id}`}
                    ListHeaderComponent={headerCards}
                    ListFooterComponent={footerCards}
                />
            </View>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 0.7,
        paddingTop: 5,
        alignItems: 'center',
    },
    searchBar: {
        display: 'flex',
        height: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 11,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    headerContainer: {
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,

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
