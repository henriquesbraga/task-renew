import React from 'react';
import { Platform, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import { Gravatar } from 'react-native-gravatar';
import CommonStyles from '../CommonStyles';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default (props) => {

    const optionsGravatar ={
        email: props.navigation.getParam('email'),
        secure: true
    }

    const logout = () =>{
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData');
        props.navigation.navigate('AuthOrApp');
    }

    return(
        <ScrollView>

            <View style={styles.header}>

                <Gravatar style={styles.avatar}
                options={optionsGravatar}
                />

                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.navigation.getParam('name')}
                    </Text>
                    
                    <Text style={styles.email}>
                        {props.navigation.getParam('email')}
                    </Text>
                </View>
                
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='log-out' size={30} color='#800' />
                    </View>

                </TouchableOpacity>
            </View>

            <DrawerItems {...props}/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header:{
        borderBottomWidth: 1,
        marginTop: 10,
        borderColor: '#DDD',
        flexDirection: 'row'
    },

    avatar:{
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
    },
    userInfo:{
        marginLeft: 10,
        marginTop: 12
    },
    name:{
        fontFamily: CommonStyles.fontFamily,
        fontSize: 20,
        marginBottom: 5,
        color: CommonStyles.colors.mainText
    },
    email:{
        fontFamily: CommonStyles.fontFamily,
        fontSize: 15,
        color: CommonStyles.colors.subText,
        marginBottom: 10,
    },
    logoutIcon:{
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 20,
    },
})