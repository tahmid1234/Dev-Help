import React from "react";
import {View,ActivityIndicator,Text} from 'react-native'

const LoadingView = () =>{
    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    )
}

export default LoadingView