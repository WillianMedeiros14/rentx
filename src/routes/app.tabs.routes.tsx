import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from './app.stack.routes'

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabsRoutes(){
    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text_detail,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                   paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                   height: 78,
                   backgroundColor: theme.colors.background_primary
                }
            }}
        >
            <Screen
                name="HomeTabs"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg
                            width={24}
                            height={24}
                            fill={color}
                        />
                    )
                }}
            />

            <Screen
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CarSvg
                            width={24}
                            height={24}
                            fill={color}
                        />
                    )
                }}
            />

            <Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PeopleSvg
                            width={24}
                            height={24}
                            fill={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}