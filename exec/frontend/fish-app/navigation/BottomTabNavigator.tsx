import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import colors from "../colors";
import useColorScheme from "../hooks/useColorScheme";
import CollectionScreen from "../screens/CollectionScreen";
import CollectionItemScreen from "../screens/CollectionItemScreen";
import CommentScreen from "../screens/CommentScreen";
import RankingScreen from "../screens/RankingScreen";
import CameraScreen from "../screens/CameraScreen";
import ImageCheckScreen from "../screens/ImageCheckScreen";
import InputDetailScreen from "../screens/InputDetailScreen";
import ShowResultScreen from "../screens/ShowResultScreen";

import {
  BottomTabParamList,
  RankingParamList,
  ProfileParamList,
  AddParamList,
} from "../types";
import OtherCollectionItemScreen from "../screens/OtherCollectionItemScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Ranking"
      tabBarOptions={{
        style: { height: 50 },
        activeTintColor: colors.default,
        inactiveTintColor: "white",
        inactiveBackgroundColor: colors.dark,
        activeBackgroundColor: "white",
      }}
    >
      <BottomTab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={AddNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="camera" color={color} size={25} />
          ),
          unmountOnBlur: true, // 클릭 시 새로고침.
        }}
      />
      <BottomTab.Screen
        name="Collection"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconMaterialCommunityIcons name="fishbowl" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconMaterialCommunityIcons(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={25} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const RankingStack = createStackNavigator<RankingParamList>();

function RankingNavigator() {
  return (
    <RankingStack.Navigator>
      <RankingStack.Screen
        name="RankingScreen"
        component={RankingScreen}
        options={{ headerTitle: "랭킹" }}
      />
      <RankingStack.Screen
        name="OtherCollectionItemScreen"
        component={OtherCollectionItemScreen}
        options={{ headerTitle: "상세보기" }}
      />
    </RankingStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{ headerTitle: "도감" }}
      />
      <ProfileStack.Screen
        name="CollectionItemScreen"
        component={CollectionItemScreen}
        options={{ headerTitle: "상세보기" }}
      />
      <ProfileStack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{ headerTitle: "댓글" }}
      />
      <ProfileStack.Screen
        name="InputDetailScreen"
        component={InputDetailScreen}
        options={{ headerTitle: "세부 내용 입력" }}
      />
    </ProfileStack.Navigator>
  );
}

const AddStack = createStackNavigator<AddParamList>();

function AddNavigator() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerTitle: "사진 촬영" }}
      />
      <AddStack.Screen
        name="ImageCheckScreen"
        component={ImageCheckScreen}
        options={{ headerTitle: "분석 요청" }}
      />
      <AddStack.Screen
        name="ShowResultScreen"
        component={ShowResultScreen}
        options={{ headerTitle: "분석 결과" }}
      />
      <AddStack.Screen
        name="InputDetailScreen"
        component={InputDetailScreen}
        options={{ headerTitle: "세부 내용 입력" }}
      />
    </AddStack.Navigator>
  );
}
