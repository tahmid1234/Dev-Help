import React , { useState, useEffect }  from 'react'
import {Text,Button,View,StyleSheet,TextInput,FlatList,TouchableOpacity} from 'react-native'
import ScreenHeader from '../shareable/ScreenHeader'
import {PostCard} from '../shareable/customCard'
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import {  Input } from "react-native-elements";
import { FontAwesome ,AntDesign} from '@expo/vector-icons';
import CommentList from '../shareable/CommentList'
import * as firebase from 'firebase'
import "firebase/firestore";
import {_handleOpenWithWebBrowserUbuntuPastebin} from '../Function/LinkOpeningFunction'
import {setDataCollection,getLikeCounts,updateLikeCount,updateCount, addDataCollection} from '../Function/FirebaseFunctions'
import {AuthContext} from '../provider/AuthProvider'
import CommentFlatList from '../shareable/commentFlatList'



const IndividualPostScreen=(props)=>{
    //console.log(props)
   
    
    const posts = props.route.params.query
    const postDate = props.route.params.postDate
    
    //const nav = props.route.params.nav

    const [loading, setLoading] = useState(false);
    const[comments,setComments]=useState(0)
    const [commentsCount,setCommentCount]=useState(0)
    const [currentInputText,setCurrentInputText]=useState("")
    const [postLikes,setPostLikes] = useState(0)
    const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
    const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName
    const likeIcosn = {"0":"like2","1":"like1","-1":"like2"}
    const disLikeIcon = {"0":"dislike2","1":"dislike2","-1":"dislike1"}
    const [increaseBy,setIncreaseBy]=useState(0)
    posts.data["reactorId"]=uid
    posts.data["reactorName"]=displayName
    posts.data["postId"]=posts.id
    console.log("UIDDDDDDD")
    console.log(uid)

    const onDisLikePressed = async () =>{
        if(parseInt( postLikes)!=-1){
        
        posts.data["reactorStatus"]="disliked your question"
        posts.data["likes"]=increaseBy -1-postLikes
        posts.data["reaction_time"]=firebase.firestore.Timestamp.now(),
        setIncreaseBy(increaseBy -1-postLikes)
        console.log("dataaaaa")
        console.log(parseInt( posts.data.likes))
        
        updateLikeCount(-1-postLikes,posts.id,posts.data.keyPoints,posts.data.categoryName)
        setPostLikes(-1)
        setDataCollection("queries",posts.id,uid,{likes:-1})
        updateCount("NotificationCount",posts.data.authorId,1)
        addDataCollection("Notification",posts.data.authorId,"reaction",posts.data)
        
        
        }
    }

    const onLikePressed = async () =>{
        console.log("Jacche?")
        console.log(postLikes)
        if(postLikes!=1){
            
        posts.data["reactorStatus"]="liked your question"
        posts.data["likes"]=increaseBy+ 1-postLikes
        posts.data["reaction_time"]=firebase.firestore.Timestamp.now(),
        setIncreaseBy(increaseBy+ 1-postLikes)
        console.log("Vitore")
        updateLikeCount(1-postLikes,posts.id,posts.data.keyPoints,posts.data.categoryName)
        
        setPostLikes(1)
        setDataCollection("queries",posts.id,uid,{likes:1})
        updateCount("NotificationCount",posts.data.authorId,1)
        addDataCollection("Notification",posts.data.authorId,"reaction",posts.data)
        
        
        
        }
    }

    const setTotalComments = (count) =>{
        setCommentCount(count)
    }

    

      
      
        
      useEffect(() => {
        
        let isMounted=true
        if(isMounted)
        {
            setIncreaseBy(parseInt( posts.data.likes))
            getLikeCounts("queries",posts.id,uid,setPostLikes,isMounted)
        }
        
         console.log("hhhhhh")
         console.log(postLikes)
        //loadComments();

        return () => { isMounted = false}

      }, []);
    
 
   
    
    return(
    
        <View style={styles.containerStyle}>  
        <ScreenHeader props ={props} ></ScreenHeader>
        <PostCard >
            <View style={{backgroundColor:"white",padding:3.5}}>
            <View style={{flexDirection:"row"}}>
                 <Entypo name="man" size={24}  color="#5CF" style={{height:25,width:25,borderRadius:12.5,backgroundColor:"black"}}/>
                 <View>
                     
                     <Text style={styles.authorTextSTyle}>{posts.data.author}</Text>
                     <Text style={styles.dateStyle}>{postDate}</Text>
                 </View>
             </View>
        <Text style={styles.postTitleStyle}>{posts.data.title} </Text>
         
        <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
        {posts.data.link["linkCoverName"]?
         <View>
         <Text style={styles.linkCoverName}  onPress={() => _handleOpenWithWebBrowserUbuntuPastebin(posts.data.link[posts.data.link["linkCoverName"]])}> {posts.data.link["linkCoverName"]}</Text>
      </View>
      :
      <Text style={{color:"white"}}>ashe nai</Text>
        }
        <View>
           <Text> {posts.data["linkCoverName"]}</Text>
        </View>
        <View style={{flexDirection:"row"}}>
        <AntDesign name={likeIcosn[postLikes]} size={24} color="#5CF"  
             style={styles.likeStyle}
             onPress = {onLikePressed} />
         
        <Text style={styles.likeTextStyle} >{increaseBy} </Text>
        <AntDesign name={disLikeIcon[postLikes]} size={24} color="#5CF"  
             style={styles.disLikeStyle} 
             onPress={onDisLikePressed} />
        </View>
      
       
        <FontAwesome name="comment-o" size={27} color="#5CF"  style={styles.commentStyle}/>
       
       
        <Text style={styles.commentTextStyle}>{commentsCount} Comments</Text>
        

            </View>
            
        </PostCard>

        <TouchableOpacity style={{padding:30,marginBottom:20}} onPress={()=>{
            props.navigation.navigate("Post the comment",{posts})
           
        }}>
        <Text style={{color:"#208",borderBottomColor:"#008",borderBottomWidth:1}}>Write Your Answer</Text>
       
        </TouchableOpacity>
        <CommentFlatList postId={posts.id} basePost={posts} setCommentCount={setTotalComments} />

        

        

              
       



       
    
   </View>
    )
}

const styles=StyleSheet.create({
    authorTextSTyle:{
        left:1,
        
        fontFamily:'serif',
        fontSize:15,
        color:"#1AF",
       
    },
    dateStyle:{
        
        marginBottom:5,
        color:"#5CF",
        fontSize:9,
        fontStyle:'italic',
      
    },
    postBodyStyle:{
       
        marginBottom:10,
        color:"#208",
        fontSize:13,
        
    },
    inputStyle:{

        color:"#c08401",
        borderColor:"#c08401",
        marginHorizontal:20,
        marginTop:10,
    },
    containerStyle:{
        flex:1
        , 
    },
    likeTextStyle:{
       
        fontSize:18,
        fontFamily:'serif',
        color:"#5CF",
        bottom:3.1,
        marginLeft:4
    },
    commentTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
         color:"#5CF",
        
        width:90,
        right:36,
        position:"absolute",
        bottom:6.8
    },
   
    commentStyle:{
        position:'absolute',
        bottom:1,
        right:10,
        marginBottom:0,
        
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

    postTitleStyle:{
        fontFamily:'serif',
        marginBottom:3,
        color:"#1AF",
        fontSize:17,
        
    },
   
    linkCoverName:{
        fontFamily:'serif',
        marginBottom:3,
        color:"#1AF",
        fontSize:13,
        textDecorationLine: 'underline',
        left:2
        
    },
})

export default IndividualPostScreen