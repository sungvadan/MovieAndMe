import React from 'react'
import FilmList from './FilmList'

class FavoriteList extends React.Component
{
    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                isFavoritePage={true}
            />
        )
    }
}

export default FavoriteList