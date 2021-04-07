import React from "react";

import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Left, Thumbnail } from "native-base";
import { Text, View } from "../Themed";
import colors from "../../colors";
import { userApi } from "../../utils/axios";
import { useState, useEffect } from "react";

export default function RankerView({
  rankers,
  navigation,
}: {
  rankers: Record<string, any>;
  navigation: any;
}) {
  const [top1Image, setTop1Image] = useState("");
  const [top2Image, setTop2Image] = useState("");
  const [top3Image, setTop3Image] = useState("");
  const backimg = { uri : "https://us.123rf.com/450wm/lilu330/lilu3301507/lilu330150700104/42515276-%EC%88%98%EC%A4%91-%EC%9B%90%ED%99%9C%ED%95%9C-%ED%92%8D%EA%B2%BD-%EB%84%A4%EB%B2%84-%EC%95%A4%EB%94%A9-%EB%B2%A1%ED%84%B0-%EB%B0%94%EB%8B%A5-%EA%B7%B8%E2%80%8B%E2%80%8B%EB%A6%BC-%EA%B2%8C%EC%9E%84-%EB%94%94%EC%9E%90%EC%9D%B8%EC%97%90-%EB%8C%80%ED%95%9C-%EB%A7%8C%ED%99%94-%EB%B0%B0%EA%B2%BD.jpg?ver=6"};
  useEffect(() => {
    rankers.slice(0, 3).forEach((ranker: any, index: any) => {
      userApi.getUser(Number(ranker.nickname)).then((response) => {
        switch (index) {
          case 0:
            setTop1Image(response.data.picture);
            break;
          case 1:
            setTop2Image(response.data.picture);
            break;
          case 2:
            setTop3Image(response.data.picture);
            break;
          default:
            break;
        }
      });
    });
  }, [rankers]);
  return (
    <View style={styles.container}>
      <View style={styles.top3}>
        {rankers
          .slice(0, 3)
          .map((ranker: Record<string, any>, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.rank}
              onPress={() =>
                navigation.navigate("OtherCollectionItemScreen", {
                  id: ranker.collection_id,
                })
              }
            >
              <Row style={{ alignItems: "center" }}>
                <Row>
                  <Image
                    style={{ height: 50, width: 50 }}
                    resizeMode="contain"
                    source={
                      index === 0
                        ? require("../../assets/images/rank1.png")
                        : index === 1
                        ? require("../../assets/images/rank2.png")
                        : require("../../assets/images/rank3.png")
                    }
                  />
                  <Thumbnail
                    style={{ height: 50, width: 50 }}
                    small
                    source={{
                      uri:
                        // 사용자 프사 또는 물고기 사진 필요
                        index === 0
                          ? top1Image
                          : index === 1
                          ? top2Image
                          : top3Image,
                    }}
                  />
                </Row>
                <Col style={{}}>
                  <Text style={styles.textStyle}>{ranker.user_id}</Text>
                  <Text style={styles.textStyle}>{ranker.length}cm</Text>
                </Col>
              </Row>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.top50}>
        <ScrollView>
          {rankers
            .slice(3, 50)
            .map((ranker: Record<string, any>, index: number) => (
              <TouchableOpacity
                key={index + 4}
                onPress={() =>
                  navigation.navigate("OtherCollectionItemScreen", {
                    id: ranker.collection_id,
                  })
                }
              >
                <Row style={{ alignItems: 'center', backgroundColor: colors.light }}>
                  <Row>
                    <Text
                      style={{
                        height: 50,
                        marginBottom: 3,
                        borderRadius: 3,
                        padding: 18,
                      }}
                    >
                      {index + 4}등
                    </Text>
                  </Row>
                  <Col>
                    <Text>
                      {ranker.user_id} {ranker.length}cm
                    </Text>
                  </Col>
                </Row>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
  },
  textStyle: {
    // textAlign: "center",
    color: "black",
  },
  top3: {
    flex: 2,
    flexDirection: "column",
  },
  top50: {
    flex: 3,
  },
  rank: {
    height: 60,
    // 스타일 전체 수정 후 색상 변경 필요
    backgroundColor: 'white',
    marginBottom: 5,
  },
});
