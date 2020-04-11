import React from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
class Search extends React.Component {
    render () {
        return (
            <View style={styles.mainContainer}>
                <TextInput placeholder="Titre du film" style={styles.textInput}/>
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => {}}/>
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