import React , { useState}  from 'react'
import {Text,StyleSheet,TouchableOpacity} from 'react-native'
import {PostCard} from '../shareable/customCard'
import { Zocial } from '@expo/vector-icons';
import { FontAwesome ,Entypo,EvilIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import * as firebase from 'firebase'
import "firebase/firestore";
import { View } from 'react-native';

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
            query.data["created_at"]=postDate
            nav.navigation.navigate("Post And Comment",  {query,postDate} );
           }}>
       <PostCard>
           <View style={{flexDirection:"row"}}>
               
                <Text style={styles.authorNameStyle}>{query.data.title}</Text>
                <Zocial name="statusnet" size={24} color="#fff"  style={styles.iconStyle} />
           </View>
           
           <Text style={styles.dateStyle}>{postDate}</Text>
           <Text numberOfLines={2}  style={styles.postBodyStyle}>{query.data.body}</Text>
          
           <FontAwesome name="comment-o" size={27} color="#fff"  style={styles.commentStyle}
           />


           <AntDesign name="like1" size={20} color="#fff"  style={styles.likeStyle} 
           />
          
        <Text style={styles.likeTextStyle} >{query.data.likes} Likes</Text>
        <Text style={styles.commentTextStyle}>{query.data.comments} Answers</Text>
          
   
           
        
       </PostCard>
       </TouchableOpacity>
  


);
  
    
}

const styles=StyleSheet.create({
    iconStyle:{
        marginHorizontal:"1.5%"

        


        
    },
    commentStyle:{
        position:'absolute',
        bottom:"5.3%",
        right:"2%",
        marginBottom:0,
        
    },
    authorNameStyle:{
        fontFamily:'serif',
        fontSize:18,
        color:"#fff",
        marginBottom:".9%",
        width:"92%"
    },
    dateStyle:{
        
        marginBottom:"2%",
        color:"#fff",
        fontSize:10,
        fontStyle:"italic"
    },
    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:"2.4%",
        color:"#fff",
        fontSize:15,
        
        
  
        
        
    },
    likeStyle:{
        marginBottom:"1%",
        
        width:"12%",
       
        borderColor:"#108",
        
    },
   
    likeTextStyle:{
        marginBottom:".5%",
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:"20%",
        left:"9%",
        position:"absolute",
        bottom:6.8
    },
    commentTextStyle:{
        marginBottom:".5%",
        fontSize:14,
        fontFamily:'serif',
        color:"#fff",
        
        width:"27%",
        right:"6.5%",
        position:"absolute",
        bottom:"5.3%"
    },

  
}
);

export default PostList