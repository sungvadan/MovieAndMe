import React from 'react'
import { View, StyleSheet } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'
import Avatar from './Avatar'

class FavoriteList extends React.Component
{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <FilmList
                    style={styles.favoriteList}
                    isFavoritePage={true}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar_container: {
        alignItems: 'center',
    }
})

export default FavoriteList