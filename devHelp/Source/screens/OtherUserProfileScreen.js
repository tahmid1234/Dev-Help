import React, { useState, useEffect, useRef } from "react";
import {View,StyleSheet,ActivityIndicator,Text,FlatList} from 'react-native'
import {AuthContext} from '../provider/AuthProvider'
import ScreenHeader from '../shareable/ScreenHeader'
import PostList from '../shareable/PostList'
import * as firebase from 'firebase'
import "firebase/firestore";
import {getData1Collection,getSingleCollectionAllData} from '../Function/FirebaseFunctions'









const OtherUserProfileScreen=(props)=>{


    const uid=props.route.params.uid
    const displayName=global.userInfo.displayName
    const [userInfo,setUserInfo] = useState("")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    


  const loadPosts = async () => {
   
    setLoading(true)
    console.log(uid)
    getData1Collection(uid,setPosts,setLoading)
    getSingleCollectionAllData("users",uid,setUserInfo,true)
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
           <View style={{height:"13%",backgroundColor:'black',padding:10,flexDirection:"row",alignItems:"center"}}>
             <View>
              <Text style={{color:"white"}}>{userInfo.name}</Text>
              <Text style={{color:"white",fontStyle:"italic",fontSize:10}}>{userInfo.profession}</Text>

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

export default OtherUserProfileScreen