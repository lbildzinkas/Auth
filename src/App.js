import React, {Component} from 'react';
import {View} from 'react-native';
import { Header } from './components/common';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";

class App extends Component{

    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyBzb1w8SMaN59P1P7diRG-L35b8jnoIDBA',
            authDomain: 'auth-9c23e.firebaseapp.com',
            databaseURL: 'https://auth-9c23e.firebaseio.com',
            projectId: 'auth-9c23e',
            storageBucket: 'auth-9c23e.appspot.com',
            messagingSenderId: '360792872794'
        });
    }

    render(){
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm/>
            </View>
        );
    }
}

export default App;