import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

import storage from '../storage.js';

function HomePage({navigation}){

  const [isLog, setLog] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    storage.load({key: 'Id'})
    .then(ret => {
      setLog(true);
      setId(ret.id);
      setToken(ret.token);
    })
    .catch(error => setLog(false))
  }, [])

    return(
      <View style ={styles.container}>

        <Image style ={ imgSize.img} source={require('my_snapchat/assets/snapchat.png')} />       
        {
          isLog ? 
          (<View style={btn.logs}>
            <TouchableHighlight >
              <Button title="Charger le profil" onPress={()=> navigation.navigate('Dashboard', {
                id: id,
                token: token
              })}></Button>
            </TouchableHighlight>
            
          </View>)
          :
          (<View style={btn.logs} >
          <TouchableHighlight style={{ backgroundColor: '#0eacfb', padding: 10, borderRadius: 50, alignItems: 'center'}}>
            <Text style={{color: 'white'}} title='Connexion' onPress={()=> navigation.navigate('Login')}>Se connecter</Text> 
          </TouchableHighlight>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 20, }}>
            <Text style={{color: 'black'}} title='Inscription' onPress={()=> navigation.navigate('Register')}>Inscription</Text>  
            <Text>|</Text>
            <Text style={{color: 'black'}} title='Inscription' onPress={()=> navigation.navigate('Login')}>Changer de compte </Text>  
          </View>
          </View>)

        }
      </View>
    )
}

const style = StyleSheet.create({
  btn: {
      margin: 40,
  },
});

const font = StyleSheet.create({
  style: {
    fontSize: 30,
    fontWeight: 500,
  },
});

const btn = StyleSheet.create({
    logs: {
        gap: 30,
        borderRadius: 4,
        padding: 20,
        justifyContent:'center',
        
    },
});

const flex = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

    },
});

const imgSize = StyleSheet.create({
    img: {
      margin: 50,
      width: 80,
      height: 80,
    },
});
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E200',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
});
export default HomePage;