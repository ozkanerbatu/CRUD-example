// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home';
import DetailScreen from './Screens/Detail';
import AddScreen from './Screens/Add';
const Stack = createNativeStackNavigator();

function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}  />
                <Stack.Screen name="Details" component={DetailScreen}  />
                <Stack.Screen name="Add" component={AddScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;