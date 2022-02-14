import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import {
  NavigationContainer
} from '@react-navigation/native';


import Icon1 from 'react-native-vector-icons/FontAwesome';
import { MainStacks, RootStacks } from './routes';
import { AuthContext } from './component'
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const initialLoginState = {
    isLodaing: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (foundUser) => {
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].id;
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    }
  }), [])

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, [])


  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    // <Provider store={ store }>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken == null ?
            <RootStacks />
            :
            <MainStacks />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    // </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
