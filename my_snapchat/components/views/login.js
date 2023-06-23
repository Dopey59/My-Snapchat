import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import storage from '../storage.js';
function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [remember, setRemember] = useState(false);

    function Click(event, remember)
    {
        event.preventDefault();
        fetch("https://mysnapchat.epidoc.eu/user", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password})
        })
        .then(response => {
            if(response.status === 200)
            {
                return response.json();
            }
            else
            {
                throw new Error(response.json().data)
            }
        })
        .then(data => {
            if(remember === true)
            {
                storage.save({
                    key: "Id",
                    data: {
                        id: data.data._id,
                        token: data.data.token,
                        pdp: second_data.data.profilePicture, 
                        username: second_data.data.username
                    },
                    expires: null
                })
            }

            alert('Content de te revoir, ' + data.data.username + " !");
          
            navigation.navigate('Dashboard', {
                id: data.data._id,
                username: data.data.username,
                token: data.data.token
            })
        })
        .catch(error => console.error(error))
    }

    return(
       <View style={style.container}>
            <View style = {flex.container}>
            <Text style={font.style}>Se connecter</Text>
            <Image style ={imgSize.img} source={require('my_snapchat/assets/snapchat.png')} />
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder='Entrez votre e-mail' />
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password} placeholder='********************' />
            <BouncyCheckbox color='black'text="Se souvenir de moi!" value={remember} onPress={() => setRemember(!remember)} />
            </View>
            <View style={btn.logs} >
                
            <TouchableHighlight style={{ backgroundColor: 'black', padding: 10, borderRadius: 50, alignItems: 'center' }}>
            <Text style={{color: 'white'}} onPress={(event) => Click(event, remember)}>Se connecter</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{ backgroundColor: '#0eacfb', padding: 10, borderRadius: 50, alignItems: 'center' }}>
            <Text style={{color: 'white'}} onPress={() => navigation.navigate('Register')}>Pas de compte ?</Text>
            </TouchableHighlight>
            </View>
       </View>
    )

}

export default Login;


const font = StyleSheet.create({
    style: {
        fontSize: 30,
        fontWeight: 500,
    },
});

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});

const btn = StyleSheet.create({
    logs: {
        gap: 30,
        width: 300,
        borderRadius: 10,
        padding: 30,
    },
});

const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E6E200',
    },
});

const flex = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding : 10,
    },
});

const imgSize = StyleSheet.create({
    img: {
      margin: 50,
      width: 100,
      height: 100,
    },
});