import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import MyHeader from './components/header/MyHeader';
import MyDrawerContent from './components/header/MyDrawerContent';
import MainScreen from './components/screens/MainScreen';
import SettingsScreen from './components/screens/SettingsScreen';

const Stack1 = createStackNavigator(
  {
    Stack1: {
      screen: MainScreen,
      navigationOptions: {
        title: "Main",
        header: MyHeader
      }
    },
  }
)

const Stack2 = createStackNavigator(
  {
    Stack1: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        header: MyHeader
      }
    },
  }
)

const Drawer = createDrawerNavigator(
  {
    Main: {screen:Stack1},
    Settings: {screen:Stack2},
  },
  {
    initialRouteName: 'Main',
    contentComponent: MyDrawerContent
  }
);

const App: React.FC = () => {
  const Layout = createAppContainer(Drawer);
  return (
    <Layout />
  )
}
export default App