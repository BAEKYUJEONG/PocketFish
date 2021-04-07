import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import colors from "../colors";
import useColorScheme from "../hooks/useColorScheme";
import CollectionScreen from "../screens/CollectionScreen";
import CollectionItemScreen from "../screens/CollectionItemScreen";
import CommentScreen from "../screens/CommentScreen";
import RankingScreen from "../screens/RankingScreen";
import HomeScreen from "../screens/HomeScreen";
import KakaoLoginScreen from "../screens/auth/KakaoLoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
        activeTintColor: colors.default,
        inactiveTintColor: "white",
        inactiveBackgroundColor: colors.dark,
        activeBackgroundColor: "white",
      }}
    >
      {/* <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="camera" color={color} size={30} />
          ),
          unmountOnBlur: true, // 클릭 시 새로고침.
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
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
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFontAwesome5(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
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
        options={{ headerTitle: "Ranking" }}
      />
      <RankingStack.Screen
        name="OtherCollectionItemScreen"
        component={OtherCollectionItemScreen}
        options={{ headerTitle: "Detail" }}
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
        options={{ headerTitle: "Collection" }}
      />
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
      <ProfileStack.Screen
        name="CollectionItemScreen"
        component={CollectionItemScreen}
      />
      <ProfileStack.Screen name="CommentScreen" component={CommentScreen} />
      <ProfileStack.Screen
        name="InputDetailScreen"
        component={InputDetailScreen}
      />
    </ProfileStack.Navigator>
  );
}

const AddStack = createStackNavigator<AddParamList>();

function AddNavigator() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen name="CameraScreen" component={CameraScreen} />
      <AddStack.Screen name="ImageCheckScreen" component={ImageCheckScreen} />
      <AddStack.Screen name="ShowResultScreen" component={ShowResultScreen} />
      <AddStack.Screen name="InputDetailScreen" component={InputDetailScreen} />
    </AddStack.Navigator>
  );
}
