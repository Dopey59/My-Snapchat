import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import storage from '../storage';

export default function Dashboard({ route, navigation }) {
  const data = route.params;
  const [username, setUsername] = useState('');
  const [resourcePath, setResourcePath] = useState({});

  useEffect(() => {
    fetch("https://mysnapchat.epidoc.eu/user" + data.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + data.token,
        'X-FP-API-KEY': 'android',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.json().data);
      }
    })
    .then(data => {
      setUsername(data.data.username);
    })
    .catch(error => console.error(error))
  }, []);

  async function selectFile(){
    const options = {
      mediaTypes: "All",
      base64: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options)
    setTimeout(() => {
      navigation.navigate('UserList', {
        id: data.id,
        username: data.username,
        token: data.token,
        uri: result.uri
      })
    }, 1000);
  };

  async function cameraLaunch(){
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const response = await ImagePicker.launchCameraAsync(options)
    setTimeout(() => {
      navigation.navigate('UserList', {
        id: data.id,
        username: data.username,
        token: data.token,
        uri: response.uri
      })
    }, 1000);
  };

  function deconnect(event){
    event.preventDefault();
    storage.remove({
      key: 'Id',
    });
    setTimeout(function() {
      navigation.navigate('HomePage');
    }, 1000);
  };

  return (
    <>
    <View style={{backgroundColor: 'white', padding: 20, color:'black', alignItems:'center', justifyContent:'center'}} >
    <Text style={{fontSize: 18}} title="Se deconnecter" onPress={deconnect}>Se déconnecter</Text>
    </View>
    <View style={styles.container}>
      <Image style={styles.imgSize.img} source={require('my_snapchat/assets/snapchat.png')} />
      <Text style={styles.dashboard}>Snap ici </Text>
      <View style={styles.container}>

        <TouchableHighlight onPress={selectFile} style={{ backgroundColor: '#0eacfb', padding: 10, borderRadius: 50, alignItems: 'center'}}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableHighlight>
        <Text style={{padding: 10}}>Ou</Text>
        <TouchableHighlight onPress={cameraLaunch} style={{ backgroundColor: '#0eacfb', padding: 10, borderRadius: 50, alignItems: 'center'}}>
          <Text style={styles.buttonText}>Appareil photo</Text>
          </TouchableHighlight>
      </View>
    </View>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E200',
    padding: 30,
  },

  dashboard: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  dashboard : {
    fontSize: 18,


    color:'black',

    padding: 1,

    justifyContent: 'center',

    alignItems: 'center',    
  },

  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    padding: 5
  },
  Text: {
    fontSize: 16,
    marginTop: 10,
  },
  imgSize: {
    img: {
      width: 70,
      height: 70,
      paddingTop: 10
    },
  },
};