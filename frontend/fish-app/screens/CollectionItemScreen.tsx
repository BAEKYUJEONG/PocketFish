import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import { collectionItemApi } from "../utils/axios"
import axios from "axios";
import {
  StyleSheet,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Icon, Container, Content, Thumbnail, Image, Left, Body, Right, Button } from 'native-base';

export default function CollectionItemScreen(props: any) {
    const { } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        collectionItemApi.getCollection().then((response:any) => {
          setData(response.data);
          alert(JSON.stringify(response.data));
          console.log(data);
        });
    }, []);
    
    <Text>hi</Text>
   
}