import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import { collectionApi } from "../utils/axios"
import {
  StyleSheet,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Icon, Container, Content, Thumbnail, Image, Left, Body, Right, Button } from 'native-base';

export default function CollectionScreen() {
  const uri1 = "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHw%3D&w=1000&q=80";
  const uri2 = "https://c.pxhere.com/photos/75/0c/blue_devils_clownfish_aquarium_nemo_underwater_sea_reeve_coral-605474.jpg!d";
  const [data, setData] = useState([]);

  useEffect(() => {
    collectionApi.getCollection(1).then((response:any) => {
      setData(response.data);
      alert(JSON.stringify(response.data));
      console.log(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.headerView}>
          <Text style={styles.instructions}>
            내 수조
          </Text>
        </View>
        <Content>
          {/*
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              
              <View style={{ flex: 1 }}>
              </View>

              <View style={{ flex: 3 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}></View>
              </View>

            </View>
            <View style={{ paddingVertical: 10}}>

            </View>

          </View>
          */}
          <View style={styles.contentView}>
            <View style={styles.collectionAll}>
              {data.map((d, index) => <Text key={index}>fishImage: {d.fishImage}, collectionId: {d.collectionId}</Text>)}

              <Thumbnail large source={{ uri: uri1 }} />
              <Thumbnail large source={{ uri: uri2 }} />
              <Thumbnail large source={{ uri: uri1 }} />
              <Thumbnail large source={{ uri: uri2 }} />
            </View>
          </View>
        </Content>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    color: "#0476D9",
    fontSize: 18,
    marginTop: 30,
    marginHorizontal: 200,
    marginBottom: 30,
  },
  contentView: {
    flex: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  collectionAll: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eae5e5',
  },
  collectionImg: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
