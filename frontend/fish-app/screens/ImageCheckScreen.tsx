import React from 'react';
import { Button } from 'react-bootstrap';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';


export default function ImageScreen({navigation}:{ navigation:any}) {
    const reduxState=useSelector((state:any)=>state);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:`data:image/jpeg;base64,${reduxState.fish.fishImage}`}}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity>
                    <Text style={styles.btnText}>다시 촬영하기</Text>
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