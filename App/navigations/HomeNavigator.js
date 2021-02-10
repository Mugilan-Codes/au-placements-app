import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../config';
import {DashboardScreen, ProfileScreen, ModalScreen} from '../screens';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={Routes.DASHBOARD}
      activeColor="#e91e63"
      style={styles.navigator}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}>
      <HomeStack.Screen name={Routes.MAIN} component={MainStackNavigator} />
      <HomeStack.Screen name={Routes.MODAL} component={ModalScreen} />
    </HomeStack.Navigator>
  );
};

// const HomeNavigator = () => {
//   return (
//     <Tab.Navigator
//       backBehavior="none"
//       initialRouteName={Routes.DASHBOARD}
//       activeColor="#e91e63"
//       style={styles.navigator}>
//       <Tab.Screen
//         name={Routes.DASHBOARD}
//         component={DashboardScreen}
//         options={{
//           tabBarLabel: 'Dashboard',
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={Routes.PROFILE}
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({color}) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: 'tomato',
  },
});

export default HomeNavigator;
