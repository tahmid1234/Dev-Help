import React from 'react'
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
            
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            
          
           
            rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function  () {
                  firebase.auth().signOut()
                 .then(()=>{
                   removeData("devHelper")
                   global.userInfo("")
                 
                  auth.setCurrentUser({});
                  auth.setIsLoggedIn(false);
                  
                 
                 })
                 .catch((error)=>{
                   alert(error)
                 })
                },
              }}
    
   
/>
    )}
 </AuthContext.Consumer>

    )
}


export default ScreenHeader