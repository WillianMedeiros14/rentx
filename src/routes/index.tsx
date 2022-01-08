import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { AppTabsRoutes } from './app.tabs.routes';
import { AuthRoutes } from './auth.routes';

export function Routes(){
    const { user } = useAuth();
    return(
        <NavigationContainer>
           { user.id ? <AppTabsRoutes /> : <AuthRoutes />}
           {/* { user ? <AuthRoutes /> : <AppTabsRoutes />} */}
        </NavigationContainer>
    );
}