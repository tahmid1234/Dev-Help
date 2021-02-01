import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreenActivity from '../screens/Home'
import IndividualPostScreen from '../screens/IndividualPost'
const HomeStack =createStackNavigator();

const HomeStackScreen=() =>{
    return(
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreenActivity}  options={{ headerShown: false }}/>
        <HomeStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
      </HomeStack.Navigator>
    )
  }

  export default HomeStackScreen;