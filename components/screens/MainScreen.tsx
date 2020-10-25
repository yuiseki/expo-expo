

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, ListItem, ButtonGroup, CheckBox, Divider, Avatar } from "react-native-elements";
import { createStackNavigator } from 'react-navigation-stack';
import MyHeader from '../header/MyHeader'
import useTweets from "../hooks/useTweets";
import useTwitterAndFirebaseAuth from "../hooks/useTwitterAndFirebaseAuth";
import TwitterAvatar from "../parts/TwitterAvatar";
import TwitterLoginButton from "../parts/TwitterLoginButton";
import TwitterLogoutButton from "../parts/TwitterLogoutButton";


const MainScreen: React.FC = () => {
  const { signInChecking, signedIn } = useTwitterAndFirebaseAuth();
  const { tweets } = useTweets();
  return (
    <View>
      {
        signInChecking
          ?
            <View>
              <Text h2>logging in...</Text>
            </View>
          :
            signedIn
              ?
                <ScrollView>
                  <View>
                    {
                      tweets.map((tweet, i) => {
                        return (
                          tweet.retweeted
                            ?
                              <ListItem key={i}>
                                <Avatar
                                  source={{uri:tweet.retweeted_status.user.profile_image_url_https}}
                                />
                                <ListItem.Content>
                                  <Text>{tweet.retweeted_status.text}</Text>
                                </ListItem.Content>
                              </ListItem>
                            :
                              <ListItem key={i}>
                                <Avatar
                                  source={{uri:tweet.user.profile_image_url_https}}
                                />
                                <ListItem.Content>
                                  <Text>{tweet.text}</Text>
                                </ListItem.Content>
                              </ListItem>
                        )
                      })
                    }
                  </View>
                </ScrollView>
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