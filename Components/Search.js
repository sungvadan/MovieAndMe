import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBapi'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false,
        }
        this.searchText = ''
        this.page = 0
        this.totalPages = 0
        // this._loadFilms = this._loadFilms.bind(this) We can use arrow function instead of it
    }
    _loadFilms = () => {
        this.setState({ isLoading: true})
        if (this.searchText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchText, this.page+1).then(data => {
                this.totalPages = data.total_pages
                this.page = data.page
                 this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false,
                })
            })
        }
    }
    _searchTextInputChanged(text) {
        this.searchText = text
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
    }
    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            console.log('nombre de films ' + this.state.films.length)
            this._loadFilms( )
        })
    }

    render () {
        console.log('RENDER')
        console.log(this.state.isLoading)
        return (
            <View style={styles.mainContainer}>
                <TextInput 
                    placeholder="Titre du film test" 
                    style={styles.textInput}
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={(text) => this._searchFilms(text)} 
                />
                <Button style={{height: 50 }} title="Rechercher" onPress={() => this._searchFilms()}/>
                <FilmList
                    films={this.state.films}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPages={this.totalPages}
                    navigation={this.props.navigation}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles= StyleSheet.create({
    mainContainer: {
        flex: 1    
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 5,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Search
