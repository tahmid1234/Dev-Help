import * as WebBrowser from 'expo-web-browser'



const _handleOpenWithWebBrowserUbuntuPastebin = (link) => {
    console.log("Whats up")
    WebBrowser.openBrowserAsync(link);
  };

  export {_handleOpenWithWebBrowserUbuntuPastebin}