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

const DataStructureScreenActivity=(props)=>{
    
  //console.log(props)
  //console.log("okayy")
  
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const category="Data- Structure"
 
  const loadQueries = async () => {
    
    await getData1Collection(category,setQueries,setLoading)
    console.log("Queryyyy")
    //console.log(queries.data.likes)
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

  

  const a = () =>{
    console.log("jhaaak")
  }
  useEffect (()=>{
    let isMount = true
    if(isMount)
    a()
    return ( ()=>{
      isMount=false
    })
  },[queries])
  
 
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
        
           <ScreenHeader props ={props} ></ScreenHeader>
           <CategoryCard categoryName={category} dx={"-5"} dy={-18}>

             <Text>{}</Text>
     
           </CategoryCard>

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
export default DataStructureScreenActivity