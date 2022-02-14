import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native'
import { colors as constantColors } from '../../constant/colors'
import * as Animatable from 'react-native-animatable'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Ionicons'
import { Button } from '../../component'
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Register = ({ navigation }) => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let numreg = /^[0-9]+$/;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameRestaurant, setNameRestaurant] = useState('')
    const [phone_number, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState(null)
    const [noRek, setNoRek] = useState('')
    const [bankUserName, setBankUserName] = useState('')
    const [bankPin, setBankPin] = useState('')
    const [check_bankUsernameInputChange, setCheck_bankUsernameInputChange] = useState(false)
    const [check_bankPinInputChange, setCheck_bankPinInputChange] = useState(false)
    const [check_textInputChange, setCheck_textInputChange] = useState(false)
    const [check_nameInputChange, setCheck_nameInputChange] = useState(false)
    const [check_phoneInputChange, setCheck_phoneInputChange] = useState(false)
    const [check_addressInputChange, setCheck_addressInputChange] = useState(false)
    const [check_noRekInputChange, setCheck_noRekInputChange] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [isValidBankUsername, setIsValidBankUser] = useState(true)
    const [isValidBankPin, setIsValidBankPin] = useState(true)
    const [isValidUser, setIsValidUser] = useState(true)
    const [isValidPhone, setIsValidPhone] = useState(true)
    const [isValidName, setIsValidName] = useState(true)
    const [isValidAddress, setIsValidAddress] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isValidNoRek, setIsValidNoRek] = useState(true)

    const [token, setToken] = useState('')
    const [nameX, setNameX] = useState('')
    const [emailX, setEmailX] = useState('')

    useEffect(async () => {
        try {
            var value = await AsyncStorage.getItem('token')

            if (value != null) {
                console.log(value)
                navigation.replace('AllStack')
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const choosePhotoFromLibarary = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
            compressImageQuality: 0.2
        }).then((images) => {
            console.log(images);
            setImage(images.data)
            console.log(image)

        }).catch(e => {

        })
    }


    const registerHandle = async (email, password, name, phone_number, address, photo, noRek, bankUserName, bankPin) => {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${global.token}`

        await axios.post('https://ngapp-backend.herokuapp.com/register/merchant', {
            email: email,
            password: password,
            name: name,
            phone_number: phone_number,
            address: address,
            image: photo,
            account_number: noRek,
            username: bankUserName,
            pin: bankPin
        }).then((res) => {
            console.log(res.data)
            let user = Object.assign({}, res.data)
            console.log(user)
            
            if(email.length == 0) {
                Alert.alert('Wrong Input!', 'email cannot be empty', [
                  {text: 'Okay'}
                ]);
            } else if(password.length == 0) {
                Alert.alert('Wrong Input!', 'password cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(name.length == 0) {
                Alert.alert('Wrong Input!', 'Resto name cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(phone_number.length == 0) {
                Alert.alert('Wrong Input!', 'Phone number cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(address.length == 0) {
                Alert.alert('Wrong Input!', 'Address cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(noRek.length == 0) {
                Alert.alert('Wrong Input!', 'Account Bank Number cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(bankUserName.length == 0) {
                Alert.alert('Wrong Input!', 'Phone number cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if(bankPin.length == 0) {
                Alert.alert('Wrong Input!', 'Phone number cannot be empty', [
                    {text: 'Okay'}
                ]);
            } else if (user.error == 'Email already exists') {
                Alert.alert('Error', 'User Already Exists')
            } else {
                AsyncStorage.setItem('token', user.token)


                navigation.replace('AllStack')

                // setNameX(user.user.merchant.name)
                // setEmailX(user.user.email)
                // setToken(user.token)
                // setMessage(user.message)

            }
        }).catch(e => {

        })
    }



    const textInputChange = (val) => {
        if (regEmail.test(val) === true) {
            setEmail(val)
            setCheck_textInputChange(true)
            setIsValidUser(true)
        } else {
            setEmail(val)
            setCheck_textInputChange(false)
            setIsValidUser(false)
        }
    }

    const nameInputChange = (val) => {
        if (val.trim().length > 0) {
            setNameRestaurant(val)
            setCheck_nameInputChange(true)
            setIsValidName(true)
        } else {
            setNameRestaurant(val)
            setCheck_nameInputChange(false)
            setIsValidName(false)
        }
    }

    const phoneInputChange = (val) => {
        if (val.trim().length >= 10 && numreg.test(val) === true) {
            setPhone(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_phoneInputChange(true)
            setIsValidPhone(true)
        } else {
            setPhone(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_phoneInputChange(false)
            setIsValidPhone(false)
        }

    }

    const bankUsernameInputChange = (val) => {
        if (val.trim().length > 0) {
            setBankUserName(val)
            setCheck_bankUsernameInputChange(true)
            setIsValidBankUser(true)
        } else {
            setBankUserName(val)
            setCheck_bankUsernameInputChange(false)
            setIsValidBankUser(false)
        }
    }

    const bankPinInputChange = (val) => {
        if (val.trim().length <= 10 && numreg.test(val) === true) {
            setBankPin(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_bankPinInputChange(true)
            setIsValidBankPin(true)
        } else {
            setBankPin(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_bankPinInputChange(false)
            setIsValidBankPin(false)
        }

    }

    const noRekInputChange = (val) => {
        if (val.trim().length <= 15 && numreg.test(val) === true) {
            setNoRek(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_noRekInputChange(true)
            setIsValidNoRek(true)
        } else {
            setNoRek(val.replace(/[-+ #*;,.<>\{\}\[\]\\\/]/gi, ''))
            setCheck_noRekInputChange(false)
            setIsValidNoRek(false)
        }

    }

    const addressInputChange = (val) => {
        if (val.trim().length > 10) {
            setAddress(val)
            setCheck_addressInputChange(true)
            setIsValidAddress(true)
        } else {
            setAddress(val)
            setCheck_addressInputChange(false)
            setIsValidAddress(false)
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setPassword(val)
            setIsValidPassword(true)
        } else {
            setPassword(val)
            setIsValidPassword(false)
        }
    }

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const handleValidUser = (val) => {
        if (regEmail.test(val) === true) {
            setIsValidUser(true)
        } else {
            setIsValidUser(false)
        }
    }

    const handleValidName = (val) => {
        if (val.trim().length > 0) {
            setIsValidName(true)
        } else {
            setIsValidName(false)
        }
    }

    const handleValidBankUser = (val) => {
        if (val.trim().length > 0) {
            setIsValidBankUser(true)
        } else {
            setIsValidBankUser(false)
        }
    }

    const handleValidBankPin = (val) => {
        if (val.trim().length <= 10 && numreg.test(val) === true) {
            setIsValidBankPin(true)
        } else {
            setIsValidBankPin(false)
        }
    }

    const handleValidNoRek = (val) => {
        if (val.trim().length <= 15 && numreg.test(val) === true) {
            setIsValidNoRek(true)
        } else {
            setIsValidNoRek(false)
        }
    }
    
    const handleValidPhone = (val) => {
        if (val.trim().length >= 10 && numreg.test(val) === true) {
            setIsValidPhone(true)
        } else {
            setIsValidPhone(false)
        }
    }

    const handleValidAddress = (val) => {
        if (val.trim().length > 10) {
            setIsValidAddress(true)
        } else {
            setIsValidAddress(false)
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Merchant!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <Icon3
                            name="email"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Email'
                            value={email}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {check_textInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidUser ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Email Format is wrong!</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Restaurant Name</Text>
                    <View style={styles.action}>
                        <Icon1
                            name="user-o"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Restaurant Name'
                            value={nameRestaurant}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => nameInputChange(val)}
                            onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
                        />
                        {check_nameInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
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
                            <Text style={styles.errorMsg}>Name can't be empty</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Restaurant Address</Text>
                    <View style={styles.action}>
                        <Icon1
                            name="address-book-o"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Restaurant Address'
                            value={address}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => addressInputChange(val)}
                            onEndEditing={(e) => handleValidAddress(e.nativeEvent.text)}
                        />
                        {check_addressInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidAddress ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Address can't be empty</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Phone</Text>
                    <View style={styles.action}>
                        <Icon2
                            name="phone"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Phone'
                            value={phone_number}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='phone-pad'
                            onChangeText={(val) => phoneInputChange(val)}
                            onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
                        />
                        {check_phoneInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidPhone ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Phone must be numeric</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Account Bank Number</Text>
                    <View style={styles.action}>
                        <Icon3
                            name="bank-outline"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Rekening Number'
                            value={noRek}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='phone-pad'
                            onChangeText={(val) => noRekInputChange(val)}
                            onEndEditing={(e) => handleValidNoRek(e.nativeEvent.text)}
                        />
                        {check_noRekInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidNoRek ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>No. Rekening must be numeric and cannot more than 15</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Bank Account Username</Text>
                    <View style={styles.action}>
                        <Icon2
                            name="user"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Bank Username'
                            value={bankUserName}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='default'
                            onChangeText={(val) => bankUsernameInputChange(val)}
                            onEndEditing={(e) => handleValidBankUser(e.nativeEvent.text)}
                        />
                        {check_bankUsernameInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidBankUsername ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Bank Username can't be empty</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Bank Account Pin</Text>
                    <View style={styles.action}>
                        <Icon4
                            name="keypad-outline"
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Bank Pin'
                            value={bankPin}
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            onChangeText={(val) => bankPinInputChange(val)}
                            onEndEditing={(e) => handleValidBankPin(e.nativeEvent.text)}
                        />
                        {check_bankPinInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Icon2
                                    name="check-circle"
                                    color='green'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            </Animatable.View>
                            :
                            null
                        }
                    </View>
                    {isValidBankPin ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Bank Pin must be numeric and more than 10</Text>
                        </Animatable.View>
                    }

                    <Text style={[styles.text_footer, {
                        marginTop: 10
                    }]}>Password</Text>
                    <View style={styles.action}>
                        <Icon2
                            name='lock'
                            color='#333333'
                            size={25}
                            style={{ paddingTop: 10 }}
                        />
                        <TextInput
                            placeholder='Your Password'
                            placeholderTextColor='#666666'
                            style={styles.textInput}
                            value={password}
                            autoCapitalize='none'
                            keyboardType='default'
                            secureTextEntry={secureTextEntry ? true : false}
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity onPress={updateSecureTextEntry}>
                            {secureTextEntry ?
                                <Icon2
                                    name="eye-off"
                                    color='grey'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                                :
                                <Icon2
                                    name="eye"
                                    color='grey'
                                    size={25}
                                    style={{ paddingTop: 5 }}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {isValidPassword ?
                        null
                        :
                        <Animatable.View animation="fadeInLeft" duration={400}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long</Text>
                        </Animatable.View>
                    }

                    <View style={styles.action_image}>
                        <TouchableOpacity style={[styles.imgPicker, {
                            borderColor: constantColors.default,
                            borderWidth: 1,
                            marginTop: 15
                        }]} onPress={() => choosePhotoFromLibarary()}>
                            <Icon2 name='camera' size={20} color={constantColors.default} />
                            <Text style={[styles.textSign, {
                                color: constantColors.default
                            }]}>
                                Upload Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/*                     
                    <Text>{nameX}</Text>
                    <Text>{emailX}</Text>
                    <Text>{token}</Text> */}
                    {/* <Text>{images}</Text> */}


                    <View style={styles.button}>
                        <Button type='linear'
                            title='Register'
                            name='login'
                            onPress={() => { registerHandle(email, password, nameRestaurant, phone_number, address, image, noRek, bankUserName, bankPin) }}
                        />
                        <Button title='Login'
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                </Animatable.View>
            </View>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantColors.default
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    action_image: {
        flexDirection: 'row-reverse',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
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
    },
    button: {
        alignItems: 'center',
        marginTop: 50
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
    },
    imgPicker: {
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
