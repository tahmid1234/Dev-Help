import React,{useState,useEffect} from 'react'
import {Text,View} from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {  AntDesign ,Ionicons ,Entypo,MaterialIcons ,MaterialCommunityIcons} from "@expo/vector-icons";
import HomeStackScreen from './HomeStackNavigation'
import NotificationStackScreen from './NotificationStackNavigation'
import {AuthContext} from '../provider/AuthProvider'
import {getSingleCollectionData} from  '../Function/FirebaseFunctions'
import ProfileScreen from '../screens/ProfileScreen'



const HomeTab = createMaterialBottomTabNavigator();

const HomeTabScreen = () => {
  const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
  const [count,setCount] = useState(0)
  const unseenNotification=()=>{
      console.log(uid)
      console.log("zzzzzzzzzzzzz")
      getSingleCollectionData("NotificationCount",uid,setCount,true)
      
    }

    useEffect (()=>{
      let isMounted = true
      if(isMounted){
      unseenNotification()
      }
      return ( ()=>{isMounted = false})
    },[])
    
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
          name="Profile"
          component={ProfileScreen}
          
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="account-circle" size={26} color="white" />
              ) : (
                <MaterialCommunityIcons name="account-circle-outline" size={22} color="white" />
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
                  
                  background="#ff0"
                  
                  name="ios-notifications-outline"
                  size={24}
                  color="white"
               />
               
               <View style={{color:"white",height:"60%",width:"60%",top:0,fontSize:10,borderRadius:"30%",backgroundColor:"red",alignItems:"center"}}>
               <Text style={{color:"white",fontSize:10}}>{count}</Text>
               </View>
                
                </View>
              ),
          }}
        />
       
      </HomeTab.Navigator>
  
    );
  };
  
  export default HomeTabScreen
