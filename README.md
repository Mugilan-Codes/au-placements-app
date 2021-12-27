# Placements App

## React Native App

- [Backend API](https://github.com/Mugilan-Codes/placements-api)

### TODO

- clear this warning --> Require cycle: App/config/index.js -> App/config/customApi.js -> App/store/store.js -> App/store/slices/authSlice.js -> App/api/index.js -> App/api/helper.js -> App/config/index.js
- proper authentication
  - log out
  - use refresh tokens to get new access tokens in expiry
- Use Refresh Tokens to stop logging out often
- Add App Icon and Splash Screen
  - [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen)
  - [How to Easily Configure Launch Icons in React Native — Android & iOS](https://medium.com/react-native-training/how-to-easily-configure-launch-icons-in-react-native-android-ios-2e1f351496ed)
  - [react-native-make](https://github.com/bamlab/react-native-make)
  - [Designing Adaptive Icons](https://medium.com/google-design/designing-adaptive-icons-515af294c783)
  - [Building a splash screen in React Native](https://blog.logrocket.com/building-a-splash-screen-in-react-native/)
  - [How to add an app icon in a React Native Android app](https://amanhimself.dev/blog/app-icon-react-native-android/)
  - [Build Icon App](https://buildicon.netlify.app/)
  - [Make App Icon](https://makeappicon.com/) - Not Working
  - [App icon Generator](https://appicon.co/)
- Add a bookmark feature to save listings
- Reduce Load Time and add Loading Screens.
- [Create global loader using context API in react native](https://medium.com/@jaythummar85/create-global-loader-using-context-api-in-react-native-4f5875c96472)
- [Create Color Palletes](https://coolors.co/)
- Styled Components
  - [Use theme inside custom component style](https://github.com/callstack/react-native-paper/issues/1837)
  - [The styled-components Happy Path - My personal suite of “best practices”](https://www.joshwcomeau.com/css/styled-components/)
  - [Styling your React Native App with Styled-Components](https://javascript.plainenglish.io/styling-your-react-native-app-with-styled-components-6939afde3d2f)
  - [A Comparison of Three Methods for Styling Components in React Native](https://blog.echobind.com/a-comparison-of-three-methods-for-styling-components-in-react-native-88ece2fdcdea)

#### DOCS

- [About React.cloneElement](https://medium.com/trabe/advanced-composition-in-react-cloneelement-hocs-and-renderprops-a20971aec50e)
- [Styled Components Basics](https://styled-components.com/docs/basics)
- [day.js package](https://github.com/iamkun/dayjs)
- Theming
  - [How to Add Support for Dark and Light Themes in React Native with Crowdbotics](https://blog.crowdbotics.com/how-to-add-support-for-dark-and-light-themes-in-react-native-apps/)
  - [Designing a UI with custom theming using react-native-paper](https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/)
  - [Theming](https://callstack.github.io/react-native-paper/theming.html)
  - [Theming with React Navigation](https://callstack.github.io/react-native-paper/theming-with-react-navigation.html)
- To use local instance of node api from docker. `adb -s <device_name> reverse tcp:3000 tcp:3000`
