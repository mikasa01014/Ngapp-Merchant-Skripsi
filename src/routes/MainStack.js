import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { 
    AddFood,
    Food, 
    FoodDetail, 
    OrderDetail, 
    Profile, 
    UpdateFood, 
    UpdateProfile, 
    ViewOrder, 
} from '../pages';
import { colors } from '../constant';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { Button } from '../component';


const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const OrderDetailStack = createStackNavigator();

const MenuStack = createStackNavigator();
const MenuDetailStack = createStackNavigator();
const AddMenuStack = createStackNavigator();
const UpdateMenuStack = createStackNavigator();

const ProfileStack = createStackNavigator();
const AllStack = createStackNavigator();

const AllStackScreen = () => {
    return (
        <AllStack.Navigator>
            <AllStack.Screen name="HomeAll" component={MainStack} options={{ headerShown: false }} />
        </AllStack.Navigator>
    )
}

const MainStack = () => {
    return (
        <Tab.Navigator initialRouteName="ViewOrder" activeColor="#ffffff" shifting={true}>
            <Tab.Screen name="ViewOrder" component={HomeScreenStack} options={{
                tabBarLabel: 'Orders',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon2 name="archive" color={color} size={25} />
                ),
            } } />
            <Tab.Screen name="Menu" component={MenuStackScreen} options={{
                tabBarLabel: 'Menu',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon3 name="menu-book" color={color} size={30} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
                tabBarLabel: 'Profile',
                tabBarColor: colors.default,
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={25} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default AllStackScreen

//==============================================================
// HomeStack 
const HomeScreenStack = ({ navigation }) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <HomeStack.Screen name="ViewOrder" component={ViewOrder} />
            <HomeStack.Screen name="OrderDetail" component={OrderDetailScreenStack} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    )

}

const OrderDetailScreenStack = ({ navigation }) => {
    return (
        <OrderDetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <OrderDetailStack.Screen name= "OrderDetail" component={OrderDetail} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack}/>
                )
            }}/>
        </OrderDetailStack.Navigator>
    )
}
//===============================================================
//MenuStack
const MenuStackScreen = ({ navigation }) => {
    return (
        <MenuStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <MenuStack.Screen name="Menu" component={Food} />
            <MenuStack.Screen name="MenuDetails" component={MenuDetailStackScreen} options={{ headerShown: false }}/>
            <MenuStack.Screen name="AddMenus" component={AddMenuStackScreen} options={{ headerShown: false }} />
            <MenuStack.Screen name="UpdateMenus" component={UpdateMenuStackScreen} options={{ headerShown: false }} />
        </MenuStack.Navigator> 
    )
}

const MenuDetailStackScreen = ({ navigation }) => {
    return(
        <MenuDetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <MenuDetailStack.Screen name= "MenuDetails" component={FoodDetail} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack}/>
                )
            }}/>
        </MenuDetailStack.Navigator>
    )
}

const AddMenuStackScreen = ({ navigation }) => {
    return(
        <AddMenuStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <MenuDetailStack.Screen name= "AddMenus" component={AddFood} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack}/>
                )
            }}/>
        </AddMenuStack.Navigator>
    )
}

const UpdateMenuStackScreen = ({ navigation }) => {
    return(
        <UpdateMenuStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <MenuDetailStack.Screen name= "UpdateMenus" component={UpdateFood} options={{
                headerLeft: () => (
                    <Button type='icon' name='back' onPress={() => navigation.goBack()} style={styles.buttonBack}/>
                )
            }}/>
        </UpdateMenuStack.Navigator>
    )
}


//===============================================================
//Profile
const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.default,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
            headerTitleAlign: 'center'
        }}>
            <ProfileStack.Screen name="Profile" component={Profile} />
        </ProfileStack.Navigator>
    )
}

//=======================================================================


const styles = StyleSheet.create({
    buttonNotif:{
        marginTop: 10,
        paddingRight:10.
        
    },
    buttonBack:{
        paddingLeft: 5,
    }
})
