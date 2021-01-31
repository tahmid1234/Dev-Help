const convertSecons=(seconds)=>{
    let dateObj=new Date(seconds*1000)
  
    dateObj=""+dateObj.toUTCString()

    
    
    return dateObj.substr(0,dateObj.length-13)
}
export default convertSecons