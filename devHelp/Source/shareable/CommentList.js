import React , { useState, useEffect }  from 'react'
import {View,Button,Flatlist,Text,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {CommentCard} from '../shareable/customCard'
import convertSecons from '../Function/SeconsToUtcDate'
import {_handleOpenWithWebBrowserUbuntuPastebin} from '../Function/LinkOpeningFunction'
import {simpleCollectionSet,setDataCollection,getLikeCounts,updateLikeCount,updateCount, addDataCollection,getSingleCollectionData} from '../Function/FirebaseFunctions'
import {AuthContext} from '../provider/AuthProvider'
import { FontAwesome ,AntDesign} from '@expo/vector-icons';
import * as firebase from 'firebase'
import "firebase/firestore";


const CommentList=(props)=>{
    const [commentLikes,setcommentLikes] = useState(0)
    const [increaseBy,setIncreaseBy]=useState(0)
    const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
    const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName
    const likeIcosn = {"0":"like2","1":"like1","-1":"like2"}
    const disLikeIcon = {"0":"dislike2","1":"dislike2","-1":"dislike1"}
    const comment=props.comments
    const basePost= props.basePost;
 

    basePost.data["reactorId"]=uid
    basePost.data["reactorName"]=displayName
    basePost.data["commentId"]=comment.id
    basePost.data["postId"]=basePost.id

    const onDisLikePressed = async () =>{
       
        if(parseInt( commentLikes)!=-1){
        
        basePost.data["reactorStatus"]="disliked your comment"
        basePost.data["likes"]=increaseBy -1-commentLikes
        basePost.data["reaction_time"]=firebase.firestore.Timestamp.now()
        basePost.data["comment_body"]=comment
        console.log(increaseBy- 1-commentLikes)
        
        
        
        
        
        setDataCollection("UserLikingComments",comment.id,uid,{likes:-1})
        updateCount("NotificationCount",comment.data.authorId,1)
        console.log(increaseBy- 1-commentLikes)
        simpleCollectionSet("CommentReactions",comment.id,increaseBy -1-commentLikes)
        console.log(increaseBy- 1-commentLikes)
        addDataCollection("Notification",comment.data.authorId,"reaction",basePost.data)
        
        setcommentLikes(-1)
        
        
        }
    }

    const onLikePressed = async () =>{
       
        if(commentLikes!=1){
        basePost.data["reactorStatus"]="liked your post"
        basePost.data["likes"]=increaseBy+ 1-commentLikes
        basePost.data["reaction_time"]=firebase.firestore.Timestamp.now() 
        console.log(comment.id)

   
        setDataCollection("UserLikingComments",comment.id,uid,{likes:1})
        updateCount("NotificationCount",comment.data.authorId,1)
        console.log(increaseBy+ 1-commentLikes)
        simpleCollectionSet("CommentReactions",comment.id,increaseBy +1-commentLikes)
        console.log(increaseBy+ 1-commentLikes)
        addDataCollection("Notification",comment.data.authorId,"reaction",basePost.data)
        
        
        setcommentLikes(1)
        
        
        
        }
    }

    useEffect(() => {
        
        let isMounted=true
        if(isMounted)
        {   //fetche total reactions
            getSingleCollectionData("CommentReactions",comment.id,setIncreaseBy,isMounted)
            //check if current user liked or disliked
            getLikeCounts("UserLikingComments",comment.id,uid,setcommentLikes,isMounted)
        }
         
       
        //loadComments();

        return () => { isMounted = false}

      }, []);
   
    
    
    return(
        <View style={{flexDirection:"row"}}>
             <MaterialCommunityIcons name="human-greeting" size={36} color="#208" style={styles.iconStyle}/>
           
        <CommentCard>
           <View style={{flexDirection:"row"}} >
                <Text style={styles.CommenterStyle}>{comment.data.author}</Text>
                <Text style={styles.dateStyle}> {convertSecons(comment.data.created_at["seconds"])}</Text>
                
           </View>

           <View >
                <Text style={styles.postBodeStyle}>{comment.data.body} </Text>
           </View>
        {comment.data.link["linkCoverName"]?
            <View>
                <Text style={styles.linkCoverName}  onPress={() => _handleOpenWithWebBrowserUbuntuPastebin(comment.data.link[comment.data.link["linkCoverName"]])}> {comment.data.link["linkCoverName"]}</Text>
            </View>
      :
      null
        }
            
            
            <View style={{flexDirection:"row",marginTop:20}}>
        <AntDesign name={likeIcosn[commentLikes]} size={20} color="#208"  
             style={styles.likeStyle}
             onPress = {onLikePressed} />
         
        <Text style={styles.likeTextStyle} >{increaseBy} </Text>
        <AntDesign name={disLikeIcon[commentLikes]} size={20} color="#208"  
             style={styles.disLikeStyle} 
             onPress={onDisLikePressed} />
        </View>  

        </CommentCard>
        </View>
    )
}

const styles= StyleSheet.create({
        CommenterStyle:{
            fontSize:12,
            
            left:5,
            fontFamily:'serif',
            color:"#208",
            fontWeight:"bold",
           

        },
        iconStyle:{
            
            width:30,
            position:"absolute",
            left:6.6,
            top:13,
            borderRadius:15,
            borderWidth:1,
            height:30,
            backgroundColor:"#978"

            
        },
        postBodeStyle:{
            color:"#eee",
            
            fontSize:12.4,
             left:5,
            
        },
        dateStyle:{
        
            marginBottom:5,
            color:"#208",
            fontSize:10,
            fontStyle:'italic',
            position:"absolute",
            
            right:12
        },

        linkCoverName:{
            fontFamily:'serif',
            marginBottom:3,
            color:"#1BF",
            fontSize:13,
            textDecorationLine: 'underline',
            left:2,
            marginBottom:4
            
        },
        likeStyle:{
       
            bottom:6.8,       
            transform: [{rotateY: '180deg'}],
            height:30,
        },
        disLikeStyle:{
            bottom:-1.5,
            width:36,
        },
        likeTextStyle:{
       
            fontSize:16,
            fontFamily:'serif',
            color:"#208",
            bottom:3.1,
            marginLeft:4
        },

        
        

})

export default CommentList