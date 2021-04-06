import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SetFishResult } from '../redux/fish';
import { AddApi } from '../utils/axios';
import { Button} from 'react-native-paper';

export default function ImageScreen({navigation}:{ navigation:any}) {
  const reduxState=useSelector((state:any)=>state);
  const dispatch=useDispatch();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:`data:image/jpeg;base64,${reduxState.fish.fishImage}`}}/>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{marginVertical:10, padding:1}}
          onPress={async ()=>{
            let result= await AddApi.getAnalysis(reduxState.fish.fishImage);
            //console.log(result);
            dispatch(SetFishResult(result));
            navigation.navigate('ShowResultScreen');
          }}>
          <Text style={styles.btnText}>분석하기</Text>
        </Button>
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
        bottom:20,
        alignSelf: 'center',
        position:'absolute',
        zIndex:10,
    },
    btnText:{
        fontSize: 18,
        color: 'white',
    }
});