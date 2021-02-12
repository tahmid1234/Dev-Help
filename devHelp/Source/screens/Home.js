import React, { useState, useEffect } from "react";
import {View,StyleSheet,ActivityIndicator,Text,FlatList,TouchableOpacity} from 'react-native'
import {AuthContext} from '../provider/AuthProvider'
import FlashMessage from "react-native-flash-message";
import ScreenHeader from '../shareable/ScreenHeader'
import PostList from '../shareable/PostList'
import * as firebase from 'firebase'
import "firebase/firestore";
import CategoryCard from '../shareable/CategoryCard'
import {getData1Collection} from '../Function/FirebaseFunctions'







const HomeScreenActivity=(props)=>{
    
  //console.log(props)
  console.log("okayyppppppppppp")
  console.log("CurrentUserrrrrrr")
  
  let a =AuthContext.Consumer._currentValue.setIsLoggedIn
  AuthContext.Consumer._currentValue.setIsLoggedIn(true)
  console.log(AuthContext.Consumer._currentValue.IsLoggedIn)
  const [RecentPost, setRecentPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  



  const loadPosts = async () => {
   
    setLoading(true)
    getData1Collection("all",setPosts,setLoading)
  };
    
  useEffect(() => {
    let isMounted = true
    if(isMounted){
    loadPosts();
    
    }
    return(()=>{isMounted=false})
  }, []);

    
    
     
        
   
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
            {console.log("homeeeeee")}
            {console.log(auth)}
           <ScreenHeader props ={props} ></ScreenHeader>
           <CategoryCard props={props}>

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

export default HomeScreenActivity