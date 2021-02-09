import React, { useState } from "react";
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import { Input, Button } from "react-native-elements";
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import {AuthContext} from "../provider/AuthProvider"
import {AuthCard} from '../shareable/customCard'

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase'
import { useScreens } from "react-native-screens";


const SignInScreenActivity=(props) =>{
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        <AuthContext.Consumer>
            {(auth) => (
              
                <View style={styles.viewStyle}>
                   
                    <AuthCard  >
                   

                        <Text style={styles.titleView}>Welcome to Office !</Text>

                       
                        
                        <Input

                            inputStyle={styles.themeColor}
                            leftIcon={<Fontisto name="email" size={24} color="#fc6a03" />}
                            placeholder="E-mail Address"
                            placeholderTextColor="#fc6a03"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                          }}
                        />

                        <Input
                            inputStyle={styles.themeColor}
                            placeholder="Password"
                            placeholderTextColor="#fc6a03"
                            leftIcon={<Feather name="key" size={24} color="#fc6a03" />}
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
                                            console.log("Lets seee")
                                            console.log(usersCreds.user)
                                            auth.setIsLoggedIn(true);
                                            auth.setCurrentUser(usersCreds.user)
                                        })
                                        .catch((error)=>{
                                            alert(error)
                                        })
                                    }}
                                   
                                    
                                    />
                        </View>
                        <Button
                                    type="clear"
                                    icon={<AntDesign name="user" size={24} color="#fc6a03" />}
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
        
       
        marginLeft:5,
        marginRight:5,
        backgroundColor:"#fc6a03",
        
        
    
    },
    themeColor:{

        color:"#fc6a03"
    },
    titleView:{

        color:"#fc6a03",
        fontSize:23,
        marginLeft:60,
        marginVertical:15,
        justifyContent:"center",
        fontFamily:'sans-serif-medium',
        
        

    }
    
   
  });

export default SignInScreenActivity;