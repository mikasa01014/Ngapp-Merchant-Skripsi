import React from 'react'
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import { colors as constantColors } from '../../../constant'
import { useTheme } from 'react-native-paper'

const Input = ({ placeholder, secureTextEntry, ...rest }) => {
    const { colors } = useTheme();

    return (
        <TextInput
            style={[styles.textInput, {
                color: colors.text
            }]}
            placeholder={placeholder}
            placeholderTextColor='#666666'
            secureTextEntry={secureTextEntry}
            {...rest}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: constantColors.default,
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 18,
        fontSize: 14,
        color: constantColors.default,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        //color: '#05375a',
    },
})
