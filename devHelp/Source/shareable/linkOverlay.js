import React, {useRef,useState} from 'react'
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Alert,FlatList,Button, KeyboardAvoidingView} from 'react-native'
import { exp } from 'react-native-reanimated';
import InputField from './input_field'
import { Ionicons } from '@expo/vector-icons';



const LinkOverlay = (props) =>{

    const refDescriptionLink = useRef("");
    const refLink = useRef("");
    const [linkState,setLinkState]=useState("");
    const [linkDescriptionState,setLinkDescriptionState]=useState("");

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Empty Field",
      "Please fill up all the reqiured fields",
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    const AddLink = () =>{
        if(refDescriptionLink.current && refLink.current){
            
            props.link["linkCoverName"]=refDescriptionLink.current
            props.link[refDescriptionLink.current]=refLink.current
            console.log(props.link)

            props.closePopUp()
        }
        else{
            createTwoButtonAlert()
        }
        
    }

    return(
        <View style={{flex:1}}>
            <ScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode="on-drag" >
               
            <View style={styles.fieldSet}>
                    <Text style={styles.legend}>AddLink </Text>
                    <InputField inputRef={refDescriptionLink} placeHolder={"Link Description"}></InputField>
               
                    <InputField inputRef={refLink} placeHolder={"Link"}></InputField>
               </View>
              


             
               </ScrollView>

               <TouchableOpacity 
                style={styles.buttonStyle} 
                onPress={AddLink}>
                <Ionicons name="ios-add-circle" size={50} color="black" />
               </TouchableOpacity>
              

        </View>
    )
}

const styles = StyleSheet.create({

    fieldSet:{
        margin: 10,
       
        paddingBottom: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#000',
       
        
    },
    legend:{
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: '#FFFFFF'
    },
    buttonStyle:{
        alignItems: 'center',

    }
})

export default LinkOverlay