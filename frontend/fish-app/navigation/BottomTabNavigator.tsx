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
import WaitResponseScreen from "../screens/WaitResponseScreen";
import InputDetailScreen from "../screens/InputDetailScreen";
import ShowResultScreen from "../screens/ShowResultScreen";

import {
  BottomTabParamList,
  CollectionParamList,
  RankingParamList,
  HomeParamList,
  ProfileParamList,
  AddParamList,
} from "../types";

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
        name="Collection"
        component={CollectionNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconFontAwesome5 name="fish" color={color} />
          ),
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
      <HomeStack.Screen
        name="KakaoLoginScreen"
        component={KakaoLoginScreen}
        options={{ headerTitle: "Home" }}
      />
    </HomeStack.Navigator>
  );
}

const CollectionStack = createStackNavigator<CollectionParamList>();

function CollectionNavigator() {
  return (
    <CollectionStack.Navigator>
      <CollectionStack.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{ headerTitle: "Collection" }}
      />
      <CollectionStack.Screen
        name="CollectionItemScreen"
        component={CollectionItemScreen}
      />
      <CollectionStack.Screen name="CommentScreen" component={CommentScreen} />
      
      <AddStack.Screen name="InputDetailScreen" component={InputDetailScreen} />
    </CollectionStack.Navigator>
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
      <AddStack.Screen name="CollectionScreen" component={CollectionScreen}/>
    </AddStack.Navigator>
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
