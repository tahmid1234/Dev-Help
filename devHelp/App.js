import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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

  const loadUserCreds =() =>{

  }

  
  
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