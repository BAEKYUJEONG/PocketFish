import * as React from "react";
import { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";
//import { Text, View } from "../components/Themed";
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';

export default function CollectionScreen() {
  return (
    <View style={styles.container}>
      <Container>
        <Header>
          <Body><Text>내 수조</Text></Body>
        </Header>
        <Content>
          <View>
            <View style={{ flexDirection: 'row' }}>
              
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
