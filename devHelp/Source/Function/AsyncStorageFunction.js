import AsyncStorage from '@react-native-async-storage/async-storage';



const storeDataJSON = async (key, value) => {
  try {
   
    const jsonValue = JSON.stringify(value);
   
    await AsyncStorage.setItem(key, jsonValue);
    
  } catch (error) {
    alert(error);
  }
};


const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    
    if (data != null) {
      const jsonData = JSON.parse(data);
     
     
      return jsonData;
    } else {
      return false
      
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    
  } catch (error) {
    alert(error);
  }
};

export { storeDataJSON, getDataJSON, removeData };