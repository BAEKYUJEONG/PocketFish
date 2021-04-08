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
import { ScrollView } from "react-native-gesture-handler";

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
    //console.log(box);
    await collectionItemApi.deleteItem(box).then((res: any) => {
      console.log(res.data);
      navigation.navigate("CollectionScreen");
    });
  };
  const updateItem = async () => {
    let box = {
      bait: item.fishBait,
      fish_id: KoreanToNumber(item.fishName),
      fishing_info: item.fishingInfo,
      length: item.fishLength,
      location: item.fishLocation,
      memo: item.fishMemo,
      fish_image: item.fishImage,
      collectionId: item.collectionId,
    };
    let name = item.fishName;
    let type = "update";
    navigation.navigate("InputDetailScreen", { box, name, type });
  };
  return (
    <View style={{ flex: 1 }}>
      <Card style={{ height: "100%", marginTop: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.userProfile }} />
            <Body style={{ flexDirection: "row" }}>
              <View>
                <Text>{item.userNick}</Text>
                <Text>{item.regDate}</Text>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <IconButton
                  icon="pencil"
                  style={{ marginLeft: "20%" }}
                  color="black"
                  size={20}
                  onPress={() => {
                    updateItem();
                  }}
                />
                <IconButton
                  icon="delete"
                  color="black"
                  size={20}
                  onPress={() => {
                    Alert.alert("", "정말 삭제하시나요?", [
                      { text: "아니오" },
                      { text: "네", onPress: deleteItem },
                    ]);
                  }}
                />
              </View>
            </Body>
          </Left>
        </CardItem>
        <View style={{ flex: 1 }}>
          <CardItem style={{ flex: 2, backgroundColor: "lightgrey" }} cardBody>
            <Image
              resizeMode="contain"
              source={{ uri: item.fishImage }}
              style={{ flex: 1, height: "100%" }}
            />
          </CardItem>
          {/* 댓글 안녕! */}
          {/* <CardItem style={{ height: 45 }}>
          <Left> */}
          {/* <Button transparent>
              <Icon name="ios-heart" style={{ color: 'black' }} />
            </Button> */}
          {/* <Button
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
            </Button> */}
          {/* </Left>
        </CardItem> */}
          <CardItem
            style={{
              // backgroundColor: "lightgrey",
              marginTop: -10,
              flexDirection: "column",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <ScrollView
              style={{ flex: 1, marginTop: 5 }}
              contentContainerStyle={{ justifyContent: "center" }}
            >
              {item.fishMemo ? <Text style={styles.text}>{item.fishMemo}</Text> : <></>}
              {item.fishLength ? (
                <Text style={styles.text}>길이 : {item.fishLength}cm</Text>
              ) : (
                <></>
              )}
              {item.fishName ? (
                <Text style={styles.text}>어종 : {item.fishName}</Text>
              ) : (
                <></>
              )}
              {item.fishLocation ? (
                <Text style={styles.text}>장소 : {item.fishLocation}</Text>
              ) : (
                <></>
              )}
              {item.fishingInfo ? (
                <Text style={styles.text}>장비 : {item.fishingInfo}</Text>
              ) : (
                <></>
              )}
              {item.fishBait ? (
                <Text style={styles.text}>미끼 : {item.fishBait}</Text>
              ) : (
                <></>
              )}
            </ScrollView>
          </CardItem>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
