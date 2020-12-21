import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {Routes} from '../config';
import {DashboardScreen} from '../screens';

const Tab = createMaterialBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={Routes.DASHBOARD}
      activeColor="#e91e63"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardScreen}
        options={{tabBarLabel: 'Dashboard'}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
