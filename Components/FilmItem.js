import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBapi'

class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        return (
            <View style={styles.container}>
               <Image 
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}
                />
               <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{film.title}</Text>
                    <Text style={styles.vote}>{film.vote_average}</Text>
                </View>
                <Text style={styles.body} numberofLines={6}>{film.overview} </Text>
                <Text style={styles.footer}>{`sortie ${film.release_date}`}</Text>
               </View>
            </View>
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
    }
})

export default FilmItem