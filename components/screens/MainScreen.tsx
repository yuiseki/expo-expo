import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { ButtonGroup, Image, Badge } from "react-native-elements";

const MainScreen: React.FC = () => {
  const [imageNumIdx, setImageNumIdx] = useState<number>(3);
  const windowWidth = Dimensions.get('window').width;
  const [imageSize, setImageSize] = useState<number>(windowWidth/4);
  const [checked, setChecked] = useState<boolean>(false);
  const icon = "https://pbs.twimg.com/profile_images/1262258309479858176/XDn-m3DI_400x400.jpg";

  const imagesArray = new Array(300).fill(0);
  const imageNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  useEffect(()=>{
    const imageNum = parseInt(imageNums[imageNumIdx]);
    setImageSize(windowWidth/imageNum);
  }, [imageNumIdx]);

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
                  <Badge
                    status="success"
                    value={i}
                    containerStyle={{ position: 'absolute', top: 10, right: 10 }}
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
export default MainScreen;