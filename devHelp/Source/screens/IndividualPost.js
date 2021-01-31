import React , { useState, useEffect }  from 'react'
import {Text,Button,View,StyleSheet,TextInput,FlatList} from 'react-native'
import ScreenHeader from '../shareable/ScreenHeader'
import {PostCard} from '../shareable/customCard'
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import {  Input } from "react-native-elements";
import { FontAwesome ,AntDesign} from '@expo/vector-icons';
import { storeDataJSON,removeData } from "../Function/AsyncStorageFunction";
import CommentList from '../shareable/CommentList'
import * as firebase from 'firebase'
import "firebase/firestore";

const months={
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December",
}

const IndividualPostScreen=(props)=>{
    //console.log(props)
    let comment_=[]
    const posts=props.route.params.posts
    const postDate=props.route.params.postDate
    const currUser=props.route.params.currUser
    const [loading, setLoading] = useState(false);
    const[comments,setComments]=useState(0)
    const [commentsCount,setCommentCount]=useState(posts.data.comments)
    const [currentInputText,setCurrentInputText]=useState("")
    const loadComments = async () => {
        setLoading(true)
        firebase
          .firestore()
          .collection("posts")
          .doc(posts.id)
          .collection('comment_writer')
          .orderBy("written_at", "desc")
          .onSnapshot((querySnapshot) => {
            let temp_comments = [];
            querySnapshot.forEach((doc) => {
              temp_comments.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setComments(temp_comments);
           console.log(temp_comments)
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            alert(error);
          });
        
      };
        
      useEffect(() => {
        loadComments();
      }, []);
    
 
   
    
    return(
    
      <View style={styles.containerStyle}>  
           <ScreenHeader props ={props} ></ScreenHeader>
           <PostCard>
          
           <Entypo name="man" size={24} color="#c08401"  style={{width:20}}/>
           <Text style={styles.authorTextSTyle}>{posts.data.author}</Text>
            <Text style={styles.dateStyle}>{postDate}</Text>
           <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
           <AntDesign name="heart" size={23} color="#fc4601"  style={styles.likeStyle} />
           <FontAwesome name="comment-o" size={27} color="#fc6a03"  style={styles.commentStyle}/>
           <Text style={styles.likeTextStyle} >{posts.data.likes} Likes </Text>
           <Text style={styles.commentTextStyle}>{commentsCount} Comments</Text>
           
           </PostCard>

           <Input
              

                inputStyle={{color:"white"}}
                
                
                placeholder="Write your comment!"
                multiline={true}
                
                placeholderTextColor="white"
                
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Entypo name="pencil" size={24} color="white" />}
                onChangeText={function (currentInput) {
                   setCurrentInputText(currentInput)
                }}
              />
             <AntDesign name="checkcircle" size={30} color="#fc6a03" style={{marginHorizontal:180,marginBottom:20}}
             onPress={function(){
                  comment_={
                    writer:currUser.displayName,
                    comment_body:currentInputText,
                    written_at:firebase.firestore.Timestamp.now(),
                    writer_id:currUser.uid

                 }
                 firebase.firestore().collection("notifications").doc(posts.data.userId).collection("notification_details").add({
                    post:posts, 
                    name:currUser.displayName,
                    body:"commented on your post"
                })
                for(let omment of comments){
                    console.log(omment)
                firebase.firestore().collection("notifications").doc(omment.data.writer_id).collection("notification_details").add({
                    post:posts,
                    name:currUser.displayName,
                    body:"replied your comment"
                })
            }

                firebase.firestore().collection("posts").doc(posts.id).collection("comment_writer").add(comment_)
                firebase.firestore().collection("posts").doc(posts.id).update({
                    comments:commentsCount+1
                })
                setCommentCount(commentsCount+1)

             }}
             />

             <FlatList
                data={comments}
                extraData={comments}
                renderItem={function({ item } ){
                    return(
                       
                       <CommentList comments={item} />
                    )
                }}


            />
      </View>
    )
}

const styles=StyleSheet.create({
    authorTextSTyle:{
        left:29,
        position:"absolute",
        fontFamily:'serif',
        fontSize:23,
        color:"#c08401",
        marginBottom:5
    },
    dateStyle:{
        
        marginBottom:5,
        color:"#c08401",
        fontSize:10,
        fontStyle:'italic',
        marginTop:7
    },
    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:10,
        color:"#c08401",
        fontSize:19,
        
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
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fc6a03",
        
        width:60,
        left:30,
        position:"absolute",
        bottom:0
    },
    commentTextStyle:{
        marginBottom:3,
        fontSize:14,
        fontFamily:'serif',
        color:"#fc6a03",
        
        width:90,
        right:36,
        position:"absolute",
        bottom:0
    },
   
    commentStyle:{
        position:'absolute',
        bottom:1,
        right:10,
        marginBottom:0,
        
    },
    likeStyle:{
        marginBottom:3,
        bottom:0,
        width:36,
        left:0
    },
})

export default IndividualPostScreen