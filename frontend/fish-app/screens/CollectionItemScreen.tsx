import * as React from 'react';
import { Component } from 'react';
import { useState, useEffect } from 'react';
import { collectionItemApi } from '../utils/axios';
import axios from 'axios';
import { StyleSheet, Image } from 'react-native';
import { View } from '../components/Themed';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, Text } from 'native-base';

export default function CollectionItemScreen({ route, navigation }) {
  
  const { id } = route.params;
  const [item, setItem] = useState({});

  useEffect(() => {
    collectionItemApi.getCollectionItem(id).then((response: any) => {
      setItem(response.data);
      console.log(item);
    });
  }, []);

  return (
    <View>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button iconLeft light onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' />
          <Text>Back</Text>
        </Button>
      </View> */}
      <Card>
        <CardItem>
          <Left>
            {/* 사람사진 */}
            <Thumbnail source={{ uri: "http://www.siminsori.com/news/photo/201907/213852_63106_2246.jpg" }} />
            <Body>
              <Text>백유정</Text>
              <Text>{ item.regDate }</Text>
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
            <Button transparent>
              <Icon name="ios-heart" style={{ color: 'black' }} />
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles" style={{ color: 'black' }} />
            </Button>
            <Button transparent>
              <Icon name="ios-send" style={{ color: 'black' }} />
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{ height: 20 }}>
          <Text>101 likes</Text>
        </CardItem>
        <CardItem>
          <Text>
            <Text style={{ fontWeight: '900' }}>백유정</Text>
            <span style={{ marginLeft: 5 }}>{item.fishMemo}</span>
            <div>{item.fishBait}</div>
            <div>{item.fishLocation}</div>
          </Text>
        </CardItem>
      </Card>
    </View>
  );
}
