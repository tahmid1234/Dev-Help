import React , { useState, useEffect,useRef } from 'react'
import {  Overlay } from 'react-native-elements';
import {View,Text,Button,StyleSheet,ScrollView,TouchableOpacity,FlatList,SafeAreaView} from 'react-native'
import LinkOverlay from '../shareable/linkOverlay'
import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
import ScreenHeader from '../shareable/ScreenHeader'
import InputField from '../shareable/input_field'
import KeyPointSimilarPost from '../shareable/keyPointsSimilarPost'
import {AuthContext} from '../provider/AuthProvider'
import * as firebase from 'firebase';
import "firebase/firestore";
import InactiveHeader from '../shareable/inactiveHeader'

//keys need to be checked to ensure no invalid char has been passed to fb 
const QueryPostScreenActivity = (props) =>{
    const category ={"Data- Structure":{"title":"How to implement stack using Linkled lists in c?","key1":"stack","key2":"linked list","key3":"c"},
                    "Ubuntu":{"title":"How to install mySql-server  in ubuntu","install":"","mysql-server":"Linked List","key3":"ubuntu"},
                    }
    const refTitle = useRef("");
    const refKeyPoint= useRef("")
    const refBody = useRef("");
    const links= useRef({})
   
    const [linkVisible, setLinkVisible] = useState(false);
    const uid=global.userInfo.uid
    const displayName=global.userInfo.displayName
    console.log(JSON.stringify(props.route.params.categoryName))
    //allow to pop up
    const toggleLinkOverlay = () => {
        setLinkVisible(!linkVisible);
    };



    //question submission

    const onSubmit = ()=>{
        if(refBody.current && refTitle.current && refKeyPoint.current){
            let postInfo ={
                authorId:uid,
                title:refTitle.current,
                keyPoints:refKeyPoint.current,
                body:refBody.current,
                author:displayName,
                link:links.current,
                created_at:firebase.firestore.Timestamp.now(),
                likes:0,
                comments:0,
                categoryName:props.route.params.categoryName["name"]
            }
          
            firebase.firestore().collection(props.route.params.categoryName["name"]).add(postInfo).then((docRef)=>{

                console.log(docRef.id)
                console.log("hoi se")

                firebase.firestore().collection("all").doc(docRef.id).set(postInfo).then(()=>{

                  }).catch((error)=>{
                   
                    alert(error)
                  })

                  firebase.firestore().collection(refKeyPoint.current).doc(docRef.id).set(postInfo).then(()=>{
    
                  }).catch((error)=>{
                   
                    alert("hello")
                  })

                firebase.firestore().collection(uid).doc(docRef.id).set(postInfo).then(()=>{
    
                  }).catch((error)=>{
                   
                    alert("hello")
                  })
                

                   
                
                props.navigation.goBack()

              }).catch((error)=>{
               
                alert(error)
              })
        }
    }
    
    //opnes ubuntu pastebim
    const _handleOpenWithWebBrowserUbuntuPastebin = () => {
        
        WebBrowser.openBrowserAsync('https://pastebin.ubuntu.com/');
      };
      
     
    console.log(props.route.params.categoryName["name"])
    console.log(category[props.route.params.categoryName["name"]].title)
  
    return(
        <View style={{flex:1}}>

          <InactiveHeader headerText={"Write Your Question"}/>

           <ScrollView keyboardShouldPersistTaps={"always"} nestedScrollEnabled={true}   >

                <View style={{marginTop:20,marginBottom:10}} >
                    <View style={styles.fieldSet}>
                        <Text style={styles.legend}>Title</Text>
                        <InputField inputRef={refTitle} placeHolder={category[props.route.params.categoryName["name"]].title}></InputField>
                    </View>

                </View>

                <KeyPointSimilarPost nav={props} keyPointValue={refKeyPoint} keyPoin1={category[props.route.params.categoryName["name"]].key1} keyPoin2={category[props.route.params.categoryName["name"]].key2} keyPoin3={category[props.route.params.categoryName["name"]].key3}/>
          
            
                <View style={{marginTop:20,marginBottom:10}} >
                    <View style={styles.bodyFieldSet}>
                        <Text style={styles.legend}>Body </Text>
                        <InputField inputRef={refBody} placeHolder={"Write Your Question"}></InputField>
                </View>

                </View>
         
                <View style={{flexDirection:"row"}}>

                    <TouchableOpacity onPress={_handleOpenWithWebBrowserUbuntuPastebin} style={styles.fab}>
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
                    <TouchableOpacity onPress={onSubmit} style={styles.submitButtonStyle}>
                        <Text style={{color:"white",fontFamily:"serif",fontSize:13}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            
            
            </ScrollView>
            
           
        </View>
    )
}

const styles = StyleSheet.create({
    fieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#008',
       
        
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    keyFieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
       
        
        alignItems: 'center',
        borderColor: '#008',
        
        width:127,
       
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

export default QueryPostScreenActivity;