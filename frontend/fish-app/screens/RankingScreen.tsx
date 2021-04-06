import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { rankingApi } from "../utils/axios";

import { Text, View } from "../components/Themed";

import SegmentedControlTab from "react-native-segmented-control-tab";

import RankerView from "../components/ranking/RankerView";

export default function RankingScreen({ navigation }) {
  const [rankers, setRankers] = useState([]);
  const [cache, setCache] = useState({});
  const [tab1Index, setTab1Index] = useState(0);
  const [tab2Index, setTab2Index] = useState(0);
  useEffect(() => {
    updateRanker(tab1Index, tab2Index);
  }, [tab1Index, tab2Index]);

  function selectedFish() {
    let fish = "";
    let fish_id = 0;
    switch (tab1Index) {
      case 0:
        switch (tab2Index) {
          case 0:
            fish = "flatfish";
            fish_id = 1;
            break;
          case 1:
            fish = "rockfish";
            fish_id = 3;
            break;
          case 2:
            fish = "red_snapper";
            fish_id = 2;
            break;
        }
        break;
      case 1:
        switch (tab2Index) {
          case 0:
            fish = "crucian_carp";
            fish_id = 4;
            break;
          case 1:
            fish = "bass";
            fish_id = 6;
            break;
          case 2:
            fish = "golden_mandarin_fish";
            fish_id = 5;
            break;
        }
        break;
    }
    return [fish, fish_id];
  }
  function updateRanker(tab1, tab2) {
    const [fish, fish_id] = selectedFish();
    console.log(fish, fish_id);
    if (cache[fish_id] === undefined) {
      console.log("uncached data!");
      rankingApi.getRanking(fish_id).then((response: []) => {
        const updatedCache = cache;
        updatedCache[fish_id] = response.data;
        setCache(updatedCache);
        setRankers(response.data);
      });
    } else {
      console.log("cached data!");
      setRankers(cache[fish_id]);
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
              : ["붕어", "배스", "쏘가리"]
          }
          selectedIndex={tab2Index}
          onTabPress={(index) => setTab2Index(index)}
          tabsContainerStyle={{
            width: "90%",
          }}
        />
      </View>
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
