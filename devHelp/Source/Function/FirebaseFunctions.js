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
     alert("Okay")
    })
}

//nested collection
const setDataCollection = (collection,docId,data) => {
  console.log(data)
  firebase.firestore().collection("queries").doc(collection).collection("likers").doc(docId).set(data).then(()=>{

  }).catch((error)=>{
   
    alert("hello")
  })
}

const updateLikeCount = ( increaseBy,postId,keyPoints,cateGoryName) =>{
  const increment = firebase.firestore.FieldValue.increment(increaseBy);
  console.log(postId,cateGoryName,keyPoints)
  firebase.firestore().collection("all").doc(postId).update({ likes: increment })
  firebase.firestore().collection(keyPoints).doc(postId).update({ likes: increment })
  firebase.firestore().collection(cateGoryName).doc(postId).update({ likes: increment })
}

const getLikeCounts = async( collection,docId,setCollection,isMounted) =>{
  firebase
  .firestore()
  .collection("queries").doc(collection).collection("likers").doc(docId)
  .onSnapshot(docSnapshot => {
    if(docSnapshot.exists && isMounted){
        setCollection(docSnapshot.data()["likes"])
        
    }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
  

}



export {getData1Collection,getLikeCounts,setDataCollection,updateLikeCount,updateCount};