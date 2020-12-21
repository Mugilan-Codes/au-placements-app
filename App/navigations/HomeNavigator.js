import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Routes} from '../config';
import {DashboardScreen} from '../screens';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: 'tomato',
  },
});

export default HomeNavigator;
