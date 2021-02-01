import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreenActivity from '../screens/SignInScreen'
import SignUpScreenActivity from '../screens/SignUpScreen'

const AuthStack= createStackNavigator();

const AuthStackScreen = () => {
    return (
      <AuthStack.Navigator initialRouteName="SignIn">
        <AuthStack.Screen
          name="SignIn"
          component={SignInScreenActivity}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUpScreenActivity}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  export default AuthStackScreen;