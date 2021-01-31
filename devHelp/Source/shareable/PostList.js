import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostCard} from '../shareable/customCard'
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction";
import { Zocial } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {AuthContext} from '../provider/AuthProvider';
import * as firebase from 'firebase'
import "firebase/firestore";

const PostList =(props)=>{
   
    const posts=props.posts
    const nav=props.nav
    const currUser=props.currentUser
  

    
    const [iconName,setIconName]=useState("hearto")
   
    const [likeCount,setLikeCount]=useState(posts.data.likes)
    const [authorPostReactions, setAuthorPostReactions] = useState([]);
    

    let dateObj=new Date(posts.data.created_at.seconds*1000)
  
    dateObj=""+dateObj.toUTCString()

    
    
    let postDate=dateObj.substr(0,dateObj.length-13)
   
  
    
    return(
        
       
       <PostCard>
           
           <Zocial name="statusnet" size={24} color="#fff"  style={styles.iconStyle} />
           <Text style={styles.authorNameStyle}>{posts.data.author}</Text>
           <Text style={styles.dateStyle}>{postDate}</Text>
           <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
          
           <FontAwesome name="comment-o" size={27} color="#fff"  style={styles.commentStyle}
           onPress={function(){
            nav.navigation.navigate("IndivialPost",  {posts,currUser,postDate} );
           
           
           }}/>

          
           <AntDesign name={iconName} size={24} color="#fff"  style={styles.likeStyle} 
           onPress ={function(){
            setIconName("heart")
           
           firebase.firestore().collection("posts").doc(posts.id).collection("likers").doc(currUser.uid).set({
               liker:currUser.displayName
           })
           firebase.firestore().collection("posts").doc(posts.id).update({
               likes:likeCount+1
           })
           firebase.firestore().collection("notifications").doc(posts.data.userId).collection("notification_details").add({
            post:posts,
            name:currUser.displayName,
            body:"liked your post"
        })
            let a=likeCount+1
            
            setLikeCount(a)
            
           
            
            
           }}/>
          
        <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
        <Text style={styles.commentTextStyle}>{posts.data.comments} Comments</Text>
          
   
           

       </PostCard>
  


);
  
    
}

const styles=StyleSheet.create({
    iconStyle:{
        
        position:'absolute',
        right:10,
        top:10,
       
        
        
       

        
    },
    commentStyle:{
        position:'absolute',
        bottom:1,
        right:10,
        marginBottom:0,
        
    },
    authorNameStyle:{
        fontFamily:'serif',
        fontSize:18,
        color:"#fff",
        marginBottom:5,
    },
    dateStyle:{
        
        marginBottom:5,
        color:"#fff",
        fontSize:10,
        fontStyle:"italic"
    },
    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:10,
        color:"#fff",
        fontSize:15,
        
    },
    likeStyle:{
        marginBottom:3,
        bottom:0,
        width:36,
        left:0
    },
   
    likeTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:60,
        left:30,
        position:"absolute",
        bottom:0
    },
    commentTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:90,
        right:36,
        position:"absolute",
        bottom:0
    },

  
}
);

export default PostList