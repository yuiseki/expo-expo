import React, { useCallback, useEffect, useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useTwitter } from "react-native-simple-twitter";


import config from './config';
import * as firebase from 'firebase'
import 'firebase/firestore';

import MyDrawerContent from './components/header/MyDrawerContent';
import MainScreen from './components/screens/MainScreen';
import ImagesScreen from './components/screens/ImagesScreen';
import SettingsScreen from './components/screens/SettingsScreen';

const Drawer = createDrawerNavigator(
  {
    Main: {screen:MainScreen},
    Images: {screen:ImagesScreen},
    Settings: {screen:SettingsScreen},
  },
  {
    initialRouteName: 'Main',
    contentComponent: MyDrawerContent
  }
);

if(firebase.apps.length===0){
  firebase.initializeApp(config.firebase);
}

const App:React.FC = () => {
  // ログ抑止
  global.__old_console_warn = global.__old_console_warn || console.warn;
  global.console.warn = (...args) => {
    let tst = (args[0] || '') + '';
    if (tst.startsWith('Setting a timer')) {
      return;
    }
    if (tst.startsWith('Can\'t Perform a React state update')){
      return;
    }
    return global.__old_console_warn.apply(console, args);
  };

  const Layout = createAppContainer(Drawer);
  return (
    <Layout />
  )
}
export default App