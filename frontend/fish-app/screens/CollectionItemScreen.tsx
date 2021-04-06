import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import { collectionItemApi } from "../utils/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Image, Alert } from "react-native";
import { View } from "../components/Themed";
import { KoreanToNumber } from "../utils/fish";
import { IconButton } from "react-native-paper";
import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Text,
} from "native-base";

export default function CollectionItemScreen({ route, navigation }) {
  const { id } = route.params;
  const [item, setItem] = useState({});
  const user = useSelector((state: any) => state.user);
  const userObj = JSON.parse(user.user);

  useEffect(() => {
    const get = async () => {
      await collectionItemApi.getCollectionItem(id).then((response: any) => {
        setItem(response.data);
        console.log(item);
      });
    };
    get();
    return () => {
      console.log();
    };
  }, []);

  const deleteItem = async () => {
    let box = {
      user_token: userObj.access_token,
      user_id: userObj.id,
      item_id: item.collectionId,
    };
    console.log(box);
    await collectionItemApi.deleteItem(box).then((res: any) => {
      console.log(res.data);
      navigation.navigate("CollectionScreen");
    });
  };
  const updateItem =async () =>{
    let box={
      bait: item.fishBait,
      fish_id: KoreanToNumber(item.fishName),
      fishing_info: item.fishingInfo,
      length: item.fishLength,
      location: item.fishLocation,
      memo: item.fishMemo,
      fish_image:item.fishImage,
      collectionId: item.collectionId
    };
    let name=item.fishName;
    let type="update";
    navigation.navigate("InputDetailScreen",{box,name,type});
  }
  return (
    <View>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.userProfile }} />
            <Body style={{ flexDirection: "row", backgroundColor: "red" }}>
              <View>
                <Text>백유정</Text>
                <Text>{item.regDate}</Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <IconButton
                  icon="pencil"
                  style={{ marginLeft: "15%" }}
                  color="black"
                  size={20}
                  onPress={() => {
                    updateItem()
                  }}
                />
                <IconButton
                  icon="delete"
                  color="black"
                  size={20}
                  onPress={() => {
                    Alert.alert("", "정망 삭제하시나요?", [
                      { text: "No" },
                      { text: "Yes", onPress: deleteItem },
                    ]);
                  }}
                />
              </View>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: item.fishImage }}
            style={{ height: 250, width: undefined, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            {/* <Button transparent>
              <Icon name="ios-heart" style={{ color: 'black' }} />
            </Button> */}
            <Button
              transparent
              onPress={() =>
                navigation.navigate("CommentScreen", { id: item.collectionId })
              }
            >
              <Icon name="ios-chatbubbles" style={{ color: "black" }} />
              <Text
                style={{ color: "black", fontSize: 15, alignContent: "center" }}
              >
                댓글
              </Text>
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{ marginTop: -10 }}>
          <Text>
            <Text style={{ fontWeight: "900" }}>{item.userNick}</Text>
            <View>
              <Text style={{ marginLeft: 5 }}>{item.fishMemo}</Text>
              <Text>길이 : {item.fishLength}</Text>
              <Text>어종 : {item.fishName}</Text>
              <Text>장소 : {item.fishLocation}</Text>
              <Text>장비 : {item.fishingInfo}</Text>
              <Text>미끼 : {item.fishBait}</Text>
            </View>
          </Text>
        </CardItem>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
