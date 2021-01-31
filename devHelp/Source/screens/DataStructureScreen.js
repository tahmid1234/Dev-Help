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








const DataStructureScreenActivity=(props)=>{
    
  //console.log(props)
  console.log("okayy")
  
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const loadQueries = async () => {
    setLoading(true)
    firebase
      .firestore()
      .collection("posts").doc("dataStructure").collection("queries")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setQueries(temp_posts);
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
    loadQueries();
  }, []);

    //console.log("Lets see")
    //console.log(queries)
 
    return(

<AuthContext.Consumer>
        {(auth) => (

            

       <View style={{flex:1}}>
        
           <ScreenHeader props ={props} ></ScreenHeader>
           <CategoryCard categoryName={"Data- Structure"} dx={"-5"} dy={-18}>

             <Text>Data Structure</Text>
     
           </CategoryCard>

           {!queries.length?
            <NoQueriesView/>:
            <Text></Text>
            }

            {!loading
            ?           
               <PostFlatList queries={queries} props={props} currentUser={auth.CurrentUser}/>
            : 
              <LoadingView/>}  
        </View>
         )}
         </AuthContext.Consumer>
    );
}
export default DataStructureScreenActivity