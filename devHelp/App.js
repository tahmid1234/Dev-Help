import React from 'react';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text,View} from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {  AntDesign ,Ionicons ,Entypo } from "@expo/vector-icons";
import ScrolableTabView from 'react-native-scrollable-tab-view'
import SignInScreenActivity from './Source/screens/SignInScreen'
import SignUpScreenActivity from './Source/screens/SignUpScreen'
import HomeScreenActivity from './Source/screens/Home'
import ProfileScreenActivity from './Source/screens/ProfileScreen'
import NotificationScreenActivity from './Source/screens/NotificationScreen'
import IndividualPostScreen from './Source/screens/IndividualPost'
import { AuthContext, AuthProvider } from "./Source/provider/AuthProvider";
import * as firebase from 'firebase' 
import AppDrawerScreen from './Source/Navigation/AppDrawerStack'
import AuthStackScreen from './Source/Navigation/AuthStackNavigation'

const firebaseConfig = {
  apiKey: "AIzaSyBvDb9x-BbMiHxsg_YendqGfoi9P6CXfLY",
  authDomain: "help-83b6c.firebaseapp.com",
  //databaseURL:"https://help-83b6c-default-rtdb.firebaseio.com",
  projectId: "help-83b6c",
  storageBucket: "help-83b6c.appspot.com",
  messagingSenderId: "519488680139",
  appId: "1:519488680139:web:588fba62f8bb40a740eb4e"
};

const MyTheme ={
  dark:true,
  colors:{
    primary: "#ffffff",
    background: "#fff",
    card: "#000",
    text: "#ffffff",
    border: "#000028",
    notification:"#9933FF",
  
    
  },
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}



export default function App() {

  
  
  return (

    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer theme={MyTheme}>
             {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
    
    
   
  );
}