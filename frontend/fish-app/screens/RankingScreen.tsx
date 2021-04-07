import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { rankingApi } from "../utils/axios";

import { Text, View } from "../components/Themed";

import RankerView from "../components/ranking/RankerView";
import FishListView from "../components/ranking/FishListView";

export default function RankingScreen({ navigation }) {
  const [rankers, setRankers] = useState([]);
  const [cache, setCache] = useState({});
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    updateRanker(selected);
  }, [selected]);

  function updateRanker(selected: number) {
    if (cache[selected] === undefined) {
      rankingApi.getRanking(selected).then((response: []) => {
        const updatedCache = cache;
        updatedCache[selected] = response.data;
        setCache(updatedCache);
        setRankers(response.data);
      });
    } else {
      console.log("cached data!");
      setRankers(cache[selected]);
    }
  }
  return (
    <View style={styles.container}>
      <FishListView setSelected={setSelected} />
      <View style={styles.contentView}>
        {rankers ? (
          <RankerView rankers={rankers} navigation={navigation} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerView: {
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loginView: {
    flex: 1,
    marginVertical: 30,
    height: 1,
    width: "80%",
    alignItems: "flex-end",
  },
  instructions: {
    color: "#0476D9",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#0560CF",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#AED6E8",
  },
});
