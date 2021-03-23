import * as React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { rankingApi } from "../utils/axios";

import { Text, View } from "../components/Themed";

import RankerBigView from "../components/ranking/RankerBigView";
import RankerSmallView from "../components/ranking/RankerSmallView";

export default function Home() {
  const [rankerView, setRankerView] = React.useState(0);
  const [rankers, setRankers] = React.useState([]);
  const [cache, setCache] = React.useState({});
  if (cache.todos === undefined) {
    rankingApi.getRanking("todos").then((response: []) => {
      setRankers(response);
      setCache({ ...cache, todos: response });
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.instructions}>
          포켓피쉬 영광의 Top 3를 만나보세요!
        </Text>
      </View>
      {!rankerView ? (
        <View style={styles.contentView}>
          {rankers.slice(0, 3).map((ranker: Record<string, any>) => (
            <RankerBigView
              key={ranker.id}
              rank={String(ranker.id)}
              title={ranker.title}
            />
          ))}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {rankers.slice(0, 50).map((ranker: Record<string, any>) => (
            <RankerSmallView
              key={ranker.id}
              rank={String(ranker.id)}
              title={ranker.title}
            />
          ))}
        </ScrollView>
      )}
      <View style={styles.footerView}>
        <TouchableOpacity
          onPress={() => {
            if (!rankerView) {
              setRankerView(1);
            } else {
              setRankerView(0);
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Top 50 보기</Text>
        </TouchableOpacity>
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
