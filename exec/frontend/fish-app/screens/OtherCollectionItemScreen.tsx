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
              {item.memo ? <Text style={styles.text}>{item.memo}</Text> : <></>}
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
