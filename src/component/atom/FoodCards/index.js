import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { colors as constantColors } from '../../../constant'

const FoodCards = ({item, onPress, unit}) => {
    const getImage = (image) => {
        switch (image) {
            case "CCB" :
                return require('../../../asset/imagesFood/crispy-chicken-burger.jpg')
                break;
            case "CCBWHM" : 
                return require('../../../asset/imagesFood/honey-mustard-chicken-burger.jpg')
                break;
            case "CBFF" :
                return require('../../../asset/imagesFood/baked-fries.jpg')
                break;
            }
        }
    


    return (
        <View style={styles.container}>
          <Image source={{ uri: `data:image/jpeg;base64,${item.image}`}} style={styles.foodImg}/>
          <TouchableOpacity onPress={() => onPress(item)} style={styles.button}>
              <View style={styles.foodTextContainer}>
                  <Text>{item.name}</Text>
                  <Text>{item.category}</Text>
              </View>
              <View style= {styles.foodPriceContainer}>
                  <Text style={{
                      fontSize: 16,
                      fontWeight: '500',
                  }}>Rp. {item.price}
                  </Text>
                  <Text style={{ 
                        fontSize:20, 
                        fontWeight:'bold', 
                        color: constantColors.default 
                   }}> Qty: {unit} </Text> 
              </View>
          </TouchableOpacity>
        </View>
    )
}

export default FoodCards

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
        padding:10,
    },
    foodPriceContainer:{
        display: 'flex',
        flex: 4,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center' ,
        marginRight: 5, 
    }
})
