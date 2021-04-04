
import { Title, } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity } from 'react-native';

export default function ListItem({title, content}:{title:any, content:any}){

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{title}</Title>
      <Text style={styles.text}>{content}</Text>
    </View>
  )

}

const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:3,
  },
  title:{
    fontSize:15,
    fontWeight:'bold',
  },
  text:{
    fontSize:13,
  }
});