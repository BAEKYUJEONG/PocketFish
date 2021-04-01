
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';




export default function InputDetailScreen({route, navigation}){
    
  const reduxState=useSelector((state:any)=>state);
  const {name}=route.params;

  console.log("name: ", name);
  let detailInformation={name:"",lenth:"",location:"",fish_id:"", memo:"",bait:"",fishing_info:"",user_id:"",fish_image:""};
  detailInformation.name=name;
  detailInformation.fish_image=reduxState.fish.fishImage;

  return (
    <View style={styles.container}>
      <ScrollView>
        
        <TextInput label="물고기 품종" mode='flat' style={styles.text} editable={false} value={detailInformation.name} />
        <TextInput label="물고기 길이" mode='flat' style={styles.text} value={detailInformation.lenth}  onChangeText={text=>detailInformation.lenth=text}/>
        <TextInput label="위치" mode='flat' style={styles.text} value={detailInformation.location} />
        <TextInput label="메모" multiline mode='flat' style={styles.text} value={detailInformation.memo} />
        
        <Text style={styles.text}>{name}</Text>
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
  text:{
    fontSize:20,
    fontWeight:'bold',
    marginVertical:10,
  }
});