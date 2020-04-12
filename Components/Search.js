import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {
    render () {
        return (
            <View style={styles.mainContainer}>
                <TextInput placeholder="Titre du film" style={styles.textInput}/>
                <Button style={{height: 50 }} title="Rechercher" onPress={() => {}}/>
                <FlatList
                    data={films}
                    renderItem={({ item }) => <FilmItem film={item}/>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}

const styles= StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 40
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 5,
    }
})

export default Search