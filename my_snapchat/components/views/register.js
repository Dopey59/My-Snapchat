import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import storage from '../storage.js';

export default function Register({navigation}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uri, setUri] = useState('');

    const [remember, setRemember] = useState(false);

    function Click(event, remember)
    {
        event.preventDefault();
        fetch("https://mysnapchat.epidoc.eu/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, username: username , profilePicture: uri, password: password})
        })
        .then(response => {
            if(response.status === 200)
            {
                return response.json();
            }
            else
            {
                throw new Error(response.json().data);
            }
        })
        .then(data => {
            fetch("https://mysnapchat.epidoc.eu/user", {
                method: "PUT", 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password})
            })
            .then(second_response => second_response.json())
            .then(second_data => {
                if(remember === true)
                {
                    storage.save({
                        key: "Id",
                        data: {
                            id: data._id,
                            token: second_data.data.token,
                            pdp: second_data.data.profilePicture,
                            username: second_data.data.username
                        },
                        expires: null
                    })
                }
                navigation.navigate('Dashboard', {
                    id: second_data.data._id,
                    token: second_data.data.token
                })
            })
        })
        .catch(err => alert(err));
    }

    async function selectFile(){
        const options = {
          mediaTypes: "All",
          base64: true,
        };
    
        const result = await ImagePicker.launchImageLibraryAsync(options)
        setUri(result.uri);
      };

    return (
        <View style={style.container}>
            <View style = {flex.container}>
            <Text style={font.style}>Inscription</Text>
            <Image style ={imgSize.img} source={require('my_snapchat/assets/snapchat.png')} />
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Entrez votre pseudo" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Entrez votre e-mail" />
            <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder="Entrez votre mot de passe" />
            <Button title="Choisir une image de profil" onPress={selectFile} />
            <BouncyCheckbox value={remember} text='Remember me !' onPress={() => setRemember(!remember)} />
            </View>
            <View style={btn.logs} >
            <TouchableHighlight style={{ backgroundColor: 'black', padding: 10, borderRadius: 50, alignItems: 'center' }}>
            <Text style={{color: 'white'}} title="Confirmer" onPress={(event) => Click(event, remember)}> Confirmer</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{ backgroundColor: '#0eacfb', padding: 10, borderRadius: 50, alignItems: 'center' }}>
            <Text style={{color: 'white'}} title="Déjà inscrit ?" onPress={() => navigation.navigate('Login')}>Déjà inscrit ?</Text>
            </TouchableHighlight>
            </View>
        </View>
    );
}

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
    },
});

const imgSize = StyleSheet.create({
    img: {
      margin: 50,
      width: 100,
      height: 100,
    },
});