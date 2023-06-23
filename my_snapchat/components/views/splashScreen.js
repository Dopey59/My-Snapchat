import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function Splash() {
  useEffect(() => {
    SplashScreen.hide(); // Cache le splash screen lorsque le composant est monté
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image source={require('my_snapchat/assets/snapchat.png')} style={{ flex: 1, width: 200, height: 200 }} resizeMode="cover"/>
    </View>
  );
};

