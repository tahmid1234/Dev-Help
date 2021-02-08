import React,{useState} from 'react'
import {View,Text,Button} from 'react-native'
import {  Input } from "react-native-elements";


const InputField = (props) =>{

  const [inputValue,setInputValue]=useState("");

  console.log(Boolean(true))
    return(
        <Input
            
                
        clearTextOnFocus={Boolean(true)}
        
        inputStyle={{color:"#000",marginTop:9,marginBottom:18}}
        
        
        placeholder={props["placeHolder"]}
        multiline={true}
        onChangeText ={function (currentInput){
            
            props.inputRef["current"]=currentInput
           
            
            
        }}
        
        
        
       
      />
    )
}

export default InputField