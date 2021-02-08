import React from 'react'
import {Header} from "react-native-elements";

const InactiveHeader=(props)=>{
   
    return(
       
        <Header
        backgroundColor="#000"
            
            centerComponent={{ text:props.headerText, style: { color: "#fff" } }}
/>


    )
}


export default InactiveHeader;