import AsyncStorage from '@react-native-async-storage/async-storage';



const storeDataJSON = async (key, value) => {
  try {
   
    const jsonValue = JSON.stringify(value);
    console.log(key)
    await AsyncStorage.setItem(key, jsonValue);
    //alert("Data STored Successfully!"+key);
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
      ///alert("No data with this key!"+key);
      return ""
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    alert("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};

export { storeDataJSON, getDataJSON, removeData };