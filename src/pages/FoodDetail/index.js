import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import { colors as constantColors } from '../../constant'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momment from 'moment'

const FoodDetail = ({ navigation, route }) => {
    const { food } = route.params

    const [foods, setFoods] = useState([])
    const [visble, setVisble] = useState(false)
    const [currentTime, setCurrentTime] = useState(momment().format('HH:mm'))

    const getFoodData = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
        axios.get(`https://ngapp-backend.herokuapp.com/merchant/product/update/${food.id}`)
            .then(res => {
                console.log('res food data: ', res.data.product)
                //let menuData = Object.assign({}, res.data)
                setFoods(res.data.product)
                //AsyncStorage.setItem('menu', JSON.stringify(menu))
            }).catch(e => {

            })
    }

    const onDeleteOrder = async(food) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
        await axios.delete(`https://ngapp-backend.herokuapp.com/merchant/product/delete/${food.id}`)
        .then(res => {
            console.log('res deleted', res)
            Alert.alert('Successful', "Food Has been deleted", [
                {text : "Okay"}
            ])
        })

    }
    
    useEffect(() => {
        navigation.addListener('focus', getFoodData);
    }, [navigation])


    console.log('after update : ',food)


    const getImage = (image) => {
        switch (image) {
            case "CCB":
                return require('../../asset/imagesFood/crispy-chicken-burger.jpg')
                break;
            case "CCBWHM":
                return require('../../asset/imagesFood/honey-mustard-chicken-burger.jpg')
                break;
            case "CBFF":
                return require('../../asset/imagesFood/baked-fries.jpg')
                break;
        }
    }

    const onTapUpdate = (item) => {
        navigation.navigate('UpdateMenus', {
            screen: 'UpdateMenus',
            params: { foods: item }
        })
    }

    const onTapDeletedFoods = () => {
        Alert.alert(
            'Delete Menu',
            'Do you want to delete this Menu ?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                {
                    text: 'Yes', onPress: () => {
                        onDeleteOrder(food);
                        navigation.goBack();
                    }
                }
            ]
        )
    }

    const ImageView = () => {
        if(food.image === 'CCB') {
            return (
                <ImageBackground source={getImage(food.image)} style={styles.background} >
                    <View style={styles.textBackground}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 30,
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>{food.name}</Text>
                    </View>
                </ImageBackground>
            )
        } else if(food.image === 'CCBWHM') {
            return (
                <ImageBackground source={getImage(food.image)} style={styles.background}> 
                    <View style={styles.textBackground}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 30,
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>{food.name}</Text>
                    </View>
                </ImageBackground>
            )
        } else if(food.image === 'CBFF') {
            return (
                <ImageBackground source={getImage(food.image)} style={styles.background}> 
                    <View style={styles.textBackground}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 30,
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>{food.name}</Text>
                    </View>
                </ImageBackground>
            )
        } else {
            return (
                <ImageBackground source={{uri: `data:image/jpeg;base64,${foods.image}`}} style={styles.background} > 
                    <View style={styles.textBackground}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 30,
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>{foods.name}</Text>
                    </View>
                </ImageBackground>
            )
        }
    }
    
    const RenderFooter = () => {
        return (
            <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.signIn, {
                    borderColor: constantColors.default,
                    borderWidth: 1,
                    marginTop: 15
                }]} onPress={() => onTapUpdate(food)}>
                    <Text style={[styles.textSign, {
                        color: constantColors.default
                    }]}>
                        Update Menu
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const RenderDelete = () => {
        return (
            <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.signIn, {
                    borderColor: 'red',
                    borderWidth: 1,
                    marginTop: 15
                }]} onPress={onTapDeletedFoods}>
                    <Text style={[styles.textSign, {
                        color: 'red'
                    }]}>
                        Delete Menu
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.body}>
            <ImageView />
                <View style={styles.description}>

                    <Text style={{
                        fontSize: 25,
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>{foods.description} </Text>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '700',
                        textAlign: 'center',
                        margin: 15,
                        color: constantColors.default
                    }}>Rp. {foods.price}</Text>
                </View>
            </View>
        

            <RenderFooter />
            <RenderDelete />
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    body:{
        flex: 11,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    background:{
        width: Dimensions.get('screen').width,
        height: 250,
        justifyContent: 'flex-end',
    },
    textBackground:{
        height: 90,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        justifyContent: 'center'
    },
    description:{
        display: 'flex',
        height: 300,
        padding: 15
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
