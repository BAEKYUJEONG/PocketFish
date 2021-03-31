import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { Text, View } from "../Themed";

export default function RankerBigView(props: any) {
  const { rankers } = props;
  return (
    <View style={styles.container}>
      <View style={styles.top3}>
        <TouchableOpacity
          style={styles.silver}
          onPress={() => alert("clicked")}
        >
          <Text style={{ textAlign: "center" }}>2등</Text>
          {rankers.length > 1 ? (
            <>
              <Text style={{ textAlign: "center" }}>{rankers[1].nickname}</Text>
              <Text style={{ textAlign: "center" }}>{rankers[1].length}cm</Text>
            </>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.gold} onPress={() => alert("clicked")}>
          <Text style={{ textAlign: "center" }}>1등</Text>
          {rankers.length > 0 ? (
            <>
              <Text style={{ textAlign: "center" }}>{rankers[0].nickname}</Text>
              <Text style={{ textAlign: "center" }}>{rankers[0].length}cm</Text>
            </>
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bronze}
          onPress={() => alert("clicked")}
        >
          <Text style={{ textAlign: "center" }}>3등</Text>
          {rankers.length > 2 ? (
            <>
              <Text style={{ textAlign: "center" }}>{rankers[2].nickname}</Text>
              <Text style={{ textAlign: "center" }}>{rankers[2].length}cm</Text>
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
                onPress={() => alert("clicked")}
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
  top3: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
  },
  top50: {
    flex: 3,
  },
  gold: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#C9B037",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  silver: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 15,
    flex: 1,
    backgroundColor: "#D7D7D7",
  },
  bronze: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 30,
    flex: 1,
    backgroundColor: "#AD8A56",
  },
});
