import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreenActivity from '../screens/NotificationScreen'
import IndividualPostScreen from '../screens/IndividualPost'


const NotificationStack=createStackNavigator();

const NotificationStackScreen=() =>{
    return(
      <NotificationStack.Navigator initialRouteName="Notification">
        <NotificationStack.Screen name="Notification" component={NotificationScreenActivity}  options={{ headerShown: false }}/>
        <NotificationStack.Screen name="IndivialPost" component={IndividualPostScreen}  options={{ headerShown: false }}/>
      </NotificationStack.Navigator>
    )
  }

  export default NotificationStackScreen;