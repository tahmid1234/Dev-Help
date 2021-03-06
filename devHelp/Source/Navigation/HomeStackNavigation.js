import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreenActivity from '../screens/Home'
import IndividualPostScreen from '../screens/IndividualPost'
import CommentPostActivity from '../screens/CommnetPostScreen'
import OtherUserProfileScreen from '../screens/OtherUserProfileScreen'

const HomeStack =createStackNavigator();

const HomeStackScreen=() =>{
    return(
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreenActivity}  options={{ headerShown: false }}/>
        <HomeStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
        <HomeStack.Screen name="Post the comment" component={CommentPostActivity}  options={{ headerShown: false }}/>
        <HomeStack.Screen name="Author User Profile" component={OtherUserProfileScreen}  options={{ headerShown: false }}/>
      </HomeStack.Navigator>
    )
  }

  export default HomeStackScreen;