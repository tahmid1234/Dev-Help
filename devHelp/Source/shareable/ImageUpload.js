import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform ,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Avatar, Accessory } from 'react-native-elements';

const ImagePickerExample=() =>{

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  

  return (
    <View>
      <Avatar
            size="xlarge"
            
            onPress={function(){
              pickImage()
            }}
            rounded 
            source={{
              
              uri: image 
                 }}
                />
   
  
   
   </View>
  );
}

export default  ImagePickerExample