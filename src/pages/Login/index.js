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
import { Button, AuthContext } from '../../component'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


const Login = ({ navigation }) => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check_textInputChange, setCheck_textInputChange] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [isValidUser, setIsValidUser] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [emailX, setEmailX] = useState ('')
    const [message, setMessage] = useState ('')
    const [token, setToken] = useState ('')

    const { signIn } = React.useContext(AuthContext)


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

    useEffect(async() => {
        try {
            var value = await AsyncStorage.getItem('token')

            if (value != null) {
                console.log(value)
                navigation.replace('AllStack')
                
                
                
            }
        }  catch (error) {
            console.log('error')
        }
    }, [])


    const loginHandle = async (email, password) => {

        await axios.post('https://ngapp-backend.herokuapp.com/login/merchant', {
            email: email,
            password: password
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
            } else if(user.message == 'email or password incorrect') {
                Alert.alert('Error', 'Wrong Email or Password')
            } else {
                AsyncStorage.setItem('token', user.token)
                
                
                navigation.replace('AllStack')

                //navigation.navigate('AllStack')
                // navigation.navigate('AllStack', {
                //     user : res.data
                // })
                // setName(user.user.merchant.name)
                // setEmailX(user.user.email)
                // setToken(user.token)
                // setMessage(user.message)

            }
        }).catch(e => {

        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome Merchant!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <Icon1
                        name="user-o"
                        color='#333333'
                        size={25}
                        style={{ paddingTop: 5 }}
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
                    marginTop: 30
                }]}>Password</Text>
                <View style={styles.action}>
                    <Icon2
                        name='lock'
                        color='#333333'
                        size={25}
                        style={{ paddingTop: 5 }}
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
                {/* <Text>{emailX}</Text>
                <Text>{name}</Text>
                <Text>{message}</Text>
                <Text>{token}</Text> */}

                <View style={styles.button}>
                    <Button type='linear'
                        title='Login'
                        name='login'
                        onPress={() => { loginHandle(email, password)}}
                    />
                    <Button title='Register'
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </Animatable.View>
        </View>
    )
}

export default Login

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
    }
})
