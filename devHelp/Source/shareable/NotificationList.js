import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {NotificationCard} from '../shareable/customCard'
import { FontAwesome } from '@expo/vector-icons';
import convertSecons from '../Function/SeconsToUtcDate'



const NotificationList=(props)=>{
    console.log("Notificationssss")
    const notification=props.notificatiions
    const query ={}
    const nav=props.nav
    const [iconName,setIconName]=useState("heart")
    const [statement ,setStatement]=useState("liked your post")
    const postDate=convertSecons(notification.data.created_at.seconds)
    let time="1612880477"
    query.id=notification.data.postId;
    query.data=props.notificatiions.data
    console.log(notification.data.reaction_time.seconds)
    

    

    /*const checkNotificationStatus=()=>{
        
        if(notification.data.body[0]==="c" || notification.data.body[0]==="r" ){
        setIconName("comments")
        setStatement("commented on your post")
        }
        
     

    }*/
    
    
    


    return(
        <TouchableOpacity  onPress={()=>{
            query.data["created_at"]=postDate
             query.data["reaction_time"]=convertSecons(notification.data.reaction_time.seconds)
            nav.navigation.navigate("Post And Comment",  {query,postDate} );
            console.log(notification.data.reaction_time)
            console.log(query.id)
        }}>
        <View>
            
           
            <NotificationCard>
            
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.commenter}>{notification.data.reactorName} </Text>
                    <Text style={{fontSize:15}}>{notification.data.reactorStatus} </Text>
                </View>
                <View style={{flexDirection:"row",marginVertical:10}}>
                    <MaterialIcons name="question-answer" size={18} color="#208" />
                    <Text style={{fontSize:10}}>{convertSecons(notification.data.reaction_time.seconds)} </Text>
                </View>
            </NotificationCard>
        </View>
        </TouchableOpacity>
       
    )
}

const styles= StyleSheet.create({

    stateMentStyle:{
        fontSize:15,
        marginTop:20,
        left:"50%",
        fontFamily:'serif',
        color:"#c08401",
        position:"absolute"
       

    },
    iconStyle:{
        
        width:"20%",
        position:"absolute",


        
    },
    commenter:{
        fontSize:17.5,
       
        
        fontFamily:'serif',
        color:"#208" ,
       
    }
  

    
    

})
export default NotificationList
