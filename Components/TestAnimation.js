import React from 'react'
import { View , StyleSheet, Animated, Easing } from 'react-native'

class TestAnimation extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            topPosition: new Animated.Value(0)
        }
    }

    _fall = () => {
        Animated.spring(this.state.topPosition, {
            toValue: 100,
            speed: 4,
            bounciness: 30
        }).start()
    }

    componentDidMount = () => {
        this._fall()
    }
    render() {
        return (
            <View style={styles.main_container}>
                <Animated.View style={[styles.content, {top : this.state.topPosition}]}>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
    }
})

export default TestAnimation