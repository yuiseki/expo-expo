import React, { useState, useEffect } from "react";
import { View, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { ButtonGroup, Image, Badge } from "react-native-elements";
import { createStackNavigator } from 'react-navigation-stack';
import MyHeader from '../header/MyHeader';
import useTwitterAndFirebaseAuth from "../hooks/useTwitterAndFirebaseAuth";


const ImagesScreen: React.FC = () => {
  // 画像一覧のレイアウトのためのデータ
  const [imageNumIdx, setImageNumIdx] = useState<number>(3);
  const windowWidth = Dimensions.get('window').width;
  const [imageSize, setImageSize] = useState<number>(windowWidth/4);
  // imageNumが選択されたらimageSizeを設定しなおすEffect
  const imageNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  useEffect(()=>{
    const imageNum = parseInt(imageNums[imageNumIdx]);
    setImageSize(windowWidth/imageNum);
  }, [imageNumIdx]);

  // Twitter関連のデータ
  const { twitterUser } = useTwitterAndFirebaseAuth();
  const icon = twitterUser?.profile_image_url_https;


  const imagesArray = new Array(300).fill(0);

  return (
    <View style={{flex:1, alignItems:'center'}}>
      <ButtonGroup
        onPress={(i)=>{
            setImageNumIdx(i)
        }}
        selectedIndex={imageNumIdx}
        buttons={imageNums}
        containerStyle={{height: 40}}
      />
      <ScrollView>
        <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
          {
            imagesArray.map((value, i) => {
              return (
                <View style={{ width: imageSize, height: imageSize }} key={i}>
                  <Image
                    source={{ uri: icon }}
                    style={{ width: imageSize, height: imageSize }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}
const ImagesScreenStack = createStackNavigator(
  {
    Stack1: {
      screen: ImagesScreen,
      navigationOptions: {
        title: "Images",
        header: MyHeader
      }
    },
  }
)
export default ImagesScreenStack;