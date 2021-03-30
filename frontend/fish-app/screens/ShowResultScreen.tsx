
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Dropdown, Button} from 'react-bootstrap';



export default function ShowResultScreen({navigation}:{ navigation:any}) {

    const reduxState=useSelector((state:any)=>state);

    return (
        <View style={styles.container}>
            <View style={styles.resultList}>
							<Text style={styles.text}>분석결과</Text>
							<View style={styles.container}>
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									<Text>Dropdown Button</Text>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
									<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							</View>
            </View>
            
        </View>
    );
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
    },
    resultList:{
			flex:1,
			backgroundColor:'black'
    },
    text:{
			color:'black',
			backgroundColor:'yellow',
    }
});