import React, {Component} from 'react';
import {View} from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import {Card} from "./components/common/Card";
import {CardSection} from "./components/common/CardSection";

class App extends Component{

    state = { loggedIn: null};
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyBzb1w8SMaN59P1P7diRG-L35b8jnoIDBA',
            authDomain: 'auth-9c23e.firebaseapp.com',
            databaseURL: 'https://auth-9c23e.firebaseio.com',
            projectId: 'auth-9c23e',
            storageBucket: 'auth-9c23e.appspot.com',
            messagingSenderId: '360792872794'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }

        });
    }

    renderContent(){

        switch (this.state.loggedIn){
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
                break;
            case false:
                return (<LoginForm/>);
                break;
            default:
                return (<Spinner size="small"/>);
                break;
        }
    }

    render(){
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;