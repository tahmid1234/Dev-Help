import React,{useState,useEffect} from 'react'
import {Text,View,FlatList,StyleSheet} from 'react-native'
import {getData1Collection, getDoubleCollectionData} from '../Function/FirebaseFunctions'
import CommentList from './CommentList'


const CommentFlatList = (props) =>{
    const postId=props.postId
    

    const [loading,setLoading] = useState(false)
    const [comments,setComments] = useState([])
    const [listCount,setListCount]=useState(0)
    
    const LoadComments = () => {
        console.log(postId)
        console.log(props)
        props.setCommentCount(10)
        getDoubleCollectionData("PostComments",postId,"CommentDetails",setComments,setLoading,setListCount)

    }

    useEffect (()=>{
        let isMounted = true;
        if(isMounted)
        LoadComments()

        return ( ()=>{isMounted = false})
    },[])

    useEffect (()=>{
        let isMounted=true
        if(isMounted)
        props.setCommentCount(listCount)
         return ( ()=>{isMounted = false})
    },[listCount])

    return (
       <View style={{flex:1}}>
           <FlatList
                data={comments}
                extraData={comments}
                renderItem={function({ item } ){
                    //console.log(item)
                    return(
                       
                       <CommentList comments={item} basePost={props.basePost} />
                    )
                }}


            />
       </View>
    )

}

export default CommentFlatList;