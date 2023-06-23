import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/views/splashScreen.js';
import HomePage from './components/views/homePage.js'
import Dashboard from './components/views/dashboard.js'
import Login from './components/views/login.js'
import Register from './components/views/register.js'

import UserList from './components/views/userList.js'

import React, {useEffect} from 'react';

const Stack = createNativeStackNavigator();


export default function App() {
  useEffect(() => {
    // Simulez un chargement de votre application
    setTimeout(() => {
      // Passez à l'écran principal ou à l'écran suivant
      // par exemple, en utilisant la navigation
      // Replacez le code ci-dessous par votre propre code de navigation
    }, 3000); // Attendez 3 secondes avant de passer à l'écran principal
  }, []);

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">    
      <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UserList" component={UserList} />
      </Stack.Navigator>      
    </NavigationContainer>
  );
  
}
