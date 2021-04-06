import * as React from "react";
import { Component } from "react";
import { useState, useEffect } from "react";
import { collectionApi } from "../utils/axios";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Text, View } from "../components/Themed";
import { Icon, Container, Content, Thumbnail, Image } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector } from "react-redux";

export default function CollectionScreen({ navigation }: { navigation: any }) {
  const uri1 =
    "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHw%3D&w=1000&q=80";
  const uri2 =
    "https://c.pxhere.com/photos/75/0c/blue_devils_clownfish_aquarium_nemo_underwater_sea_reeve_coral-605474.jpg!d";
  const [data, setData] = useState([]);

  const reduxState = useSelector((state: any) => state);
  const user = useSelector((state: any) => state.user);
  const userObj = JSON.parse(user.user);

  //아이디값
  //console.log(userObj.user_id);
  //토큰값
  //console.log(userObj.asscess_token);

  // useEffect(() => {
  //   collectionApi.getCollection(1).then((response: any) => {
  //     let count = 3 - (response.data.length % 3);
  //     let data = [...response.data, ...new Array(count)];
  //     setData(data);
  //     //alert(JSON.stringify(response.data));
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    collectionApi.getCollection(userObj.id).then((response: any) => {
      let count = 3 - (response.data.length % 3);
      let data = [...response.data, ...new Array(count)];
      setData(data);
      //alert(JSON.stringify(response.data));
      console.log(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width:'100%', height:'100%'}}>
        <View style={styles.headerView}>
          <Text style={styles.instructions}>내 수조</Text>
        </View>
        <View style={{width:'100%', height:'100%'}}>
          <View style={styles.contentView}>
            <View style={styles.collectionAll}>
              <Grid style={{ marginTop: 30}}>
                {Array.from({ length: 2 }, (_, i) => i + 1).map((idx) => (
                  <Row
                    key={idx}
                    style={{ marginBottom: 10, justifyContent: "center",  height:'20%' }}
                  >
                    {data.slice((idx - 1) * 3, idx * 3).map((d, index) => (
                      <Col
                        key={index}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent:'center',
                        }}
                      >
                        {d === undefined ? null : (
                          <View
                            style={[
                              { width: '100%' },
                              { height: '100%' },
                              {alignItems:'center'},
                              { marginBottom: 2 }]}
                          >
                            {/* { index % 3 == 0 ? <br></br> : null } */}
                            <View
                             key={index}
                             style={[
                               { width: '80%' },
                               { height: '80%' },
                               { marginBottom: 2 },
                               { alignItems: "center" },
                               index % 3 !== 0
                                 ? { paddingLeft: 2 }
                                 : { paddingLeft: 0 },
                             ]}>
                              <TouchableOpacity
                                style={styles.collectionImg}
                                onPress={() =>{
                                  console.log("touch");
                                  console.log(d.collectionId);
                                  navigation.navigate("CollectionItemScreen", {
                                    id: d.collectionId,
                                  })
                                }
                              }
                              >
                                <Thumbnail large source={{ uri: d.fishImage }} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </Col>
                    ))}
                  </Row>
                ))}
              </Grid>
              {/*               
              <Thumbnail large source={{ uri: uri1 }} />
              <Thumbnail large source={{ uri: uri2 }} />
              <Thumbnail large source={{ uri: uri1 }} />
              <Thumbnail large source={{ uri: uri2 }} />
              */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  headerView: {
    height:'10%',
    alignItems: "center",
    justifyContent: "center",
  },
  instructions: {
    color: "#0476D9",
    fontSize: 15,
    marginTop: 30,
    marginHorizontal: 150,
    marginBottom: 30,
  },
  contentView: {
    flex: 1,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  collectionAll: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eae5e5",
    height:'100%',
  },
  collectionImg: {
    borderRadius: 50,
    //backgroundColor: '#ffffff', //배경색이 없으면 그림자가 안보일 수 있음.
    //IOS
    shadowColor: "#000000", //그림자색
    shadowOpacity: 0.3, //그림자 투명도
    shadowOffset: { width: 2, height: 2 }, //그림자 위치
    //ANDROID
    elevation: 3,
  },
});
