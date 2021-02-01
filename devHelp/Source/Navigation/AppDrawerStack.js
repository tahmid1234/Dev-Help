import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import AppDrawer from './AppDrawer'
import QueryPostScreenActivity from '../screens/QueryPostScreen'

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
      </DrawerStack.Navigator>
    );
  };

  export default DrawerStackNavigation;