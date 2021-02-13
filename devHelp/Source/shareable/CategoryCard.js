import React,{useState} from 'react'
import {StyleSheet,View,Image,TouchableOpacity,ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {  Circle, Text as SvgText, TextPath, TSpan, G, Svg } from 'react-native-svg';
import { Touchable } from 'react-native';
import {  Overlay } from 'react-native-elements';
import KeyPointSimilarPost from './keyPointsSimilarPost'

const CategoryCard = ( props)=>{
  const [displayPopup,setDisplayPopup] = useState(false)

    //allow to pop up
    const toggleLinkOverlay = () => {
       setDisplayPopup(!displayPopup);
    };


    return(
        <View style={style.categoryCard}>
            <View style={{marginHorizontal:85, marginBottom:50}}>
             <Svg position="absolute" height="200" width="200"
          viewBox="0 0 300 300" >
          <G id="circle">
            <Circle
              r={45}
              x={150}
              y={176}
              fill="white"
              stroke="#fff"
              strokeWidth={2}
              transform="rotate(-145)"
              
            >
                 <FontAwesome name="cubes" size={25} color="black" />
            </Circle>
             
          </G>
          <SvgText fill="#fff" fontSize="15" fontFamily="serif">
            <TextPath href="#circle">
              <TSpan dx={props.dx} dy={props.dy}>
                {props.categoryName}
              </TSpan>
            </TextPath>
          </SvgText>
         
        </Svg>
        <TouchableOpacity 
          onPress={toggleLinkOverlay}>
            <View  >
          
                <MaterialCommunityIcons name="briefcase-search"   size={40} color="black" style={{ height: 320, width: 120, borderRadius: 60,
                  marginTop: 90,marginHorizontal:81, }}/>
            </View>
        </TouchableOpacity>

        <Overlay isVisible={displayPopup} onBackdropPress={toggleLinkOverlay} overlayStyle={{width:300,height:350,position: 'absolute',}}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
          <KeyPointSimilarPost  nav={props.props}  keyPoin1={""} keyPoin2={""} keyPoin3={""}/>  
          </ScrollView>              
        </Overlay>
        
       
         </View> 
       

        </View>
    )
}

const style= StyleSheet.create({
    categoryCard:{
        borderRadius:9,
        marginLeft:"5%",
        marginRight:"5%",
        borderColor:"#000",
        marginTop:"1.3%",
        backgroundColor:"#000",
        marginBottom:20,
        height:"15.75%",
        borderWidth:1,
        

    }
})

export default CategoryCard;