import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBapi'

class FilmItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAnimation: new Animated.Value(Dimensions.get('window').width)
        }
    }
    _displayFavorite() {
        if (this.props.isFavorite) {
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/favorite.png')}
                />
            )
        } 
    }
    componentDidMount = () => {
        Animated.parallel([
            Animated.timing(this.state.leftAnimation, {
                toValue: 0,
                duration: 500,
            }),
            Animated.spring(this.state.leftAnimation, {
                toValue: 0,
                tension: 8,
                friction: 3,
            }),
        ]).start()
    }   
        
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <Animated.View style={{left: this.state.leftAnimation}}>
                <TouchableOpacity style={styles.container} onPress={() => displayDetailForFilm(film.id)}>
                <Image 
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                    />
                <View style={styles.content}>
                    <View style={styles.header}>
                        {this._displayFavorite()}
                        <Text style={styles.title}>{film.title}</Text>
                        <Text style={styles.vote}>{film.vote_average}</Text>
                    </View>
                    <Text style={styles.body} numberofLines={6}>{film.overview} </Text>
                    <Text style={styles.footer}>{`sortie ${film.release_date}`}</Text>
                </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 190,
    },
    image: {
        flex: 1,
        backgroundColor: 'grey',
        margin: 5,
    },
    content: {
        flex: 2,
        flexDirection: 'column',
        margin: 5,
    },
    header: {
        flexDirection: 'row',
        flex: 2,
    },
    title: {
        flex: 3,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 20,
    },
    vote: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'right',
    },
    body: {
        flex: 4,
    },
    footer: {
        flex: 1,
        textAlign: 'right',
    },
    favorite_image: {
        width: 20,
        height: 20,
    }
})

export default FilmItem