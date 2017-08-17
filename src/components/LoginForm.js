import React, {Component} from 'react';
import {Text} from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {

    state = { email: '', password: '', error: '', loading: false };

    onButtonPress(){
        const { email, password } = this.state;
        this.setState({error:'', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password).
                then(this.onLoginSuccess.bind(this)).
                catch((ex) => {
                   this.onLoginFail.bind(this)(ex);
                })
            });
    }

    onLoginSuccess(){
        this.cleanState();
    }

    onLoginFail(ex){
        console.log(ex);
        this.setState({error: ex.message, loading: false});
    }

    cleanState(){
        this.setState({ email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    renderButton(){
        if(this.state.loading){
            return (<Spinner size='small' />);
        }

        return (<Button onPress={this.onButtonPress.bind(this)}>Log in</Button>);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="email@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Input
                        secureTextEntry={true}
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;