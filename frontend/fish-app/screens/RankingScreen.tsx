import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { rankingApi } from "../utils/axios";

import { Text, View } from "../components/Themed";

import SegmentedControlTab from "react-native-segmented-control-tab";

import RankerView from "../components/ranking/RankerView";
import RankerBigView from "../components/ranking/RankerBigView";
import RankerSmallView from "../components/ranking/RankerSmallView";

export default function Home() {
  const [rankerView, setRankerView] = useState(0);
  const [rankers, setRankers] = useState([]);
  const [cache, setCache] = useState({});
  const [tab1Index, setTab1Index] = useState(0);
  const [tab2Index, setTab2Index] = useState(0);
  useEffect(() => {
    updateRanker(tab1Index, tab2Index);
  }, [tab1Index, tab2Index]);

  function selectedFish() {
    let fish = "";
    switch (tab1Index) {
      case 0:
        switch (tab2Index) {
          case 0:
            fish = "flatfish";
            break;
          case 1:
            fish = "rockfish";
            break;
          case 2:
            fish = "red_snapper";
            break;
        }
        break;
      case 1:
        switch (tab2Index) {
          case 0:
            fish = "catfish";
            break;
          case 1:
            fish = "bass";
            break;
          case 2:
            fish = "golden_mandarin_fish";
            break;
        }
        break;
    }
    return fish;
  }
  function updateRanker(tab1, tab2) {
    const fish = selectedFish();
    console.log(fish);
    if (cache[fish] === undefined) {
      console.log("uncached data!");
      rankingApi.getRanking(1).then((response: []) => {
        const updatedCache = cache;
        updatedCache[fish] = response.data;
        setCache(updatedCache);
        setRankers(response.data);
      });
    } else {
      console.log("cached data!");
      setRankers(cache[fish]);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <SegmentedControlTab
          values={["바다", "민물"]}
          selectedIndex={tab1Index}
          onTabPress={(index) => {
            setTab1Index(index);
            setTab2Index(0);
          }}
          tabsContainerStyle={{
            width: "90%",
          }}
        />
        <SegmentedControlTab
          values={
            tab1Index === 0
              ? ["광어", "우럭", "참돔"]
              : ["메기", "배스", "쏘가리"]
          }
          selectedIndex={tab2Index}
          onTabPress={(index) => setTab2Index(index)}
          tabsContainerStyle={{
            width: "90%",
          }}
        />
      </View>
      <View style={styles.contentView}>
        <RankerView rankers={rankers} />
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
    width: "90%",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#AED6E8",
  },
});
