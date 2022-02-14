import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    Alert
} from 'react-native'

import { colors as constantColors } from '../../constant/colors'
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
import ImagePicker from 'react-native-image-crop-picker';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../../component'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import momment from 'moment'
import { Picker } from '@react-native-picker/picker'


const addFoods = ({ navigation }) => {
    let numreg = /^[0-9]+$/;
    let randomNumber = Math.floor((Math.random() * 50) + 1);

    const [images, setImages] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [check_categoryInputChange, setCheck_categoryInputChange] = useState(false)
    const [check_nameInputChange, setCheck_nameInputChange] = useState(false)
    const [check_priceInputChange, setCheck_priceInputChange] = useState(false)
    const [check_descriptionInputChange, setCheck_descriptionInputChange] = useState(false)
    const [isValidCategory, setIsValidCategory] = useState(true)
    const [isValidPrice, setIsValidPrice] = useState(true)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidDescription, setIsValidDescription] = useState(true)
   

    const choosePhotoFromLibarary = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
            compressImageQuality: 0.2
        }).then((image) => {
            console.log(image);
            setImages(image.data)
            console.log(images)

        }).catch(e => {
            
        })
    }

    
    const addFoodData = () => {
        const data = {
            name ,
            description ,
            price,
            category ,
            image : images,
        }



        if (name.length == 0 &&
            description.length == 0 &&
            price.length == 0 &&
            category.length == 0
        ) {
            Alert.alert('Wrong Input!', 'All field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (name.length == 0) {
            Alert.alert('Wrong Input!', 'name field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (description.length == 0) {
            Alert.alert('Wrong Input!', 'Description field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (price.length == 0) {
            Alert.alert('Wrong Input!', 'Price field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        } else if (category.length == 0) {
            Alert.alert('Wrong Input!', 'Category field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`
        axios.post(`https://ngapp-backend.herokuapp.com/merchant/product/insert`, data)
            .then(res => {
                console.log(`res Order Data : `, res)
                navigation.goBack();
            }).catch(e => {

            })

    }

    const nameInputChange = (val) => {
        if (val.trim().length > 0) {
            setName(val)
            setCheck_nameInputChange(true)
            setIsValidName(true)
        } else {
            setName(val)
            setCheck_nameInputChange(false)
            setIsValidName(false)
        }
    }

    const categoryInputChange = (val) => {
        if (val.trim().length > 0) {
            setCategory(val)
            setCheck_categoryInputChange(true)
            setIsValidCategory(true)
        } else {
            setCategory(val)
            setCheck_categoryInputChange(false)
            setIsValidCategory(false)
        }
    }

    const priceInputChange = (val) => {
        if (val.trim().length > 0 && numreg.test(val) === true) {
            setPrice(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_priceInputChange(true)
            setIsValidPrice(true)
        } else {
            setPrice(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_priceInputChange(false)
            setIsValidPrice(false)
        }

    }

    const descriptionInputChange = (val) => {
        if (val.trim().length > 0) {
            setDescription(val)
            setCheck_descriptionInputChange(true)
            setIsValidDescription(true)
        } else {
            setDescription(val)
            setCheck_descriptionInputChange(false)
            setIsValidDescription(false)
        }
    }



    const handleValidName = (val) => {
        if (val.trim().length > 0) {
            setIsValidName(true)
        } else {
            setIsValidName(false)
        }
    }

    const handleValidCategory = (val) => {
        if (val.trim().length > 0) {
            setIsValidCategory(true)
        } else {
            setIsValidCategory(false)
        }
    }

    const handleValidPrice = (val) => {
        if (val.trim().length > 0 && numreg.test(val) === true) {
            setIsValidPrice(true)
        } else {

            setIsValidPrice(false)
        }
    }

    const handleValidDescription = (val) => {
        if (val.trim().length > 0) {
            setIsValidDescription(true)
        } else {
            setIsValidDescription(false)
        }
    }

    const ImageView = () => {
        if (images == null) {
            return (
                <View style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 2, borderColor: constantColors.default, justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                    <Icon2 name='camera' size={30} color={constantColors.default} />
                </View>
            )
        } else {
            return (
                <Image source={{ uri: `data:image/jpeg;base64,${images}` }} style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 2, borderColor: constantColors.default }} />
            )
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.navigations} >
                    <TouchableOpacity onPress={() => choosePhotoFromLibarary()}>
                        <ImageView />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>

                    <Text style={styles.text_footer}>Food Name</Text>
                    <View style={styles.action}>
                        <Icon4
                            name="fast-food-outline"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10, paddingLeft: 10 }}
                        />
                        <TextInput
                            placeholder='Menu Name'
                            value={name}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={(val) => nameInputChange(val)}
                            onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                        />
                        {check_nameInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 10, paddingRight: 10 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidName ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Food Name Format is wrong!</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Description</Text>
                    <View style={styles.action}>
                        <Icon5
                            name="description"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10, paddingLeft: 10 }}
                        />
                        <TextInput
                            placeholder='Menu Description'
                            value={description}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => descriptionInputChange(val)}
                            onEndEditing={(e) => handleValidDescription(e.nativeEvent.text)}
                        />
                        {check_descriptionInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 10, paddingRight: 10 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidDescription ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Description can't be empty</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Category</Text>
                    <View style={styles.action}>
                        <Icon3
                            name="food"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10, paddingLeft: 10 }}
                        />
                        <TextInput
                            placeholder='Menu Category'
                            value={category}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => categoryInputChange(val)}
                            onEndEditing={(e) => handleValidCategory(e.nativeEvent.text)}
                        />
                        {check_categoryInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 10, paddingRight: 10 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidCategory ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Category can't be empty</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Price</Text>
                    <View style={styles.action}>
                        <Icon4
                            name="pricetag-outline"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10, paddingLeft: 10 }}
                        />
                        <TextInput
                            placeholder='Menu price'
                            value={price}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='number-pad'
                            onChangeText={(val) => priceInputChange(val)}
                            onEndEditing={(e) => handleValidPrice(e.nativeEvent.text)}
                        />
                        {check_priceInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 10, paddingRight: 10 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidPrice ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Price must be numeric</Text>
                        </Animatable.View>
                    }

                </View>
                <View style={styles.button}>
                    <Button title='Submit'
                        onPress={addFoodData}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default addFoods

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    navigations: {
        flex: 3,
        marginTop: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    body: {
        flex: 10,
        display: 'flex',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 17,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: constantColors.default
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 16,
        color: '#05375a',
        paddingBottom: 5,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 10,
        flex: 2,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    picker: {
        width: 200,
        height: 40,
        borderColor: constantColors.default,
        borderWidth: 2,
        borderRadius: 15,
        color: constantColors.default,
        textAlign: 'center'
    },
})
