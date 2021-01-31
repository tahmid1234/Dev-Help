import React from 'react'
import {Text,Button,View,StyleSheet} from 'react-native'
import ImagePickerExample from  '../shareable/ImageUpload'
import ScreenHeader from '../shareable/ScreenHeader'
import {AuthContext} from '../provider/AuthProvider'
import {PostCard} from '../shareable/customCard'

const ProfileScreenActivity=(props)=>{
    return(
        <AuthContext.Consumer>
        {(auth) => (
       <View style={{flex:1}}> 
            <ScreenHeader props ={props} ></ScreenHeader>
           
            
            <View style={{justifyContent:"center",marginHorizontal:125,marginVertical:40}}>
            <ImagePickerExample props={props} />
           
            </View>
            
                <PostCard>
                <View style={{backgroundColor:"#5730a" ,height:250,borderColor:"#003",borderWidth:2}}>
               
                <Text style={styles.nameSyle}>{auth.CurrentUser.name} </Text>
                <Text style={styles.profileInfoStyle} >Mr {auth.CurrentUser.displayName} </Text>
                <Text style={styles.profileInfoStyle}>Works at Dunder Mifflin Paper Company</Text>
                <Text style={styles.profileInfoStyle} >Scranton Branch</Text>
                </View>
                </PostCard>
            

       </View>
        )}
        </AuthContext.Consumer>
    )
}

const styles=StyleSheet.create({
    buttonView:{
        marginLeft:30,
        marginRight:30,
        marginVertical:15,
        
       

        
    },

    nameSyle:{
        fontFamily:"serif",
        fontSize:25,
        color:"#003" ,
        marginHorizontal:120
    },
    profileInfoStyle:{
        fontFamily:"serif",
        fontSize:20,
        color:"#003" ,
        marginHorizontal:30,
        marginVertical:12
    }
}
);

export default ProfileScreenActivity