import React, { useState, useEffect } from 'react'
import ScreenHeader from '../shareable/ScreenHeader'
import {Text,Button,View,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction";
import NotificationList from '../shareable/NotificationList'
import {AuthContext} from '../provider/AuthProvider'
import * as firebase from 'firebase'
import "firebase/firestore";
import convertSecons from '../Function/SeconsToUtcDate'

const NotificationScreenActivity=(props)=>{
  console.log("halum halum")
  const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
  const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName
  console.log("Dispaly")
  const currUser={uid:{uid},displayName:{displayName}}
  
 
  const [notifications, setNotifications] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const loadNotification = async () => {
    setLoading(true)
    firebase
      .firestore()
      .collection("notifications")
      .doc(uid)
      .collection("notification_details")

      .onSnapshot((querySnapshot) => {
        let temp = [];
        console.log("Dhukse")
        querySnapshot.forEach((doc) => {
          temp.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNotifications(temp);
        console.log("Tempoo")
        console.log(temp)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
    
  };
    
  useEffect(() => {
    console.log(uid)
    console.log("hu")
    loadNotification();
  }, []);
  

    return(


       
        <View style={{ flex: 1}}>
        <View style={{marginBottom:20}}>
        <ScreenHeader props ={props} ></ScreenHeader>
        </View>
        {!loading?
            <FlatList          
            data={notifications}
            extraData={notifications}           
            renderItem={function({ item } ){
             
              console.log(notifications.length+" post length")
             
              return (
                <TouchableOpacity
                onPress={function(){
                  console.log("pressed")
                 
                  let posts=item.data.post
                  let date=convertSecons(posts.data.created_at.seconds)
                  
                  props.navigation.navigate("IndivialPost",  {posts,currUser,date} );
                }}>
                <NotificationList
                        notificatiions={item} nav={props}
                      
                      />
                      </TouchableOpacity>
                      
                  
                 )
          }}
          
           
             />: <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>}



      </View>
    

    )
}


export default NotificationScreenActivity