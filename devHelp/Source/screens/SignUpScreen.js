import React, { useState } from "react";
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import { Input, Button } from "react-native-elements";
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import {AuthContext} from "../provider/AuthProvider"
import {AuthCard} from '../shareable/customCard'
import * as firebase from 'firebase'
import "firebase/firestore";


const SignUpScreenActivity=(props) =>{
    const [Name, setName] = useState("");
    const [PROFESSION, setPROFESSION] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        
                <View style={styles.viewStyle}>
                   
                    <AuthCard  >
                   

                        <Text style={styles.titleView}>Welcome to Dev-Help !</Text>
                        <Text style={styles.subTitleView}>A developer's community</Text>
                        <Input
                             inputStyle={styles.themeColor}
                            leftIcon={<Ionicons name="ios-person" size={24} color="#000"/>}
                            placeholder="Name"
                            placeholderTextColor="#777"
                            onChangeText={function (currentInput) {
                                setName(currentInput);
                            }}
                            />

                        <Input
                                inputStyle={styles.themeColor}
                                placeholderTextColor="#777"
                                leftIcon={<AntDesign name="profile" size={24} color="#000" />}
                                placeholder="Profession"
                                onChangeText={function (currentInput) {
                                    setPROFESSION(currentInput);
                                }}
                                /> 
                       
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
                                    color="#000"
                                    icon={<AntDesign name="user" size={24} color='white' />}
                                    title="  Sign Up!"
                                    buttonStyle={styles.buttonView}
                                    onPress={()=>{
                                        if(Name && PROFESSION && Email && Password){
                                            firebase.auth().createUserWithEmailAndPassword(Email,Password)
                                            .then((userCreds)=>{
                                               
                                                userCreds.user.updateProfile({displayName:Name});
                                                firebase
                                                .firestore()
                                                
                                                .collection('users')
                                                .doc(userCreds.user.uid).set({
                                                    name:Name,
                                                    profession:PROFESSION,
                                                    email:Email,
                                                }).then(()=>{
                                                    console.log("lklk")
                                                    alert(userCreds.user.uid+"Account created successfully!")
                                                    props.navigation.navigate("SignIn")
                                                }).
                                                catch((error)=>{
                                                    alert(error)
                                                });
                                            }).catch((error)=>{
                                                alert(error)
                                            })

                                        }
                                        else{
                                            alert('Files can not be empty')
                                        }
                                    }}
                                   
                                    
                                    />
                        </View>
                        <Button
                                    type="clear"
                                    icon={<Entypo name="login" size={24} color="#000" />}
                                    
                                    title=" Already have an account"
                                    titleStyle={styles.themeColor}
                                    onPress={function(){
                                        props.navigation.navigate("SignIn");
                                    }}
                                   
                                    />

                                

                    </AuthCard>
                    
                    
                </View>
            
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
        
        fontStyle:"italic"}
    
   
  });

export default SignUpScreenActivity;