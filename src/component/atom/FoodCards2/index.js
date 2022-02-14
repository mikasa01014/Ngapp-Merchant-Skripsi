import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { colors as constantColors } from '../../../constant'


const FoodCards2 = ({ item, onPress }) => {

    const getImage = (image) => {
        switch (image) {
            case "CCB":
                return require('../../../asset/imagesFood/crispy-chicken-burger.jpg')
                break;
            case "CCBWHM":
                return require('../../../asset/imagesFood/honey-mustard-chicken-burger.jpg')
                break;
            case "CBFF":
                return require('../../../asset/imagesFood/baked-fries.jpg')
                break;
        }
    }

    const ImageView = () => {
        if(item.image === 'CCB') {
            return (
                <Image source={getImage(item.image)} style={styles.foodImg} />
            )
        } else if(item.image === 'CCBWHM') {
            return (
                <Image source={getImage(item.image)} style={styles.foodImg} />
            )
        } else if(item.image === 'CBFF') {
            return (
                <Image source={getImage(item.image)} style={styles.foodImg} />
            )
        } else {
            return (
                <Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.foodImg} />
            )
        }
    }

    return (
        <View style={styles.container}>
           <ImageView /> 
            <TouchableOpacity onPress={() => onPress(item)} style={styles.button}>
                <View style={styles.foodTextContainer}>
                    <Text style={{marginBottom: 5, fontWeight: 'bold', color: constantColors.default}}>{item.name}</Text>
                    <Text>{item.description}</Text>
                </View>
                <View style={styles.foodPriceContainer}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: constantColors.default
                    }}>Rp. {item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FoodCards2

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: Dimensions.get('screen').width-20,
        margin: 10,
        borderRadius: 20,
        height: 104,
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: constantColors.default,
        flexDirection: 'row'
    },
    foodImg:{
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    button:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    foodTextContainer:{
        display: 'flex',
        flex: 7,
        padding:5,
    },
    foodPriceContainer:{
        display: 'flex',
        flex: 4,
        padding: 7,
        justifyContent: 'space-around',
        alignItems: 'center' ,
        marginRight: 5, 
    }
})
