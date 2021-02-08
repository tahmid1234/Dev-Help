import React , { useState}  from 'react'
import {Text,StyleSheet,TouchableOpacity} from 'react-native'
import {PostCard} from '../shareable/customCard'
import { Zocial } from '@expo/vector-icons';
import { FontAwesome ,Entypo,EvilIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase'
import "firebase/firestore";

const PostList =(props)=>{
   
    const query=props.posts
    const nav=props.nav
    const currUser=props.currentUser
    const nextScreen=props.nextScreen
      
    const [iconName,setIconName]=useState("hearto")
    const [likeCount,setLikeCount]=useState(query.data.likes)
       
    let dateObj=new Date(query.data.created_at.seconds*1000)
  
    dateObj=""+dateObj.toUTCString()

    console.log(likeCount)
    
    let postDate=dateObj.substr(0,dateObj.length-13)
   
  
    
    return(
        
        <TouchableOpacity onPress={function(){
            nav.navigation.navigate(nextScreen,  {query,currUser,postDate} );
           }}>
       <PostCard>
           
           <Zocial name="statusnet" size={24} color="#fff"  style={styles.iconStyle} />
           <Text style={styles.authorNameStyle}>{query.data.title}</Text>
           <Text style={styles.dateStyle}>{postDate}</Text>
           <Text numberOfLines={2}  style={styles.postBodyStyle}>{query.data.body}</Text>
          
           <FontAwesome name="comment-o" size={27} color="#fff"  style={styles.commentStyle}
           />


           <AntDesign name="like1" size={20} color="#fff"  style={styles.likeStyle} 
           onPress ={function(){
            setIconName("heart")
           
           firebase.firestore().collection("query").doc(query.id).collection("likers").doc(currUser.uid).set({
               liker:currUser.displayName
           })
           firebase.firestore().collection("query").doc(query.id).update({
               likes:likeCount+1
           })
           firebase.firestore().collection("notifications").doc(query.data.userId).collection("notification_details").add({
            post:query,
            name:currUser.displayName,
            body:"liked your post"
        })
            let a=likeCount+1
            
            setLikeCount(a)
            
           
            
            
           }}/>
          
        <Text style={styles.likeTextStyle} >{query.data.likes} Likes</Text>
        <Text style={styles.commentTextStyle}>{query.data.comments} Answers</Text>
          
   
           
        
       </PostCard>
       </TouchableOpacity>
  


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
        bottom:6.8,
        right:10,
        marginBottom:0,
        
    },
    authorNameStyle:{
        fontFamily:'serif',
        fontSize:18,
        color:"#fff",
        marginBottom:5,
        paddingRight:20
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
        left:0,
        borderColor:"#108",
        
    },
   
    likeTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:60,
        left:31,
        position:"absolute",
        bottom:6.8
    },
    commentTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:90,
        right:21,
        position:"absolute",
        bottom:6.8
    },

  
}
);

export default PostList