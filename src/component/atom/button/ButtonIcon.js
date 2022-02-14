import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const ButtonIcon = ({...rest}) => {
    return (
        <TouchableOpacity {...rest}>
            {rest.name === 'back' && <Icon name="ios-chevron-back-circle-outline" size={35} color='white' />}    
            {rest.name === 'drawer' && <Icon name="ios-menu" size={35} color='white'/>}
            {rest.name === 'notif' && <Icon name="ios-notifications" size={25} color='white'/>}
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({})
