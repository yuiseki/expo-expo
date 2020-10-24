import React from "react"
import { Header, Icon } from "react-native-elements"
import { DrawerActions } from "react-navigation-drawer"
import { StackHeaderProps, StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types"


interface MyStackNavigationProp {
  navigation: StackNavigationProp;
}

const HamburgerMenu:React.FC<MyStackNavigationProp> = ({
  navigation
}:MyStackNavigationProp) => {
  return (
    <Icon
      color="#fff"
      name="menu"
      onPress={() =>{
          navigation.dispatch(
            DrawerActions.openDrawer()
          )
        }
      }
    />
  )
}

const MyHeader:React.FC<StackHeaderProps> = ({
  navigation,
}:StackHeaderProps) => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={navigation} />}
      centerComponent={{ text: 'expo-expo', style: { color: '#fff' } }}
    />
  )
}
export default MyHeader;