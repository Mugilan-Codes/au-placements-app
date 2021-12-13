import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from 'constants/routes';
import {DashboardScreen, ProfileScreen, ListingScreen} from 'screens';
import {useTheme} from 'contexts';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainStackNavigator = () => {
  const {theme} = useTheme();

  const tabIconSize = 26;

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={Routes.DASHBOARD}
      shifting={true}
      activeColor={theme.colors.active}
      inactiveColor={theme.colors.inactive}
      barStyle={{backgroundColor: theme.colors.barStyle}}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={tabIconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={tabIconSize}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Routes.MAIN}
        component={MainStackNavigator}
        options={{headerShown: false}}
      />
      <HomeStack.Screen name={Routes.LISTING} component={ListingScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
