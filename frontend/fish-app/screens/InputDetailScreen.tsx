
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput,Button ,Divider} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {KoreanToNumber} from "../utils/fish";
import {AddApi} from "../utils/axios";
import * as Location from 'expo-location';
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";


export default function InputDetailScreen({route, navigation}:{route:any, navigation:any}){
    
  const reduxState=useSelector((state:any)=>state);
  const {name}=route.params;
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let lo = await Location.getCurrentPositionAsync({});
      setLocation(lo);
    })();
  }, []);
  let box={user_id:"1",lenth:0,location:" ",fish_id:0, memo:" ",bait:" ",fishing_info:" ",fish_image:" "};
  box.fish_id=KoreanToNumber(name);
  box.fish_image=reduxState.fish.fishImage;
  //console.log(box);

  const [dataInformation, setdataInformation] = useState(box);
 
  //console.log("location"+JSON.stringify(location));
  //console.log("name: ", name);
  //console.log(dataInformation);
  
  const set=(box:any)=>{
    setdataInformation(box);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        
        <TextInput label="물고기 품종" 
          mode='flat' 
          style={styles.text} 
          editable={false}  
          value={name}
          left={<TextInput.Icon name="fish" color={"#000000"} onPress={() => {}} />}/>
        <TextInput label="물고기 길이(cm)" mode='flat' style={styles.text} 
          left={<TextInput.Icon name="ruler" color={"#000000"} onPress={() => {}} />}
          keyboardType="number-pad"
          onChangeText={(text)=>{
            let box=dataInformation;
            box.lenth=text;
            set(box);}}/>
        <TextInput label="위치" mode='flat' style={styles.text} 
          left={<TextInput.Icon name="map" color={"#000000"} onPress={() => {}} />}
          onChangeText={(text)=>{
            let box=dataInformation;
            box.location=text;
            set(box);}} />
        <TextInput label="메모" multiline mode='flat' style={styles.memoText} 
          left={<TextInput.Icon name="pencil" color={"#000000"} onPress={() => {}} />} 
          onChangeText={(text)=>{
            let box=dataInformation;
            box.memo=text;
            set(box);}} />
        <Button 
          mode="contained"
          style={{marginVertical:10, padding:1}}
          onPress={async ()=>{
            //console.log(dataInformation);
            let result= await AddApi.saveFish(dataInformation);
            console.log(result);
            navigation.navigate('Home');
          }}>
          <Text  style={styles.btn} >저장하기</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    marginVertical:20,
    marginHorizontal:10,
  },
  memoText:{

    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
  },
  btn:{
    fontSize:20
  }
});