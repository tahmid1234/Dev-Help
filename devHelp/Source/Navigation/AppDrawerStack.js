import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import AppDrawer from './AppDrawer'
import QueryPostScreenActivity from '../screens/QueryPostScreen'
import IndividualPostScreen from '../screens/IndividualPost'
import CommentPostActivity from '../screens/CommnetPostScreen'

const DrawerStack= createStackNavigator();

const DrawerStackNavigation = () => {
    return (
      <DrawerStack.Navigator initialRouteName="AppStart">
        <DrawerStack.Screen
          name="AppStart"
          component={AppDrawer}
          options={{ headerShown: false }}
          
        />
        <DrawerStack.Screen
          name="QueryPost"
          component={QueryPostScreenActivity}
          options={{ headerShown: false }}
          
        />
        <DrawerStack.Screen
          name="Post And Comment"
          component={IndividualPostScreen}
          options={{ headerShown: false }}
          
        />

        <DrawerStack.Screen
          name="Post the comment"
          component={CommentPostActivity}
          options={{ headerShown: false }}
          
        />



      </DrawerStack.Navigator>
    );
  };

  export default DrawerStackNavigation;