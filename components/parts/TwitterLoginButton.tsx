import React from 'react';
import useTwitterAndFirebaseAuth from '../hooks/useTwitterAndFirebaseAuth';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

const TwitterLoginButton:React.FC = () => {
  const { TWModal, toTwitterLogin } = useTwitterAndFirebaseAuth();
  return (
    <View>
      <Text h2 onPress={toTwitterLogin}>login</Text>
      <TWModal />
    </View>
  )
}
export default TwitterLoginButton;