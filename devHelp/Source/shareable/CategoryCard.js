import React from 'react'
import {StyleSheet,View,Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {  Circle, Text as SvgText, TextPath, TSpan, G, Svg }
  from 'react-native-svg';

const CategoryCard = ( props)=>{
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
        <View>
        
        <AntDesign name="CodeSandbox"   size={40} color="black" style={{ height: 320, width: 120, borderRadius: 60,
              marginTop: 90,marginHorizontal:81, }}/>
        </View>
        
       
         </View> 
       

        </View>
    )
}

const style= StyleSheet.create({
    categoryCard:{
        borderRadius:9,
        marginLeft:20,
        marginRight:20,
        borderColor:"#000",
        marginTop:5,
        backgroundColor:"#000",
        marginBottom:20,
        height:120,
        borderWidth:1,
        

    }
})

export default CategoryCard;