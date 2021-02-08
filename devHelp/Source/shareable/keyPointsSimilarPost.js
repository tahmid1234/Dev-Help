import React , { useState, useEffect,useRef } from 'react'
import {View,Text,Button,StyleSheet,ScrollView,TouchableOpacity,FlatList} from 'react-native'
import KeyPointInput from './keyPointsInput'


const KeyPointSimilarPost= (props) =>{
    const refKey1 = useRef("");
    const refKey2 = useRef("");
    const refKey3 = useRef("");
    const [a,setA]=useState(1)
    
    //check if any keyPoint field is emplty
    const [b,setB]=useState(1)
    const checkKeyPoints = () =>{
        console.log("onpresse")
        if(refKey1.current && refKey2.current && refKey3.current ){
            props.keyPointValue["current"]=refKey1.current+refKey2.current+refKey3.current
            console.log(props)
        }

    }

    useEffect(()=>{
       
        checkKeyPoints()
    },[])

    

    return(
    <View style={styles.fieldSet}>
        <Text style={styles.legend}>KeyPoints  </Text>
        <View style={{flexDirection:"row"}} >
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey1} placeHolder={props.keyPoin1} onCheck={checkKeyPoints}/>
            </View>
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey2} placeHolder={props.keyPoin2} onCheck={checkKeyPoints}/>
            </View>
       
            <View style={styles.keyFieldSet}>
                <KeyPointInput inputRef={refKey3} placeHolder={props.keyPoin3} onCheck={checkKeyPoints}/>
            </View>
     </View>
    </View>
    )
}



const styles = StyleSheet.create({
    fieldSet:{
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
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
        margin: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
       
        
        alignItems: 'center',
        borderColor: '#008',
        
        width:127,
       
    },
  
   
            

});

export default KeyPointSimilarPost;