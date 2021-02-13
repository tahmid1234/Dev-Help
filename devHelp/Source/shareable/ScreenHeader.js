import React from 'react'
import {Alert} from 'react-native'
import {Header} from "react-native-elements";
import {AuthContext} from '../provider/AuthProvider';
import {removeData} from '../Function/AsyncStorageFunction'
import * as  firebase from 'firebase';


const ScreenHeader=({props})=>{

 
    return(
      <AuthContext.Consumer>
      {(auth) => (   
        <Header
        backgroundColor="#000"
        
        leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: function () {
              props.navigation.toggleDrawer();
              console.log(props)
              console.log("okay")
            },
          }}
            
            centerComponent={{ text: "Dev Help", style: { color: "#fff" } }}
            
          
           
            rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: () =>
                Alert.alert(
                    "Log Out",
                    "Are you sure you want to logout?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: function  () {
                        firebase.auth().signOut()
                       .then(async()=>{
                         await removeData("devHelper")
                         global.userInfo=""
                       
                        auth.setCurrentUser({});
                        auth.setIsLoggedIn(false);
                        auth.setLogInStatus(false)
                        console.log(auth.IsLoggedIn)
                        
                        
                       
                       })
                       .catch((error)=>{
                         alert(error)
                       })
                      } }
                    ],
                    { cancelable: false }
                  ),
              }}
    
   
/>
    )}
 </AuthContext.Consumer>

    )
}


export default ScreenHeader