import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fishState, SetFishImage } from '../redux/fish';
import { AddParamList } from '../types';

export default function CameraScreen({navigation}:{navigation:any}) {
  
  const dispatch= useDispatch();

  const [hasPermission, setHasPermission] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);

  let cameraRef:any;
  
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
          <FAB
            style={styles.cameraFab}
            icon="camera"
            onPress={async () => {
              if(cameraRef){
                const result =await cameraRef.takePictureAsync({ quality: 0.5, base64 :true });
                dispatch(SetFishImage(result.base64));
                navigation.navigate('ImageCheckScreen');
              }
            }}
          />
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
    position:'absolute',
    right:0,
    bottom:0,
    margin:16
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  cameraFab: {
    position: 'absolute',
    margin: 16,
    right:95,
    left:95,
    bottom:0,
    alignItems:'center',
    backgroundColor:'#b9d'
  },
});
