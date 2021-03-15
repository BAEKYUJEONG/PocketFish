import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import FishBookScreen from "../screens/FishBookScreen";
import RankingScreen from "../screens/RankingScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  BottomTabParamList,
  FishBookParamList,
  RankingParamList,
  HomeParamList,
  ProfileParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FishBook"
        component={FishBookNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome5 name="fish" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
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
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const FishBookStack = createStackNavigator<FishBookParamList>();

function FishBookNavigator() {
  return (
    <FishBookStack.Navigator>
      <FishBookStack.Screen
        name="FishBookScreen"
        component={FishBookScreen}
        options={{ headerTitle: "FishBook" }}
      />
    </FishBookStack.Navigator>
  );
}

const RankingStack = createStackNavigator<RankingParamList>();

function RankingNavigator() {
  return (
    <RankingStack.Navigator>
      <RankingStack.Screen
        name="RankingScreen"
        component={RankingScreen}
        options={{ headerTitle: "Ranking" }}
      />
    </RankingStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </ProfileStack.Navigator>
  );
}
