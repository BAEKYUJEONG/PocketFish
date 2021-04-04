
import {  StyleSheet, Alert, Text, View, Image, TouchableOpacity } from 'react-native';
//import { ListItem, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right  } from 'native-base';

import { List, Dialog ,Paragraph,} from 'react-native-paper';
import {AddApi } from "../../utils/axios";
import {KoreanToNumber} from "../../utils/fish";
import ListItem from "../Component/ListItem";


export default function FishInformation({name}:{name:any}) {
  // console.log("\n\n");
  // console.log("name "+name);
  const [data, setdata] = useState([])

  useEffect(() => {
    const get= async ()=>{
      //console.log("=========="+KoreanToNumber(name));
      let number = KoreanToNumber(name);
      await AddApi.getFishInformation(number).then(async(Response:any)=>{
          await setdata(Response.data)
      })
    };
    get();
    return () => {
      console.log(data);
    }
  },[name]);

  // for( let a in data){
  //   console.log(data[a]);
  // }

  const value =(index:any)=>{
    switch (index) {
      case "name":
        return data['name'];
      case "size_ok":
        return data['size_ok'];
      case "habitat":
        return data['habitat'];
      default:
        return data['description'];
    }
  }

  let information=[];

  information.push(<ListItem title="물고기 종" content={value('name')}/>);
  information.push(<ListItem title="포획가능 길이" content={value('size_ok')}/>);
  information.push(<ListItem title="서식지" content={value('habitat')}/>);
  information.push(<ListItem title="추가정보" content={value('description')}/>);


  return (

    <View style={styles.container}>
      <List.Section style={styles.list}>
        {information}
      </List.Section>
    </View>
      
  );

}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  list:{
    flex:1,
  },
  listItem:{
    flex:1,
  }
});