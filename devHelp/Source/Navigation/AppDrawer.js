import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import DataStructureScreenActivity from "../screens/DataStructureScreen"
import ProfileScreenActivity from '../screens/ProfileScreen'
import HomeTabScreen from './HomeTab'

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

const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
    return (
      <AppDrawer.Navigator  initialRouteName="Home">
        <AppDrawer.Screen name = "Home" component={HomeTabScreen} />
        <AppDrawer.Screen name = "Profile" component={ProfileScreenActivity} />
        <AppDrawer.Screen name = "Data Structure" component={DataStructureScreenActivity}/>
      </AppDrawer.Navigator>
    );
  };

  export default AppDrawerScreen