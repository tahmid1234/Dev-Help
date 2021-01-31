import React from 'react';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text,ScrollView,View} from 'react-native'
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
import DataStructureScreenActivity from "./Source/screens/DataStructureScreen"

const firebaseConfig = {
  apiKey: "AIzaSyBvDb9x-BbMiHxsg_YendqGfoi9P6CXfLY",
  authDomain: "help-83b6c.firebaseapp.com",
  //databaseURL:"https://help-83b6c-default-rtdb.firebaseio.com",
  projectId: "help-83b6c",
  storageBucket: "help-83b6c.appspot.com",
  messagingSenderId: "519488680139",
  appId: "1:519488680139:web:588fba62f8bb40a740eb4e"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const unseenNotification=()=>{
  return "88"
}
const AuthStack= createStackNavigator();
const HomeStack =createStackNavigator();
const NotificationStack=createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator theme={MyTheme} initialRouteName="Home">
      <AppDrawer.Screen name = "Home" component={HomeTabScreen} />
      <AppDrawer.Screen name = "Profile" component={ProfileScreenActivity} />
      <AppDrawer.Screen name = "Data Structure" component={DataStructureScreenActivity}/>
    </AppDrawer.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <AuthContext.Consumer>
        {(auth) => (
  
    <HomeTab.Navigator initialRouteName="Home">
       
       
      <HomeTab.Screen
        name="Home"
        component={HomeStackScreen}
        
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <View style={{flexDirection:"row"}}>

              
              <Ionicons
                text="5"
                Text="4"
                alert="5"
                background="#ff0"
                
                name="ios-notifications-outline"
                size={24}
                color="white"
             />
             
             <View >
             <Text style={{color:"white",height:16,width:16,top:0,fontSize:10,borderRadius:8,backgroundColor:"red"}}>{unseenNotification()}</Text>
             </View>
              
              </View>
            ),
        }}
      />
     
    </HomeTab.Navigator>

     )}
     </AuthContext.Consumer>
  );
};

const NotificationStackScreen=() =>{
  return(
    <NotificationStack.Navigator initialRouteName="Notification">
      <NotificationStack.Screen name="Notification" component={NotificationScreenActivity}  options={{ headerShown: false }}/>
      <NotificationStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
    </NotificationStack.Navigator>
  )
}

const HomeStackScreen=() =>{
  return(
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreenActivity}  options={{ headerShown: false }}/>
      <HomeStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  )
}

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