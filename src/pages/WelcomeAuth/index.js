import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions, 
    StatusBar, 
} from 'react-native'
import { IlustrasiWelcome } from '../../asset'
import { colors, colors as constantColors } from '../../constant/colors'
import { Button } from '../../component'
import * as Animatable from 'react-native-animatable'

const WelcomeAuth = ({navigation}) => {
    var welcomeIlustration = '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'

    return (
        <View style={styles.container}>
             <StatusBar 
                barStyle= "light-content" 
                backgroundColor={constantColors.default} 
            />
            <View style={styles.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duration={1500}
                    source={{uri: `data:image/png;base64,${welcomeIlustration}`}}
                    style={styles.logo}
                    resizeMode='stretch' />
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <View style={styles.logo2Content}>
                    <Text style={styles.textLogo}>NGAPP Merchant</Text>
                </View>
                <Text style={styles.title}>Stay Connected Everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <Button type='linear'
                        title='Get Started'
                        name='started'
                        onPress={() => navigation.navigate('Login')}
                    />
                    {/* <TouchableOpacity onPress={onValidateUser}>
                        <LinearGradient
                            style={styles.started}
                            colors={[constantColors.default, '#be03fd']}>
                            <Text style={styles.textStarted}>Get Started</Text>
                            <Icon name="navigate-next" color='#fff' size={20} />
                        </LinearGradient>
                    </TouchableOpacity> */}
                </View>
            </Animatable.View>
        </View>
    )
}

export default WelcomeAuth

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantColors.default,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 15
    },
    textLogo: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.default,
        fontWeight: 'bold'
    },
    logo2Content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    started: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textStarted: {
        color: 'white',
        fontWeight: 'bold'
    },
})
