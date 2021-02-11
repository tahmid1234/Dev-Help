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
import {getDoubleCollectionData,simpleCollectionSet} from '../Function/FirebaseFunctions'


const NotificationScreenActivity=(props)=>{

  const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
  const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName
  
  
  
  
  const [notificatiionCount,setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const loadNotification = async () => {

    getDoubleCollectionData("Notification",uid,"reaction",setNotifications,setLoading,setNotificationCount)
   
  };
    
  useEffect(() => {
    let isMounted = true
    if(isMounted){
    loadNotification();
    simpleCollectionSet("NotificationCount",uid,0)
    }
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
             
              console.log(item.data.reaction_time+" post length")
             
              return (
                <NotificationList
                        notificatiions={item} nav={props}
                      
                      />
                     
                      
                  
                 )
          }}
          
           
             />: <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>}



      </View>
    

    )
}


export default NotificationScreenActivity