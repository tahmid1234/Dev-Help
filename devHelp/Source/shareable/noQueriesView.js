import React from 'react'
import {View,Text} from 'react-native'

const NoQueriesView = () =>{
    console.log("Hoinai to")
    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{color:"black",fontSize:27,fontFamily:"serif",marginHorizontal:50,top:-60}}> No Queries Posted Yet</Text>
        </View>
    )
}

export default NoQueriesView;