import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from 'react-native'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import FavoriteList from '../Components/FavoriteList'


const HomeNavigator =  createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const FavoriteNavigator =  createStackNavigator({
    FavoriteList: {
        screen: FavoriteList,
        navigationOptions: {
            title: 'Favorite'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const AppNavigator = createBottomTabNavigator(
    {
        HomeNavigator: {
            screen: HomeNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/search.png')}
                        style={styles.icon}/>
                }
            },
        },
        FavoriteNavigator: {
            screen: FavoriteNavigator,
            navigationOptions: {
                tabBarIcon: () => (
                    <Image
                        source={require('../Images/favorite.png')}
                        style={styles.icon}
                    />
                )
            }
        },
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true,
        },
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    }
})
export const AppContainer = createAppContainer(AppNavigator);
