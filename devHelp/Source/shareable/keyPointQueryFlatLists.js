import React ,{useState,useEffect} from 'react'
import { TouchableOpacity ,StyleSheet} from 'react-native'
import {View,Text,FlatList,SafeAreaView} from 'react-native'
import {getData1Collection} from '../Function/FirebaseFunctions'
import {KeyPointQueryCard} from './customCard'
import convertSecons from '../Function/SeconsToUtcDate'

const KeyPointQueryFlatList = (props) =>{
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    
   

    const loadQueries = async () => {
    if(props.keyPoints)
    await getData1Collection(props.keyPoints,setQueries,setLoading)
  };

  useEffect( ()=>{
      let isMounted = true
      if(isMounted){
        console.log("Helllo man")
        console.log(props.keyPoints)
          loadQueries()
      }
      return ( ()=>{isMounted=false})
  },[props.keyPoints])

  return (
      <View style={{flex:1}}>
          {queries.length?<View>
          <View style={styles.headerStyle}><Text style={styles.headerStyle}>Similar Questions</Text></View>
          
          <FlatList 
           nestedScrollEnabled={true}         
            data={queries}
            extraData={queries}           
            renderItem={function({ item } ){
             
             
             
              return (
                <TouchableOpacity   onPress={()=>{

                    let query = item
                    let postDate = convertSecons(item.data.created_at.seconds)
                    props.nav.navigation.navigate("IndivialPost",  {query,postDate} );}}>
                <KeyPointQueryCard>
                    <View style={{flexDirection:"row",paddingRight:50}}>
                        <View style={styles.answerCountStyle}>
                            <Text style={styles.textStyle}>{item.data.comments}</Text>
                            <Text style={styles.textStyle}>answers</Text>

                        </View>
                        <View  >
                            <Text style={{color:"#208",fontSize:13,fontWeight:"bold"}}>{item.data.title} </Text>
                            <Text numberOfLines={2} style={{fontSize:11.5,padding:3}}>{item.data.body}</Text>
                        </View>
                        
                    </View>

                 </KeyPointQueryCard>
                </TouchableOpacity>
                  
                 )
          }}
          
           
             />
             </View>:null}
            

      </View>
  )

}

const styles = StyleSheet.create({
    answerCountStyle:{
        height:40,
        width:40,
        borderRadius:10,
        backgroundColor:"#208",
        alignItems: 'center',
        marginRight:10,
        padding:2
        


    },
    textStyle:{
        color:"#fff",
        fontSize:8.9
    },
    headerStyle:{
        marginHorizontal:10,
        
        alignItems:'center',
        backgroundColor:"#dedede",
        borderRadius:5,
        marginTop:10,
        paddingBottom:4
    }

    
})

export default KeyPointQueryFlatList