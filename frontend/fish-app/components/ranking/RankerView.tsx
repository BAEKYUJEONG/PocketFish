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
  return rankers.length > 0 ? (
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
                <Row
                  style={{
                    alignItems: "center",
                    backgroundColor: colors.light,
                  }}
                >
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
  ) : (
    <View>
      <Text style={{ color: colors.default }}>
        잡은 물고기를 등록하고 영광의 첫 주인공이 되어보세요!
      </Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
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
    backgroundColor: "white",
    marginBottom: 5,
  },
});
