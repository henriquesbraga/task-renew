import React, { Component} from 'react';
import{StatusBar, StyleSheet, View, ActivityIndicator} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || {}

        if (userData.token) {
            axios.defaults.headers.common['Authorization']
                = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render(){

        
        return (
            <View style={styles.contatiner}>
                <StatusBar backgroundColor='#000'  barStyle='light-content'/>
                <ActivityIndicator  color="#ffffff" size='large' animating={true}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contatiner:{
        flex: 1,
        justifyContent: 'center' , //main axis
        alignItems: 'center', //cross axis
        backgroundColor: '#000'
    }   
})