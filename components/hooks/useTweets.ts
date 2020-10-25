import React, { useEffect, useState } from 'react';
import { useTwitter } from 'react-native-simple-twitter';
import config from '../../config';
import useTwitterAndFirebaseAuth from './useTwitterAndFirebaseAuth';

const useTweets = () => {
  const { twitterUser } = useTwitterAndFirebaseAuth();
  const [tweets, setTweets] = useState([]);
  // react-native-simple-twitter
  const { twitter } = useTwitter();

  useEffect(() => {
    if(twitterUser){
      twitter.setConsumerKey(config.twitter.apiKey, config.twitter.apiSecret);
      twitter.setAccessToken(twitterUser.oauth_token, twitterUser.oauth_token_secret);
      const path = "/statuses/user_timeline.json";
      const params = {screen_name: twitterUser.screen_name};
      twitter.api("GET", path).then(async (res) => {
        setTweets(res);
      }).catch((e)=>{
        console.log(e);
      });
    }
  }, [twitterUser]);

  return { tweets };
}
export default useTweets;