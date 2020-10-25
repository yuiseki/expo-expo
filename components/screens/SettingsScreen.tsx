import React, { useState } from "react";
import { View } from "react-native";
import { Text, ButtonGroup, CheckBox, Divider } from "react-native-elements";
import { createStackNavigator } from 'react-navigation-stack';
import MyHeader from '../header/MyHeader'

const SettingsScreen: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const buttons = ['What', 'the', 'fuck'];

  const [checked, setChecked] = useState<boolean>(false);
  
  return (
    <View style={{flex:1, alignItems:'flex-start'}}>
      <Text h3 style={{marginLeft:10}}>Settings</Text>
      <Divider style={{
        backgroundColor: 'black',
        margin:10,
        height:5,
        }}
      />
      <Text h4 style={{marginLeft:10}}>What the fuck?</Text>
      <ButtonGroup
        onPress={(i)=>{
          setSelectedIdx(i)
        }}
        selectedIndex={selectedIdx}
        buttons={buttons}
        containerStyle={{height: 40}}
      />
      <Divider style={{
        backgroundColor:'black',
        margin:10,
        height:5,
        }}
      />
      <Text h4 style={{marginLeft:10}}>Check?</Text>
      <CheckBox
        title='Check Me'
        checked={checked}
          onPress={()=>{
          setChecked(!checked)
            }}
          />
    </View>
  );
}
const SettingsScreenStack = createStackNavigator(
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
export default SettingsScreenStack;