import React from 'react'
import {Text,View} from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {  AntDesign ,Ionicons ,Entypo } from "@expo/vector-icons";
import HomeStackScreen from './HomeStackNavigation'
import NotificationStackScreen from './NotificationStackNavigation'

const unseenNotification=()=>{
    return "88"
  }

const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
    return (
    
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
  
    );
  };
  
  export default HomeTabScreen
