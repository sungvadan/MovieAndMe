import React from 'react'
import { connect } from 'react-redux'
import {FlatList} from 'react-native'
import FilmItem from './FilmItem'

class FilmList extends React.Component
{
    _displayDetailForFilm = (id) => {
        this.props.navigation.navigate('FilmDetail', {id})
    }

    render () {
        return (
            <FlatList
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                renderItem={({ item }) => <FilmItem 
                    displayDetailForFilm={this._displayDetailForFilm} 
                    film={item} 
                    isFavorite={this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1}/>
                }
                keyExtractor={item => item.id.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.isFavoritePage && this.props.page < this.props.totalPages) {
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const mapStateToProps = state => ({
    favoritesFilm: state.favoritesFilm
})
export default connect(mapStateToProps)(FilmList)