
import {  StyleSheet, Alert, Text, View, Image, TouchableOpacity } from 'react-native';
//import { ListItem, Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Picker, Button, Right  } from 'native-base';

import { List, Dialog ,Paragraph,} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ShowResultScreen from '../ShowResultScreen';


export default function FIshInformation({name}) {
  console.log("\n\n");
  console.log(name);

  const dataArray = {
    'flatfish':{
      'baseInformation' :[
        '구입요령 : 너무 큰 것도 맛이 없고 2kg 정도의 것이 적당하다. 붉은빛이 도는 흰색이면 신선하다. 윤기가 없는 것은 오래된 것이므로 피한다.',
        '유사재료 : 도다리 (광어는 눈이 좌측에 있고, 도다리는 눈이 우측에 있어 구별된다.)',
        '보관온도 : 0~5℃',
        '보관일 : 1일',
        '보관법 : 손질한 광어는 살을 발라내어 소금, 후추, 밀가루까지 뿌려 랩에 싸서 냉동 보관하면 된다. 뼈도 버리지 말고 용기에 담아 랩을 씌워 냉동 보관해 두었다가 매운탕 등의 찌개에 이용하면 시원한 국물을 낼 수 있다.',
        '손질법 : 납작한 생선이므로 가자미와 같은 요령으로 손질한다. 광어는 회감으로 많이 이용되는데 포뜨기를 해서 먹기 좋게 저며야 한다. 비늘을 벗기고 내장을 제거한 후 깨끗이 씻어 물기를 닦고 포를 뜬다.',
        '산지특성 및 기타정보 : 광어는 넙치라고도 하며 우리나라 전 연안에 많고, 가자밋과에 속한다. 서해 연안에 분포 서식하다가 가을에 다시 남하하는 남북 회유를 한다. 우리나라, 일본, 남중국해에 많이 분포한다.'
      ],
      'eatInformation':[
        '섭취방법 : 광어는 쫄깃한 감칠맛에 비린내도 없어 횟감으로 많이 이용되며, 비린내가 없어 국이나 장국, 매운탕, 튀김으로도 먹는다.',
        '궁합음식정보 : 생강 (날 생선으로 광어회를 먹을 경우 생강이 살균효과를 내어 식중독을 예방한다.)',
        '다이어트 : 광어는 고단백, 저지방, 저칼로리로 열량이 낮아 다이어트을 계획한다면 섭취하여도 무방하다.',
        '효능 : 비만 예방, 빈혈 예방 (단백질의 질이 우수하고 지방 함량이 적어 비만을 방지하고 맛이 담백하고 개운하여 간장질환이 있는 사람이나 당뇨병 환자에게 좋은 식품이다. 어린이 노약자에게 좋으며 광어의 간에는 비타민 B12가 많이 들어 있어 빈혈 예방에 효과적이다.)'
      ]
    },
  };
    
  let baseInfo=[];
  let eatInfo=[];

  if(name==='flatfish'){
    dataArray.flatfish.baseInformation.forEach((ele)=>{
      let title=ele.split(":")[0];
      let content=ele.split(":")[1];
      baseInfo.push(<TouchableOpacity  onPress={async ()=>{Alert.alert(title,content)}}><List.Item style={styles.listItem} title={title} description={content}/></TouchableOpacity>);
    })
    dataArray.flatfish.eatInformation.forEach((ele)=>{
      let title=ele.split(":")[0];
      let content=ele.split(":")[1];
      eatInfo.push(<TouchableOpacity  onPress={async ()=>{Alert.alert(title,content)}}><List.Item style={styles.listItem} title={title} description={content}/></TouchableOpacity>);
    })
  }


  return (

    <View style={styles.container}>
      <List.Section style={styles.list}>
            <List.Accordion
              title="기본정보"
              left={props => <List.Icon {...props} icon="folder" />}>
              {baseInfo}
            </List.Accordion>
            <List.Accordion
              title="섭취정보"
              left={props => <List.Icon {...props} icon="folder" />}>
              {eatInfo}
            </List.Accordion>
          </List.Section>
    </View>
      
  );

}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  list:{
    flex:1,
  },
  listItem:{
    flex:1,
  }
});