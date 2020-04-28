import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Image, Button, TouchableOpacity, Share, Platform} from 'react-native'
import { getFilmDetail, getImageFromApi } from '../API/TMDBapi'
import EnlargeShrink from './EnlargeShrink'

class FilmDetail extends React.Component
{
    static navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => {
            const film = navigation.getParam('film')
            if (Platform.OS === 'ios' && film !== undefined) {
                return (
                    <TouchableOpacity
                        onPress={navigation.getParam('share')}
                    >
                        <Image 
                            style={styles.share_icon}
                            source={require('../Images/share.png')}
                        />
                    </TouchableOpacity>
                )
            }
        }
    }
  }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true,
        }
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

    _share = () => {
        const film = this.state.film
        if (film !== undefined) {
            Share.share({
                message: film.overview
            })
        }
    }

    _displayShareButton = () => {
        const film = this.state.film
        if (film !== undefined && Platform.OS === 'android') {
            return (
                <TouchableOpacity 
                    style={styles.share_container}
                    onPress={this._share}
                >
                    <Image 
                        style={styles.share_icon}
                        source={require('../Images/share.png')}
                    />
                </TouchableOpacity>
            )
        }
    }

    _toogleFavorite() {
        const action = {type:  'TOOGLE_FAVORITE', value: this.state.film}
        this.props.dispatch(action)
    }

    _displayFavorite() {
        let image = require('../Images/no_favorite.png')
        const isInFavorites = this.props.favoritesFilm.findIndex(item => this.state.film.id === item.id)
        if (isInFavorites !== -1) {
            image = require('../Images/favorite.png')
        } 

        return (
            <EnlargeShrink isInFavorites={isInFavorites !== -1}>
                <Image
                    style={styles.favorite_image}
                    source={image}
                />  
            </EnlargeShrink>
        )
    }

    _displayFilm = () =>  {
        const film = this.state.film
        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toogleFavorite()}
                    >
                        {this._displayFavorite()}
                    </TouchableOpacity>
                    <Text style={styles.title}>{film.title}</Text>
                    <Text style={styles.description}>{film.overview}</Text>
                    <Text style={styles.info}>Sortie le {moment(film.release_date).format('DD-MM-YYYY')}</Text>
                    <Text style={styles.info}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.info}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.info}>Budget : {numeral(film.budget).format('$0,0.00')}</Text>
                </ScrollView>
            )
        } 
    }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        getFilmDetail(id).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => {
                navigation.setParams({
                    film: this.state.film,
                    share: this._share
                })
            })
        })
    }

    componentDidUpdate() {
        console.log(this.props.favoritesFilm)
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayShareButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    description: {
        fontStyle: 'italic',
        padding: 5,
        textAlign: 'justify',
        marginBottom: 20,
    },
    info: {
        padding: 5,
        fontWeight: 'bold',
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null,
    },
    share_container: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        alignItems: 'center',
        justifyContent: 'center',
    },
    share_icon: {
        width: 30,
        height: 30,
    }
    
})

const mapStateToProps = state => ({
    favoritesFilm: state.toogleFavorite.favoritesFilm
})
export default connect(mapStateToProps)(FilmDetail)