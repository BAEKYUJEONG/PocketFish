import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fishState, SetFishImage } from '../redux/fish';
import { AddParamList } from '../types';

export default function CameraScreen({navigation}:{navigation:any}) {
  
  const dispatch= useDispatch();

  const [hasPermission, setHasPermission] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);

  let cameraRef:any;
  
  // const reduxState=useSelector((state:any)=>state);
  // console.log("redux : ",reduxState);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref=>{cameraRef=ref}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={ async () => {
              if(cameraRef){
                const result =await cameraRef.takePictureAsync({ quality: 0.5, base64 :true });
                dispatch(SetFishImage(result.base64));
                navigation.navigate('ImageCheckScreen');
                
                // console.log({"result":result});
                //console.log("state : ",fishState.fishImage);
                // await axios.post(`http://skeldtcan.iptime.org:5000`,JSON.stringify({file:result.base64}),{headers: {
                //   'Content-Type': 'application/JSON'
                // }}).then((res)=>console.log(res.data))
                // .catch((Error)=>{console.log(Error);});
              }
            }}>
            <Text style={styles.text}> TAKE </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
