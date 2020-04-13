import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Image} from 'react-native'
import { getFilmDetail, getImageFromApi } from '../API/TMDBapi'

class FilmDetail extends React.Component
{
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

    _displayFilm = () =>  {
        const film = this.state.film
        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
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
            })
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
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
    }
})

export default FilmDetail