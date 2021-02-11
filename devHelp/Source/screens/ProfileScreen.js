import React, { useState, useEffect, useRef } from "react";
import {View,StyleSheet,ActivityIndicator,Text,FlatList,TouchableOpacity} from 'react-native'
import {storeDataJSON, getDataJSON } from "../Function/AsyncStorageFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Input } from "react-native-elements";
import {AuthContext} from '../provider/AuthProvider'
import FlashMessage from "react-native-flash-message";
import ScreenHeader from '../shareable/ScreenHeader'
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import PostList from '../shareable/PostList'

import * as firebase from 'firebase'
import "firebase/firestore";
import CategoryCard from '../shareable/CategoryCard'
import {getData1Collection,getSingleCollectionData} from '../Function/FirebaseFunctions'









const ProfileScreen=(props)=>{


    const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
    const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName
    const [profession,setProfession] = useState("")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    


  const loadPosts = async () => {
   
    setLoading(true)
    getData1Collection(uid,setPosts,setLoading)
    getSingleCollectionData("users",uid,setProfession,true,"profession")
  };
    
  useEffect(() => {
    let isMounted=true
    if(isMounted)
    loadPosts();
    return(()=>{
      isMounted=false
    })
  }, []);

    
    
     
        
   
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
        
           <ScreenHeader props ={props} ></ScreenHeader>
           <View style={{height:100,backgroundColor:'black',padding:10,flexDirection:"row",alignItems:"center"}}>
             <View>
              <Text style={{color:"white"}}>{displayName}</Text>
              <Text style={{color:"white",fontStyle:"italic",fontSize:10}}>{profession}</Text>

              </View>
               <View style={{height:80,width:80,borderRadius:40,backgroundColor:"white",alignItems:"center",borderColor:"#408",borderWidth:2.5,position:"absolute",left:"80%"}}>
                    <Text style={{top:"35%",color:"#208",fontWeight:"bold"}}>Dev Help </Text>
               </View>

           </View>
           
                 
            {!loading?
             <View style={{flex:1}}>
            <FlatList
            
            data={posts}
            extraData={posts}
           
            renderItem={function({ item } ){
              //console.log("Render")
              //console.log(posts)
             
             
              return (
                 
                 <PostList posts={item} nav={props} currentUser={auth.CurrentUser} nextScreen={"IndivialPost"}/>
                 
                 )
          }}
          
           
             />
             </View>
            : <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>}
            
       
        </View>
         )}
         </AuthContext.Consumer>


    );
   
   
}

const styles=StyleSheet.create({
    buttonView:{
        marginLeft:30,
        marginRight:30,
        marginVertical:15,
        
       

        
    },

    inputStyle:{
        color:"white"
        
    },
    fab: { 
      position: 'absolute', 
      width: 60, 
      height: 60, 
      alignItems: 'center', 
      justifyContent: 'center', 
      right: 20, 
      bottom: 20, 
      backgroundColor: '#fff', 
      borderRadius: 30, 
      elevation: 8 ,
      borderColor:"#34339a",
      borderWidth:2
      }, 
      fabIcon: { 
        fontSize: 40, 
        color: 'white' 
      }
}
);

export default ProfileScreen