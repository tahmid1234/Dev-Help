import React from 'react'
import {StyleSheet,View} from 'react-native';

const AuthCard=(props)=>{
    return(
        <View style={styles.authCardStyle}>
           
                {props.children}
            
        </View>
    )
}
const PostCard=(props)=>{
    return(
        <View style={styles.postCardStyle}>
            {props.children}
        </View>
    )
}

const CommentCard=(props)=>{
    return(
        <View style={styles.commentCardStyle}>
             {props.children}
        </View>
    )
}

const KeyPointQueryCard=(props)=>{
    return(
        <View style={styles.keyPointQueryCardStyle}>
             {props.children}
        </View>
    )
}

const NotificationCard=(props)=>{
    return(
        <View style={styles.notificationCardStyle}>
             {props.children}
        </View>
    )
}

const IndivudualPostCard=(props)=>{
    return(
        <View style={styles.individualPostCardStyle}>
             {props.children}
        </View>
    )
}

const styles= StyleSheet.create({
    authCardStyle:{
       marginLeft:"6%",
       marginRight:"6%",
       
       borderWidth:1,
       borderColor:"#000",
       padding:8
       


    },
    postCardStyle:{
        
        borderRadius:9,
        marginLeft:"5%",
        marginRight:"5%",
       
        marginTop:"2%",
        backgroundColor:"#000",
        marginBottom:"4.5%",
        padding:8,
        borderWidth:1.3,
        borderColor: '#308',
        
        
    },
    commentCardStyle:{
        borderRadius:9,
        
        borderBottomColor:"black",
        borderWidth:1,
        
        width:"90.5%",
        marginBottom:"5.5%",
        backgroundColor:"#eeeefc",
        padding:8
        
    },
    notificationCardStyle:{
        
        
        borderBottomColor:"#208",
        borderWidth:.9,
        backgroundColor:"#fffff9",
        padding:10, 

    },
    keyPointQueryCardStyle:{
        
        
        borderBottomColor:"#208",
        borderBottomWidth:.9,
        backgroundColor:"#ffffff",
        padding:10, 
        marginHorizontal:10,
        borderRadius: 5,
        borderRightWidth:.9,
        borderLeftWidth:.9


    },
    individualPostCardStyle:{
        
        borderRadius:9,
        
       
        marginTop:5,
        backgroundColor:"#eee",
        marginBottom:20,
        padding:8,
        borderWidth:1.3,
        borderColor: '#308',
        
        
    },

})

export {AuthCard,PostCard, CommentCard,NotificationCard,KeyPointQueryCard,IndivudualPostCard}