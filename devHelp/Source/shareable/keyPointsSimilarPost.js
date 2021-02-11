import React , { useState, useEffect,useRef } from 'react'
import {View,Text,Button,StyleSheet,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import KeyPointInput from './keyPointsInput'
import KeyPointQueryFlatList from './keyPointQueryFlatLists'


const KeyPointSimilarPost= (props) =>{
    const refKey1 = useRef("");
    const refKey2 = useRef("");
    const refKey3 = useRef("");

    const [allKeyPoints,setAllKeyPoints]=useState("")
    
    //check if any keyPoint field is emplty
    const checkKeyPoints = () =>{
        console.log("onpresse")
        if(refKey1.current && refKey2.current && refKey3.current ){
            try {
                props.keyPointValue["current"]=refKey1.current.toLowerCase().trim()+refKey2.current.toLowerCase().trim()+refKey3.current.toLowerCase().trim()
                
            } catch (error) {
                
            }
            
            setAllKeyPoints(refKey1.current.toLowerCase().trim()+refKey2.current.toLowerCase().trim()+refKey3.current.toLowerCase().trim())
            
        }

    }

    useEffect(()=>{
        let isMounted = true
        if(isMounted){
        console.log("Lets seeeeeeeeeeee")
        console.log(props)
        checkKeyPoints()
        }
        return ( ()=>{isMounted=false})
    },[])

    

    return(
   <View>
       <View style={styles.fieldSet}>
        <Text style={styles.legend}>KeyPoints  </Text>
        <View  >
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey1} placeHolder={props.keyPoin1+ " (first key point)"} onCheck={checkKeyPoints}/>
            </View>
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey2} placeHolder={props.keyPoin2+ " (second key point)"} onCheck={checkKeyPoints}/>
            </View>
       
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey3} placeHolder={props.keyPoin3+ " (third key point)"} onCheck={checkKeyPoints}/>
            </View>
     </View>
    </View>

    <KeyPointQueryFlatList keyPoints={allKeyPoints} nav={props.nav}/>

   </View>
    
    )
}



const styles = StyleSheet.create({
    fieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderRadius: 5,
        borderWidth: 1,
        
        borderColor: '#008',
       
        
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    keyFieldSet:{
       
       
       
       
        
        
        borderColor: '#008',
        marginBottom:-20
        
       
       
    },
  
   
            

});

export default KeyPointSimilarPost;