
import {  StyleSheet, Alert, Text, View, Image, TouchableOpacity } from 'react-native';
//import { ListItem, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right  } from 'native-base';

import { List, Dialog ,Paragraph,} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ShowResultScreen from '../ShowResultScreen';
import {AddApi } from "../../utils/axios";


export default function FIshInformation({name}) {
  console.log("\n\n");
  //console.log(name);
  const [data, setdata] = useState([])


  useEffect(async () => {
    try{
      const res=await AddApi.getFishInformation(1);
      await setdata(res);
      //console.log("res :"+JSON.stringify(res));
    }
    catch(err){
      console.log(err)
    }
  },[]);
  console.log(data);
  //const dataArray = await AddApi.getFishInformation(1);
  // console.log("fishinformation : "+ dataArray);
  // let baseInfo=[];
  // let eatInfo=[];

  // if(name==='flatfish'){
  //   dataArray.flatfish.baseInformation.forEach((ele)=>{
  //     let title=ele.split(":")[0];
  //     let content=ele.split(":")[1];
  //     baseInfo.push(<TouchableOpacity  onPress={async ()=>{Alert.alert(title,content)}}><List.Item style={styles.listItem} title={title} description={content}/></TouchableOpacity>);
  //   })
  //   dataArray.flatfish.eatInformation.forEach((ele)=>{
  //     let title=ele.split(":")[0];
  //     let content=ele.split(":")[1];
  //     eatInfo.push(<TouchableOpacity  onPress={async ()=>{Alert.alert(title,content)}}><List.Item style={styles.listItem} title={title} description={content}/></TouchableOpacity>);
  //   })
  // }


  return (

    <View style={styles.container}>
      {/* <List.Section style={styles.list}>
            <List.Accordion
              title="기본정보"
              left={props => <List.Icon {...props} icon="folder" />}>
              {baseInfo}
            </List.Accordion>
            <List.Accordion
              title="섭취정보"
              left={props => <List.Icon {...props} icon="folder" />}>
              {eatInfo}
            </List.Accordion>
          </List.Section> */}
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