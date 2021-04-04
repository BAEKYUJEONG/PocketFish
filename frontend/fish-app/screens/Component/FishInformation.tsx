
import {  StyleSheet, Alert, Text, View, Image, TouchableOpacity } from 'react-native';
//import { ListItem, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right  } from 'native-base';

import { List, Dialog ,Paragraph,} from 'react-native-paper';
import {AddApi } from "../../utils/axios";
import {StringToNumber} from "../../utils/fish";
import ListItem from "../Component/ListItem";


export default function FIshInformation({name}:{name:any}) {
  //console.log("\n\n");
  //console.log(name);
  const [data, setdata] = useState([])

  useEffect(() => {
    const get= async ()=>{
      const number = StringToNumber(name);
      const res=await AddApi.getFishInformation(number);
      await setdata(res.data);
    }
    get();
    return () => {
      console.log("This will be logged on unmount");
    }
  },[]);

  // for( let a in data){
  //   console.log(data[a]);
  // }

  let information=[];

  information.push(<ListItem title="물고기 종" content={data['name']}/>);
  information.push(<ListItem title="포획가능 길이" content={data['size_ok']}/>);
  information.push(<ListItem title="서식지" content={data['habitat']}/>);
  information.push(<ListItem title="추가정보" content={data['description']}/>);


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