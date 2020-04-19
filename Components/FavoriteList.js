import React from 'react'
import FilmList from './FilmList'
import { connect } from 'react-redux'

class FavoriteList extends React.Component
{
    render() {
        return (
            <FilmList
                isFavoritePage={true}
                navigation={this.props.navigation}
            />
        )
    }
}

export default FavoriteList