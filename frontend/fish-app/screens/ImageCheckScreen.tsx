import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SetFishResult } from '../redux/fish';
import { AddApi } from '../utils/axios';


export default function ImageScreen({navigation}:{ navigation:any}) {
  const reduxState=useSelector((state:any)=>state);
  const dispatch=useDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:`data:image/jpeg;base64,${reduxState.fish.fishImage}`}}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={async ()=>{
              let result= await AddApi.getAnalysis(reduxState.fish.fishImage);
              //let result= JSON.stringify({'catfish':57.548,'carpfish':41.126,'flatfish':1.326})
              console.log(result);
              dispatch(SetFishResult(result));
              navigation.navigate('ShowResultScreen');
            }   
          }>
          <Text style={styles.btnText}>분석하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        flex:1,
    },
    buttonContainer: {
        bottom:40,
        alignSelf: 'center',
        position:'absolute',
        zIndex:10,
    },
    btnText:{
        fontSize: 18,
        color: 'white',
    }
});