import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../../../constant';
import ButtonIcon from './ButtonIcon';
import ButtonLinearGradient from './LinearGradientButton';

const Button = ({ title, onPress, type, name, style }) => {
    if(type === 'icon'){
      return <ButtonIcon name={name} onPress={onPress} style={style}/>
    };

    if(type === 'linear')
    {
        return <ButtonLinearGradient name={name} title={title} onPress={onPress} />
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.signIn, {
                    borderColor: colors.default,
                    borderWidth: 1,
                    marginTop: 15
                }]}
                onPress={onPress}
            >
                <Text style={[styles.textSign, {
                    color: colors.default
                }]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Button

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: colors.default,
        borderRadius: 15,
        paddingVertical: 12,
    },
    loginText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center'
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
});
