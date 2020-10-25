import React, { useState, useEffect, useCallback } from 'react';
import { useTwitter } from 'react-native-simple-twitter';
import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../../config';

const useTwitterAndFirebaseAuth = () => {
  // 現在認証状態の確認中か否か
  const [signInChecking, setSignInChecking] = useState<boolean>(true);
  // 現在認証済みか否か
  const [signedIn, setSignedIn] = useState<boolean>(false);
  // 現在認証済みユーザーのTwitterのデータ
  const [twitterUser, setTwitterUser] = useState<firebase.firestore.DocumentData>();
  // Twitterのユーザーデータを保存するfirestoreのコレクション名
  const twitterUserCollection = 'TwitterUser';
  // react-native-simple-twitter
  const { twitter, TWModal } = useTwitter({
    onSuccess:(user, accessToken) => {
      onTwitterLoginSuccess(user, accessToken)
    }
  });

  // 認証済みだった場合にtwitterのデータを取得してセットする関数
  const setCurrentTwitterUser = async () => {
    try{
      const user = firebase.auth().currentUser;
      if(user){
        const doc = await firebase.firestore().collection(twitterUserCollection).doc(user.uid).get();
        if(doc){
          setTwitterUser(doc.data());
          setSignInChecking(false);
          setSignedIn(true);
        }
      }else{
        setSignInChecking(false);
        setSignedIn(false);
      }
    }catch(e){
      console.log(e);
    }
  }

  // useEffect(function, []) というdepsが空の呼び方をした時は
  // このhookを使っているコンポーネントが表示される最初の一回だけ実行される
  // hook initialize
  useEffect(() => {
    // 重要！！
    let isMounted = true;
    // 重要！！
    if(firebase.apps.length===0){
      firebase.initializeApp(config.firebase);
    }
    twitter.setConsumerKey(config.twitter.apiKey, config.twitter.apiSecret);
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      // 重要！！
      // isMounted === trueのときにしかsetStateするべきではないのでsetCurrentTwitterUserも呼ぶべきではない
      if(isMounted){
        setCurrentTwitterUser();
      }
    });
    // 重要！！
    // cleanup関数を定義してreturnする
    // cleanup関数が呼ばれる時 = このhookを使っているコンポーネントが消える時
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [])

  // twitter login modal dialogを開く関数
  const toTwitterLogin = useCallback(async () => {
    try {
      setSignInChecking(true);
      setSignedIn(false);
      await twitter.login();
    } catch(e) {
      setSignInChecking(false);
      setSignedIn(false);
      console.log(e.errors);
    }
  }, []);

  // twitterへのログイン成功時に呼ばれるコールバック関数
  const onTwitterLoginSuccess = useCallback(async (user, accessToken) => {
    setSignInChecking(true);
    setSignedIn(false);
    // twitterのcredentialでfirebaseで認証する
    var credential = firebase.auth.TwitterAuthProvider.credential(accessToken.oauth_token, accessToken.oauth_token_secret);
    await firebase.auth().signInWithCredential(credential);
    // firestoreにユーザー情報をつっこむ
    const userData = Object.assign(user, accessToken);
    if(firebase.auth().currentUser){
      const uid = firebase.auth().currentUser?.uid;
      await firebase.firestore().collection(twitterUserCollection).doc(uid).set(userData, { merge: true })
      setSignInChecking(false);
      setSignedIn(true);
    }
  }, []);

  // ログアウトする関数
  const toTwitterLogout = useCallback(async () => {
    await firebase.auth().signOut();
  }, []);

  return {signInChecking, setSignInChecking, signedIn, setSignedIn, TWModal, toTwitterLogin, toTwitterLogout, twitterUser};
}

export default useTwitterAndFirebaseAuth