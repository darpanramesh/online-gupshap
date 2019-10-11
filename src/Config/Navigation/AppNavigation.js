import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Login, Chat, Discover, People, Home,MessagePage, UserDetail } from '../../Screens/index'
import Icon from 'react-native-vector-icons/AntDesign';

import Ionicons from 'react-native-vector-icons/Ionicons';


const TabNavigator = createBottomTabNavigator({
    People: {
        screen: People,
        navigationOptions: {
            title: "Peoples",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" size={25} color="grey" />

            )
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            title: "messages",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="message1" size={25} color="grey" />

            )
        },

    },
    // Discover: {
    //     screen: Discover,
    //     navigationOptions: {
    //         title: "Discover",
    //         tabBarIcon: ({ tintColor }) => (
    //             <Ionicons name="compass" size={25} color="grey" />

    //         )
    //     },
    // }
},
    {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);


const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            header: null,
        }
    },
    MessagePage: {
        screen:MessagePage
    },
    UserDetail: {
        screen: UserDetail
    }

});

export default createAppContainer(AppNavigator)


// Tab Novigation


// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { Home, About, Contact } from '../../Screens/index'






    // Drawer Navigation


// import { createAppContainer } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { Home, About, Contact } from '../../Screens/index'



// const MyDrawerNavigator = createDrawerNavigator({
//     Home: {
//         screen: Home,
//     },
//     About: {
//         screen: About,
//     },
//     Contact: {
//         screen: Contact
//     }
// });

// export default createAppContainer(MyDrawerNavigator);