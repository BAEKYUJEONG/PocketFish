import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Item, Picker } from "native-base";
import FishInformation from "./Component/FishInformation";
import { EnglishToKorean } from "../utils/fish";
import { Button } from "react-native-paper";
import { KoreanToNumber } from "../utils/fish";
export default function ShowResultScreen({ navigation }: { navigation: any }) {
  //console.log("\n\n");

  const reduxState = useSelector((state: any) => state);
  const dispatch = useDispatch();

  let itemList = [];
  let nameList = [];
  //console.log("fishResult:"+reduxState.fish.fishResult);

  // var result = reduxState.fish.fishResult.replace(/'/g, '"')
  // const resultJSON=JSON.parse(result);
  //console.log(Object.keys(resultJSON)[0]);

  var result = reduxState.fish.fishResult.replace(/'/g, '"');
  const resultJSON = JSON.parse(result);
  const [selectState, setSelectState] = useState(
    EnglishToKorean(Object.keys(resultJSON)[0])
  );
  // useEffect(() => {
  //   const get= async ()=>{
  //     setSelectState(Object.keys(resultJSON)[0]);
  //   };
  //   get();
  //   return () => {
  //     console.log();
  //   }
  // },[]);

  //console.log("-------------"+selectState);

  const get = async () => {
    return selectState;
  };

  let number = 0;

  for (let i in resultJSON) {
    let box = EnglishToKorean(i);
    //console.log(box);
    itemList.push(<Picker.Item label={box} value={box} key={number} />);
    number++;
  }
  //console.log(itemList);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: `data:image/jpeg;base64,${reduxState.fish.fishImage}` }}
      />
      <View style={styles.resultList}>
        <Form style={styles.form}>
          <ScrollView style={styles.list}>
            <Text style={styles.text}>분석결과</Text>
            <Item picker style={styles.item}>
              <Picker
                mode="dropdown"
                style={styles.picker}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selectState}
                onValueChange={(loc) => {
                  setSelectState(loc);
                }}
              >
                {itemList}
              </Picker>
            </Item>
            <FishInformation name={selectState} />
          </ScrollView>

          <View style={styles.saveBtnContainer}>
            <Button
              mode="contained"
              style={{ marginVertical: 10, padding: 1 }}
              onPress={async () => {
                //console.log(selectState);
                let box = {
                  user_token: "",
                  user_id: 0,
                  length: 0,
                  location: "한국",
                  fish_id: KoreanToNumber(selectState),
                  memo: "",
                  bait: "",
                  fishing_info: "",
                  fish_image: "",
                };
                let name = selectState;
                let type = "add";
                navigation.navigate("InputDetailScreen", { box, name, type });
              }}
            >
              <Text>저장하기</Text>
            </Button>
          </View>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  img: {
    flex: 0.5,
  },
  resultList: {
    flex: 0.5,
    //backgroundColor:'pink',
    padding: 10,
  },
  form: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    //backgroundColor:'blue',
  },
  item: {
    //backgroundColor:'yellow',
    // flex: 0.2,
  },
  list: {
    // flex: 0.8,
  },
  picker: {
    fontWeight: "bold",
    width: "100%",
  },
  saveBtn: {
    alignSelf: "flex-end",
    padding: 20,
  },
  saveBtnContainer: {
    //backgroundColor:'pink',
    bottom: 0,
    marginTop: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    left: 0,
  },
});
