import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { KoreanToNumber } from "../utils/fish";
import { AddApi,collectionItemApi } from "../utils/axios";
import * as Location from "expo-location";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SetUser } from "../redux/user";

export default function InputDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const reduxState = useSelector((state: any) => state);
  const user = useSelector((state: any) => state.user);
  const userObj = JSON.parse(user.user);
  const dispatch = useDispatch();
  
  useEffect(async() => {
    const authCheck=async()=>{
      if (userObj == null) {
        alert("저장하실려면 로그인이 필요합니다.");
        navigation.navigate("Collection");
      }
    };
    await authCheck();
  }, []);


  const add=async()=>{
    console.log("Add");
    box.fish_image = reduxState.fish.fishImage;
    await AddApi.saveFish(box);
  }
  const update=async()=>{
    console.log("update");
    await collectionItemApi.updateItem(box);
  }
  let { box, name,type } = route.params;
  //console.log("------"+box);
  // const [location, setLocation] = useState({});

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.error('Permission to access location was denied');
  //       return;
  //     }
  //     let lo = await Location.getCurrentPositionAsync({});
  //     setLocation(lo);
  //   })();
  // }, []);
  // let box={user_token:userObj.asscess_token,user_id:1,length:0,location:" ",fish_id:0, memo:" ",bait:" ",fishing_info:" ",fish_image:" "};
  // box.fish_id=KoreanToNumber(name);
  box.user_id = userObj.id;
  box.user_token = userObj.access_token;

  //console.log(route.params);

  const [length, setlength] = useState(box.length);
  const [location, setlocation] = useState(box.location);
  const [bait, setbait] = useState(box.bait);
  const [fishing_info, setfishing_info] = useState(box.fishing_info);
  const [memo, setmemo] = useState(box.memo);

  //console.log("location"+JSON.stringify(location));
  //console.log("name: ", name);
  //console.log(dataInformation);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label="물고기 품종"
          mode="flat"
          style={styles.text}
          editable={false}
          value={name}
          left={
            <TextInput.Icon name="fish" color={"#000000"} onPress={() => {}} />
          }
        />
        <TextInput
          label="물고기 길이(cm)"
          mode="flat"
          style={styles.text}
          value={String(length)}
          left={
            <TextInput.Icon name="ruler" color={"#000000"} onPress={() => {}} />
          }
          keyboardType="number-pad"
          onChangeText={(text) => {
            setlength(text);
          }}
        />
        <TextInput
          label="위치"
          mode="flat"
          style={styles.text}
          value={location}
          left={
            <TextInput.Icon name="map" color={"#000000"} onPress={() => {}} />
          }
          onChangeText={(text) => {
            setlocation(text);
          }}
        />
        <TextInput
          label="미끼 정보"
          mode="flat"
          style={styles.text}
          value={bait}
          left={
            <TextInput.Icon
              name="information"
              color={"#000000"}
              onPress={() => {}}
            />
          }
          onChangeText={(text) => {
            setbait(text);
          }}
        />
        <TextInput
          label="장비 정보"
          mode="flat"
          style={styles.text}
          value={fishing_info}
          left={
            <TextInput.Icon
              name="information"
              color={"#000000"}
              onPress={() => {}}
            />
          }
          onChangeText={(text) => {
            setfishing_info(text);
          }}
        />
        <TextInput
          label="메모"
          multiline
          mode="flat"
          style={styles.memoText}
          value={memo}
          left={
            <TextInput.Icon
              name="pencil"
              color={"#000000"}
              onPress={() => {}}
            />
          }
          onChangeText={(text) => {
            setmemo(box);
          }}
        />
        <Button
          mode="contained"
          style={{ marginVertical: 10, padding: 1 }}
          onPress={async () => {
            //console.log(dataInformation);
            box.length = length;
            box.location = location;
            box.bait = bait;
            box.fishing_info = fishing_info;
            box.memo = memo;
            //console.log(userObj.access_token);
            if(type=="add"){
              add();
            }
            else if(type=="update"){
              update();
            }
            navigation.navigate("CollectionScreen");
          }}
        >
          <Text style={styles.btn}>저장하기</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  memoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  btn: {
    fontSize: 20,
  },
});
