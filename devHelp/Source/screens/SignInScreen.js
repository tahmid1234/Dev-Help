import React, { useState } from "react";
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import { Input, Button } from "react-native-elements";
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import {AuthContext} from "../provider/AuthProvider"
import {AuthCard} from '../shareable/customCard'

import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeDataJSON} from '../Function/AsyncStorageFunction'
import * as firebase from 'firebase'
import { useScreens } from "react-native-screens";


const SignInScreenActivity=(props) =>{
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    console.log("bolefellooooooooooo")
    return(
        <AuthContext.Consumer>
            {(auth) => (
              
                <View style={styles.viewStyle}>
                    {console.log("hahahahahahahahahah")}
                    {
                    console.log(auth)}
                   
                    <AuthCard  >
                   

                        <Text style={styles.titleView}>Welcome to Dev-Help !</Text>
                        <Text style={styles.subTitleView}>A developer's community</Text>

                       
                        
                        <Input

                            inputStyle={styles.themeColor}
                            leftIcon={<Fontisto name="email" size={24} color="#000" />}
                            placeholder="E-mail Address"
                            placeholderTextColor="#777"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                          }}
                        />

                        <Input
                            inputStyle={styles.themeColor}
                            placeholder="Password"
                            placeholderTextColor="#777"
                            leftIcon={<Feather name="key" size={24} color="#000" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <View style={styles.buttonView}>
                        <Button
                                    color="#fc6a03"
                                    icon={<Entypo name="login" size={24} color='white' />}
                                    title="  Sign In!"
                                    buttonStyle={styles.buttonView}
                                    onPress={()=>{
                                         firebase.auth().signInWithEmailAndPassword(Email,Password)
                                        .then((usersCreds)=>{
                                            
                                            auth.setCurrentUser(usersCreds.user)
                                            global.userInfo=usersCreds.user
                                            storeDataJSON("devHelper",usersCreds.user)
                                            auth.setIsLoggedIn(true);
                                            
                                        })
                                        .catch((error)=>{
                                            alert(error)
                                        })
                                    }}
                                   
                                    
                                    />
                        </View>
                        <Button
                                    type="clear"
                                    icon={<AntDesign name="user" size={24} color="#000" />}
                                    title="Don't Have An Account?"
                                    titleStyle={styles.themeColor}
                                    onPress={function(){
                                        props.navigation.navigate("SignUp");
                                    }}
                                   
                                    />

                                

                    </AuthCard>
                    
                    
                </View>
             
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: "center",
     
    },
    buttonView:{
        
       
        marginLeft:"2%",
        marginRight:"2%",
        backgroundColor:"#000",
        
        
    
    },
    themeColor:{

        color:"#000"
    },
    titleView:{

        color:"#000",
        fontSize:23,
        marginLeft:"17%",
       
        justifyContent:"center",
        fontFamily:'sans-serif-medium',
        
        

    },
    subTitleView:{

        color:"#000",
        fontSize:13,
        marginLeft:"30%",
        marginBottom:"4%",
        justifyContent:"center",
        
        fontStyle:"italic"
        
        

    }
    
   
  });

export default SignInScreenActivity;