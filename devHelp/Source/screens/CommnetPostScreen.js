import React, {useRef,useState} from 'react'
import {View,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native'
import InputField from '../shareable/input_field'
import InactiveHeader from '../shareable/inactiveHeader'
import {_handleOpenWithWebBrowserUbuntuPastebin} from '../Function/LinkOpeningFunction'
import LinkOverlay from '../shareable/linkOverlay'
import { Entypo,AntDesign } from '@expo/vector-icons';
import {  Overlay } from 'react-native-elements';
import {addDataCollection,updateCount} from '../Function/FirebaseFunctions'
import {AuthContext} from '../provider/AuthProvider'
import * as firebase from 'firebase';
import "firebase/firestore";


const CommentPostActivity = (props) => {

    const posts = props.route.params.posts

    

    const uid=AuthContext.Consumer._currentValue.CurrentUser.uid
    const displayName=AuthContext.Consumer._currentValue.CurrentUser.displayName

    posts.data["reactorId"]=uid
    posts.data["reactorName"]=displayName
    posts.data["postId"]=posts.id

    const refBody = useRef("");
    const links= useRef({})
   
    const [linkVisible, setLinkVisible] = useState(false);


    const toggleLinkOverlay = () => {
        setLinkVisible(!linkVisible);
    };

    const onSubmit = ( ) =>{

        if(refBody.current){

        let commentDetails = {
            authorId:uid,
            created_at:firebase.firestore.Timestamp.now(),
            body:refBody.current,
            author:displayName,
            link:links.current, 
            likes:0,
            comments:0,
        }

        //console.log(commentDetails)
        posts.data["reactorStatus"]="answered your question"
        posts.data["comments"]=parseInt(posts.data.comments)+1
        posts.data["reaction_time"]=firebase.firestore.Timestamp.now(),

        addDataCollection("PostComments",posts.id,"CommentDetails",commentDetails)
        updateCount("NotificationCount",posts.data.authorId,1)
        addDataCollection("Notification",posts.data.authorId,"reaction",posts.data)
        props.navigation.goBack()
    }

    }

    return(
        <View  style={{flex:1}}>
            <InactiveHeader headerText={"Write Your Answer"}/>
            <ScrollView  keyboardShouldPersistTaps={'always'}>

                    <View style={{marginTop:20,marginBottom:10}} >
                        <View style={styles.bodyFieldSet}>
                            <Text style={styles.legend}>Body </Text>
                            <InputField inputRef={refBody} placeHolder={"Write"}></InputField>
                        </View>

                    </View>

                <View style={{flexDirection:"row"}}>

                <TouchableOpacity onPress={()=>{_handleOpenWithWebBrowserUbuntuPastebin('https://pastebin.ubuntu.com/')}} style={styles.fab}>
                    <Entypo name="code" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleLinkOverlay} style={styles.link}>
                    <Entypo name="link" size={24} color="black" />
                </TouchableOpacity>

                <Overlay isVisible={linkVisible} onBackdropPress={toggleLinkOverlay} overlayStyle={{width:300,height:350,position: 'absolute',}}>
                    <LinkOverlay  link={links.current}  closePopUp={toggleLinkOverlay}/>
                </Overlay>

                </View>

                <View >
                
                <AntDesign name="checkcircle" size={30} color="#208" style={{marginHorizontal:180,marginBottom:20}}
                    onPress={onSubmit}
                />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    
    bodyFieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#008',
        height:300
       
        
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
        link: { 
            position: 'absolute', 
            width: 60, 
            height: 60, 
            alignItems: 'center', 
            justifyContent: 'center', 
            right: 85, 
            bottom: 20, 
            backgroundColor: '#fff', 
            borderRadius: 30, 
            elevation: 8 ,
            borderColor:"#34339a",
            borderWidth:2
            }, 

            submitButtonStyle:{
                height:50,
                width:90,
                
                justifyContent: 'center',
                backgroundColor:"#000",
                borderRadius:10,
                bottom:30,
                padding:20,
                left:10,
                borderWidth:2,
                borderColor:"#33b",
                top:-15

            }

});

export default CommentPostActivity