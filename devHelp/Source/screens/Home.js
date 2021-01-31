import React, { useState, useEffect } from "react";
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







const HomeScreenActivity=(props)=>{
    
  //console.log(props)
  console.log("okayy")
  const [RecentPost, setRecentPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  let ref=""


  const loadPosts = async () => {
    setLoading(true)
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        console.log("Temp")
        console.log(temp_posts)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
    
  };
    
  useEffect(() => {
    loadPosts();
  }, []);

    
    
     
        
   
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
        
           <ScreenHeader props ={props} ></ScreenHeader>
           <CategoryCard>

             <Text>Go to category list</Text>
       
     
           </CategoryCard>
           
                 
            {!loading?
             <View style={{flex:1}}>
            <FlatList
            
            data={posts}
            extraData={posts}
           
            renderItem={function({ item } ){
              //console.log("Render")
              //console.log(posts)
             
             
              return (
                 
                 <PostList posts={item} nav={props} currentUser={auth.CurrentUser}/>
                 
                 )
          }}
          
           
             />
              <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
              <FontAwesome name="pencil-square-o" size={26} color="black" />
        </TouchableOpacity>
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

export default HomeScreenActivity