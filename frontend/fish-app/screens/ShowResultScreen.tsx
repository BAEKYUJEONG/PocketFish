
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right } from 'native-base';
import { SetFishResult } from '../redux/fish';

export default function ShowResultScreen({navigation}:{ navigation:any}) {

    const reduxState=useSelector((state:any)=>state);

    const [state,setState]=useState("{'a','b'}");

    var itemList=[];
    var nameList=[];
    nameList.push(reduxState.fish.fishResult.split(`"`)[1]);
    nameList.push(reduxState.fish.fishResult.split(`"`)[3]);
    nameList.push(reduxState.fish.fishResult.split(`"`)[5]);
    console.log("\n\n");
    console.log(nameList);
    nameList.forEach((item)=>itemList.push(<Picker.Item label={item} value="key0"/>));
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
                  selectedValue={state}
                  onValueChange={(loc)=>{setState(loc)}}
              >
                {itemList}
              </Picker>
            </Item>
            <View style={styles.saveBtnContainer}> 
              <Button rounded success style={styles.saveBtn}><Text>저장하기</Text></Button>
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
    flex:0.7,
  },
  resultList:{
    flex:0.3,
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
    flex:0.5,
  },
  picker:{
    width:100,
    height:20,
  },
  saveBtn:{
    padding:20,
  },
  saveBtnContainer:{
    //backgroundColor:'white',
    right:0,
    position:'absolute',
    bottom:0,
    marginTop:10,
  },
  text:{
    fontWeight:'bold',
    fontSize:20,
    left:0,
  }
});