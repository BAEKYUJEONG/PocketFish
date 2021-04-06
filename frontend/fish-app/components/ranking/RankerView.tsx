import React from "react";
import { userApi } from "../../utils/axios";

import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Left, Thumbnail } from "native-base";
import { Text, View } from "../Themed";

export default function RankerView(props: any) {
  const { rankers, navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.top3}>
        <TouchableOpacity style={styles.rank} onPress={() => alert("clicked")}>
          <Col>
            <Image
              style={{ marginTop: 5, height: 50, width: 50 }}
              resizeMode="contain"
              source={require("../../assets/images/rank1.png")}
            />
          </Col>
          {rankers.length > 0 ? (
            <>
              <Col style={{ marginTop: -25 }}>
                <Text style={styles.textStyle}>{rankers[0].nickname}</Text>
                <Text style={styles.textStyle}>{rankers[0].length}cm</Text>
              </Col>
            </>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.rank} onPress={() => alert("clicked")}>
          <Row>
            <Image
              style={{ marginTop: 5, height: 50, width: 50 }}
              resizeMode="contain"
              source={require("../../assets/images/rank2.png")}
            />
            <Thumbnail
              style={{ alignContent: "center" }}
              small
              source={{
                uri:
                  "http://www.siminsori.com/news/photo/201907/213852_63106_2246.jpg",
              }}
            />
          </Row>
          {rankers.length > 1 ? (
            <>
              <Col style={{ marginTop: -25 }}>
                <Text style={styles.textStyle}>{rankers[1].nickname}</Text>
                <Text style={styles.textStyle}>{rankers[1].length}cm</Text>
              </Col>
            </>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.rank} onPress={() => alert("clicked")}>
          <Col>
            <Image
              style={{ marginTop: 5, height: 50, width: 50 }}
              resizeMode="contain"
              source={require("../../assets/images/rank3.png")}
            />
          </Col>
          {rankers.length > 2 ? (
            <>
              <Col style={{ marginTop: -25 }}>
                <Text style={styles.textStyle}>{rankers[2].nickname}</Text>
                <Text style={styles.textStyle}>{rankers[2].length}cm</Text>
              </Col>
            </>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.top50}>
        <ScrollView>
          {rankers
            .slice(3, 50)
            .map((ranker: Record<string, any>, index: number) => (
              <TouchableOpacity
                key={index + 4}
                onPress={() =>
                  navigation.navigate("CollectionOtherScreen", {
                    id: 1686835822,
                  })
                }
              >
                <Text
                  style={{
                    backgroundColor: "skyblue",
                    marginBottom: 3,
                    borderRadius: 3,
                    padding: 3,
                  }}
                >
                  {index + 4}등 {ranker.nickname} {ranker.length}cm
                </Text>
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
    textAlign: "center",

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
    backgroundColor: "#FFFFFF",
  },
});
