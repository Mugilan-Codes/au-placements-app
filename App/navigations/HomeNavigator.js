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

const transitonConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const screenOptions = {
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
  gestureEnabled: true,
  gestureResponseDistance: {horizontal: 150, vertical: 150},
  gestureDirection: 'vertical-inverted',
  transitionSpec: {open: transitonConfig, close: transitonConfig},
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator mode="modal" screenOptions={screenOptions}>
      <HomeStack.Screen name={Routes.MAIN} component={MainStackNavigator} />
      <HomeStack.Screen
        name={Routes.MODAL}
        component={ModalScreen}
        options={{headerShown: true, headerTitle: 'Modal'}}
      />
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
