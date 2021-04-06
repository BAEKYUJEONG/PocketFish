import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import { collectionItemApi } from "../utils/axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Image, Alert } from "react-native";
import { View } from "../components/Themed";

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

export default function OtherCollectionItemScreen({ route, navigation }) {
  const { id } = route.params;
  const [item, setItem] = useState({});

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

  return (
    <View>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: item.userProfile }} />
            <Body style={{ flexDirection: "row", backgroundColor: "red" }}>
              <View>
                <Text>{item.userNick}</Text>
                <Text>{item.regDate}</Text>
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
