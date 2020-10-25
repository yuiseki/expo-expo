import React from 'react';
import useTwitterAndFirebaseAuth from '../hooks/useTwitterAndFirebaseAuth';
import {View} from 'react-native';
import {Text, Avatar, Badge } from 'react-native-elements';

const TwitterAvatar:React.FC = () => {
  const { twitterUser } = useTwitterAndFirebaseAuth();
  return (
    <View>
      <Avatar
        rounded
        size="large"
        source={{
          uri:twitterUser?.profile_image_url_https
        }}
      />
      <Badge
        status="success"
        value={twitterUser?.screen_name}
        containerStyle={{ position: 'absolute', top: 0, right: 5 }}
      />
    </View>
  )
}
export default TwitterAvatar;