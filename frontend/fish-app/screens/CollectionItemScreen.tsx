import * as React from 'react';
import { Component } from 'react';
import { useState, useEffect } from 'react';
import { collectionItemApi } from '../utils/axios';
import axios from 'axios';
import { StyleSheet, Button, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon, } from 'native-base';

export default function CollectionItemScreen({ route, navigation }) {
  
  const { id } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    collectionItemApi.getCollection(id).then((response: any) => {
      setData(response.data);
      console.log(data);
    });
  }, []);

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>

      <Card>
        <CardItem>
          <Left>
            {/* 사람사진 */}
            <Thumbnail source={{ uri: "https://lh3.googleusercontent.com/proxy/b80Jo_oxSfyDzDb_Vczpq7ngZ2EDKAjK3jwkzpPHjfJVeAqMy6Sf72IvRIshThJCUxIONqL88NUCdNOaDpncld-qkgqUitm766-KrpCsj2AXxw7_SVxHQ58sPeiLVzISyuZC5D6dYKsLohL9CqctsqW6ZDLbWRwERItosYH7yA" }} />
            <Body>
              <Text>백유정</Text>
              <Text>April 04, 2021</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{
              uri:
              "https://divingholic.com/wp-content/uploads/2019/01/moorish-idol-featured-image.jpg",
            }}
            style={{ height: 200, width: undefined, flex: 1 }}
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
            안녕 내 예쁜 물고이야!
          </Text>
        </CardItem>
      </Card>
    </View>
  );
}
