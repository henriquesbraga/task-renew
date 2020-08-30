import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Auth from './screens/Auth';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu';
import AuthOrApp from './screens/AuthOrApp';
import commonStyles from './CommonStyles';


const menuConfig ={
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle:{
            color: '#006'
            
        }
    }
}

const menuRoutes ={
    Today: {
        name: 'Today',
        screen: (props) => <TaskList 
                            title='Hoje' 
                            {...props} 
                            daysAhead={0}
                            drawerIconColor={'#000'}
                            visibleTasksIconColor={'#FFF'}/>,
        navigationOptions:{
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: (props) => <TaskList 
                            title='Amanhã' 
                            {...props} 
                            daysAhead={1}
                            drawerIconColor={'#FFF'}
                            visibleTasksIconColor={'#000'}/>,
        navigationOptions:{
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: (props) => <TaskList 
                            title='Semana' 
                            {...props} 
                            daysAhead={7}
                            drawerIconColor={'#FFF'}
                            visibleTasksIconColor={'#000'}/>,
        navigationOptions:{
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: (props) => <TaskList 
                            title='Mês' 
                            {...props} 
                            daysAhead={30}
                            drawerIconColor={'#FFF'}
                            visibleTasksIconColor={'#FFF'}/>,
        navigationOptions:{
            title: 'Mês'
        }
    }
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes ={
    AuthOrApp:{
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Auth:{
        name: 'Auth',
        screen: Auth
    },
    Home:{
        name: 'Home',
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
});

export default createAppContainer(mainNavigator);