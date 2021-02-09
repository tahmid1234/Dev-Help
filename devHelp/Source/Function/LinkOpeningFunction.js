import * as WebBrowser from 'expo-web-browser'

//rename this function with proper name,but first do refractor

const _handleOpenWithWebBrowserUbuntuPastebin = (link) => {

  

  try {
    console.log(link)
    WebBrowser.openBrowserAsync(link);
    
  } catch (error) {
    alert("This link is broken")
  }
    
  };

  export {_handleOpenWithWebBrowserUbuntuPastebin}