

import React, { useState } from "react";
import { View } from "react-native";
import { Text, ButtonGroup, CheckBox, Divider } from "react-native-elements";
import { createStackNavigator } from 'react-navigation-stack';
import MyHeader from '../header/MyHeader'
import useTwitterAndFirebaseAuth from "../hooks/useTwitterAndFirebaseAuth";
import TwitterAvatar from "../parts/TwitterAvatar";
import TwitterLoginButton from "../parts/TwitterLoginButton";
import TwitterLogoutButton from "../parts/TwitterLogoutButton";


const MainScreen: React.FC = () => {
  const { signInChecking, signedIn } = useTwitterAndFirebaseAuth();
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      {
        signInChecking
          ?
            <View>
              <Text h2>logging in...</Text>
            </View>
          :
            signedIn
              ?
                <View>
                  <TwitterAvatar />
                  <TwitterLogoutButton />
                </View>
              :
                <TwitterLoginButton />
      }
    </View>
  );
}
const MainScreenStack = createStackNavigator(
  {
    Stack1: {
      screen: MainScreen,
      navigationOptions: {
        title: "Settings",
        header: MyHeader
      }
    },
  }
)
export default MainScreenStack;