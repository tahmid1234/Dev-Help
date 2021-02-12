import * as firebase from 'firebase'
import "firebase/firestore";
import {AuthContext} from '../provider/AuthProvider'

const getData1Collection = async(collection,setCollection,setLoading) =>{
  
    setLoading(true)
    firebase
    .firestore()
    .collection(collection)
    .orderBy("created_at", "desc")
    .onSnapshot((querySnapshot) => {
      let temp_posts = [];
      let i=0
      querySnapshot.forEach((doc) => {
          i=i+1
        temp_posts.push({
          id: doc.id,
          data: doc.data(),
          
        });
      });
      setCollection(temp_posts);
      //console.log("Tempooooooo")
      //console.log(temp_posts)
      
      setLoading(false);
    }, err => {
        alert(err)
        console.log(`Encountered error: ${err}`);
      });
    
}

//update value by 1-> simple

const updateCount = (collection,docId,increaseBy) =>{
    const increment = firebase.firestore.FieldValue.increment(increaseBy);
    firebase.firestore().collection(collection).doc(docId).update({ count: increment }).then().catch((error)=>{
      firebase.firestore().collection(collection).doc(docId).set({ count: increment })
     
    })
}

//nestedCollection with add
const addDataCollection = (collection1,docId1,collection2,data) => {
  firebase.firestore().collection(collection1).doc(docId1).collection(collection2).add(data).then().catch((err)=>{alert(err)})

}

//nested collection with set
const setDataCollection = (rootCollection,collection,docId,data) => {
 
  console.log("SET DATA COLLECTION")
  firebase.firestore().collection(rootCollection).doc(collection).collection("likers").doc(docId).set(data).then(()=>{

  }).catch((error)=>{
   
    alert("hello")
  })
}

const updatePostReactionCount = ( increaseBy,postId,keyPoints,cateGoryName) =>{
  const increment = firebase.firestore.FieldValue.increment(increaseBy);
  console.log(postId,cateGoryName,keyPoints)
  firebase.firestore().collection("all").doc(postId).update({comments:increaseBy})
  firebase.firestore().collection(keyPoints).doc(postId).update({comments:increaseBy})
  firebase.firestore().collection(cateGoryName).doc(postId).update({comments:increaseBy})
}

const updateLikeCount = ( increaseBy,postId,keyPoints,cateGoryName) =>{
  const increment = firebase.firestore.FieldValue.increment(increaseBy);
  console.log(postId,cateGoryName,keyPoints)
  firebase.firestore().collection("all").doc(postId).update({ likes: increment })
  firebase.firestore().collection(keyPoints).doc(postId).update({ likes: increment })
  firebase.firestore().collection(cateGoryName).doc(postId).update({ likes: increment })
}
//single collection get
const getSingleCollectionData = async( collection,docId,setCollection,isMounted,key="count") =>{
  firebase
  .firestore()
  .collection(collection).doc(docId)
  .onSnapshot(docSnapshot => {
    if(docSnapshot.exists && isMounted){
        setCollection(docSnapshot.data()[key])
        
    }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
}

//nested Collection
const getLikeCounts = async( rootCollection,collection,docId,setCollection,isMounted) =>{
  firebase
  .firestore()
  .collection(rootCollection).doc(collection).collection("likers").doc(docId)
  .onSnapshot(docSnapshot => {
    if(docSnapshot.exists && isMounted){
       
        setCollection(docSnapshot.data()["likes"])
        
    }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
}

//nested collection get without doc
const getDoubleCollectionData = async (collection1,docId,collection2,setCollection,setLoading,setListCount) => {
  setLoading(true)
  console.log("collectionsss")
  console.log(collection1,collection2,docId)
  firebase.firestore().collection(collection1)
                    .doc(docId).collection(collection2)
                    .orderBy("created_at", "desc")
                    .onSnapshot ((querySnapshot) => {
                      let temp_posts = [];
                    
                      querySnapshot.forEach((doc) => {
                       
                        temp_posts.push({
                          id: doc.id,
                          data: doc.data(),
                          
                        });
                      });
                      setCollection(temp_posts);
                      setListCount(temp_posts.length)
                      console.log("Tempooooooo")
                      //console.log(temp_posts)
                      
                      setLoading(false);
                    }, err => {
                        alert(err)
                        console.log(`Encountered error: ${err}`);
                        setLoading(false);
                      });
}

const simpleCollectionSet= (collection,docId,value) =>{
  firebase.firestore().collection(collection).doc(docId).set({ count: value })
}


//single collection get all data similar to getSingleCollectionData() this two functions are to be merged
const getSingleCollectionAllData = async( collection,docId,setCollection,isMounted) =>{
  firebase
  .firestore()
  .collection(collection).doc(docId)
  .onSnapshot(docSnapshot => {
    if(docSnapshot.exists && isMounted){
        setCollection(docSnapshot.data())
        console.log(docSnapshot.data())
        
    }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
}



export {getData1Collection,getLikeCounts,setDataCollection,updateLikeCount,updateCount,addDataCollection,getDoubleCollectionData,getSingleCollectionData,simpleCollectionSet,updatePostReactionCount,getSingleCollectionAllData};