import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, FlatList, SectionList, Alert } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function UserList({route, navigation}){

    const data = route.params;

    const [users, setUsers] = useState([]);

    fetch('https://mysnapchat.epidoc.eu/user', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + data.token,
        'X-FP-API-KEY': 'android',
        'Content-Type': 'application/json'
    }
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
    .then(data => setUsers(data.data))
    return (
        <>
        <ScrollView>
        <View style = {styles.banner}>
                    <Text style={{fontSize: 18}}>Liste des utilisateurs enregistrés</Text>
                    </View>
            {users.map((parametre) => {
                return (
                <View style = {{padding: 20, borderSolid: 'solid', borderBottomColor: 'gray',  borderBottomWidth: 2}} key={parametre._id}>
                    <BouncyCheckbox text = {parametre.username}></BouncyCheckbox>
                </View>
                    
                );
            })}
        </ScrollView>
            </>
    )
}

const styles = StyleSheet.create({
    users : {
        padding : 15,
        fontSize : 20,

    },

    display : {
        
        justifyContent: 'center',
        alignItems: 'center',
    },

    banner : {
        backgroundColor: 'yellow',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})