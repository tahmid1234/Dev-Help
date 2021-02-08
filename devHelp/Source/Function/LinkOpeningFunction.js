import * as WebBrowser from 'expo-web-browser'

//rename this function with proper name,but first do refractor

const _handleOpenWithWebBrowserUbuntuPastebin = (link) => {
    console.log(link)
    WebBrowser.openBrowserAsync(link);
  };

  export {_handleOpenWithWebBrowserUbuntuPastebin}