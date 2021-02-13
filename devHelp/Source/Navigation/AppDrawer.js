import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import DataStructureScreenActivity from "../screens/DataStructureScreen"
import AlgorithmScreenActivity from "../screens/AlgorithmScreen"
import UbuntuScreenActivity from "../screens/UbuntuScreen"
import ProgrammingLanguageScreenActivity from "../screens/ProgrammingLanguageScreen"
import OopScreenAcitivity from "../screens/OopScreen"
import AndroidScreenActivity from "../screens/AndroidScreen"
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
        <AppDrawer.Screen name = "Data Structure" component={DataStructureScreenActivity}/>
        <AppDrawer.Screen name = "Algorithm" component={AlgorithmScreenActivity}/>
        <AppDrawer.Screen name = "Ubuntu" component={UbuntuScreenActivity}/>
        <AppDrawer.Screen name = "Android" component={AndroidScreenActivity}/>
        <AppDrawer.Screen name = "Oop" component={OopScreenAcitivity}/>
        <AppDrawer.Screen name = "Programming Language" component={ProgrammingLanguageScreenActivity}/>
      </AppDrawer.Navigator>
    );
  };

  export default AppDrawerScreen