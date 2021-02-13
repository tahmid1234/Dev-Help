import React, { useState, useEffect } from "react";
import {View,StyleSheet,ActivityIndicator,Text} from 'react-native'
import {AuthContext} from '../provider/AuthProvider'
import ScreenHeader from '../shareable/ScreenHeader'
import * as firebase from 'firebase'
import "firebase/firestore";
import CategoryCard from '../shareable/CategoryCard'
import PostFlatList from "../shareable/postFlatList";
import LoadingView from "../shareable/loadingView"
import NoQueriesView from "../shareable/noQueriesView"
import {getData1Collection} from '../Function/FirebaseFunctions'

const AndroidScreenActivity=(props)=>{
    
  //console.log(props)
  //console.log("okayy")
  
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const category="Android"
 
  const loadQueries = async () => {
    
    await getData1Collection(category,setQueries,setLoading)
    console.log("Queryyyy")
   
    console.log("Queryyyy")
    
    
  };

    
  useEffect(() => {
    let isMount = true
    if(isMount)
    loadQueries();

    return ( ()=>{
      isMount=false
    })
    
  }, []);

  


  useEffect (()=>{
    let isMount = true
    if(isMount)
   
    return ( ()=>{
      isMount=false
    })
  },[queries])
  
 
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
        
           <ScreenHeader props ={props} ></ScreenHeader>
           <CategoryCard categoryName={category} dx={"11.5"} dy={-18} props={props}>

            
     
           </CategoryCard >

           {!queries.length?
            <NoQueriesView/>:
            null
            }

            {!loading
            ?           
               <PostFlatList categoryName={category} queries={queries} props={props} currentUser={auth.CurrentUser}/>
            : 
              <LoadingView/>}  
        </View>
         )}
         </AuthContext.Consumer>
    );
}
export default AndroidScreenActivity