import React, { useState, useEffect } from "react";
import {View,StyleSheet,ActivityIndicator,Text,FlatList,TouchableOpacity} from 'react-native'
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import PostList from './PostList'
import CategoryCard from '../shareable/CategoryCard'

const PostFlatList =(props)=>{

    const queries=props.queries
    const categoryName={name:props.categoryName}
    
   
                    

    return(
        <View style={{flex:1}}>
              <FlashMessage position="top" /> 
            <FlatList
            
            data={queries}
            extraData={queries}
           
            renderItem={function({ item } ){
              console.log("Renderrrrrrrr")
              //console.log(posts)
              console.log(item.data.likes)
             
             
              return (
                 
                <PostList posts={item} nav={props.props} currentUser={props.currentUser} nextScreen={"Post And Comment"}/>
                 
                 )
          }}
          
           
             />
             

              <TouchableOpacity onPress={() => 
              
              //This onpress function navigates to Question Witting Screen
              { let a=[{key:5}]
                 props.props.navigation.navigate("QueryPost",{categoryName})
                showMessage({
                message: "My message title",
                description: "My message description",
                type: "default",
                backgroundColor: "purple", // background color
                color: "#606060", // text color
              })}} style={styles.fab}>
              <FontAwesome name="pencil-square-o" size={26} color="black" />
        </TouchableOpacity>
        </View>
    )

}

const styles=StyleSheet.create({
 

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
  
}
);

export default PostFlatList;