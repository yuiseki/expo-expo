import React from 'react';
import useTwitterAndFirebaseAuth from '../hooks/useTwitterAndFirebaseAuth';
import {View} from 'react-native';
import {Text} from 'react-native-elements';

const TwitterLogoutButton:React.FC = () => {
  const { toTwitterLogout } = useTwitterAndFirebaseAuth();
  return (
    <View>
      <Text h2 onPress={toTwitterLogout}>logout</Text>
    </View>
  )
}
export default TwitterLogoutButton;