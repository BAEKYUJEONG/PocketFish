
import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right  } from 'native-base';
import { SetFishResult } from '../redux/fish';
import {analysisApi} from "../utils/axios";
import { List, Dialog } from 'react-native-paper';
import FishInformation from './Component/FishInformation';


export default function ShowResultScreen({navigation}:{ navigation:any}) {

  
  console.log("\n\n");

  const reduxState=useSelector((state:any)=>state);
  const dispatch=useDispatch();

  let itemList=[];
  let nameList=[];

  //MODIFY essential
  nameList.push(reduxState.fish.fishResult.split(`"`)[1]);
  nameList.push(reduxState.fish.fishResult.split(`"`)[3]);
  nameList.push(reduxState.fish.fishResult.split(`"`)[5]);

  
  const [selectState,setSelectState]=useState(nameList[0]);
  nameList.forEach((item)=>itemList.push(<Picker.Item label={item} value={item}/>));

  console.log(nameList);
  console.log("itemLIst: ",itemList);



  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{uri:`data:image/jpeg;base64,${reduxState.fish.fishImage}`}}/>
      <View style={styles.resultList}>
        <Form style={styles.form}>
          <Text style={styles.text}>분석결과</Text>
          <Item picker style={styles.item}>
            <Picker
                mode="dropdown"
                style={styles.picker}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={selectState}
                onValueChange={(loc)=>{setSelectState(loc)}}
            >
              {itemList}
            </Picker>
          </Item>

         
          <ScrollView style={styles.list}>
            <FishInformation name={selectState}/>
          </ScrollView>
 
          <View style={styles.saveBtnContainer}> 
            <Button rounded success style={styles.saveBtn} 
                onPress={async ()=>{
                  //let result= await analysisApi(reduxState.fish.fishImage);
                  //let result= JSON.stringify({'catfish':57.548,'carpfish':41.126,'flatfish':1.326})
                  //console.log(result);
                  //dispatch(SetFishResult(result));
                  navigation.navigate('InputDetailScreen', {name: selectState });
                }   
              }>
                <Text>저장하기</Text>
              </Button>
          </View>
        </Form>
      </View>
    </View>
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  img:{
    flex:0.5,
  },
  resultList:{
    flex:0.5,
    //backgroundColor:'pink',
    padding:10,
  },
  form:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:10,
    //backgroundColor:'blue',
  },
  item:{
    //backgroundColor:'yellow',
    flex:0.2,
  },
  list:{
    flex:0.8,
  },
  picker:{
    width:100,
    height:20,
  },
  saveBtn:{
    alignSelf:'flex-end',
    padding:20,
  },
  saveBtnContainer:{
    //backgroundColor:'pink',
    bottom:0,
    marginTop:10,
  },
  text:{
    fontWeight:'bold',
    fontSize:20,
    left:0,
  }
});