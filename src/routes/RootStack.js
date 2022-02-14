import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import { Login, Register, Splash, WelcomeAuth } from '../pages';
import { MainStacks } from '.';


const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeAuth" component={WelcomeAuth} options={{ headerShown: false }} />
            <Stack.Screen name="AllStack" component={MainStacks} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default RootStack

const styles = StyleSheet.create({})
