import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes'

import { Home } from '../screens/Home';

import { MyCars } from '../screens/MyCars';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabsRoutes(){
    return(
        <Navigator
            screenOptions={{
                tabBarShowLabel: false
            }}
        >
            <Screen
                name="Home"
                component={AppStackRoutes}
            />

            <Screen
                name="Profile"
                component={Home}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}