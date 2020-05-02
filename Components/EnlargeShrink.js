import React from 'react'
import { Animated, Image} from 'react-native'

class EnlargeShrink extends React.Component
{
    constructor(props) {
        super(props)
        
        this.state = {
            width: new Animated.Value(40),
            height: new Animated.Value(40),
        }
    }

    _enlarge = () => {
        Animated.parallel([
            Animated.spring(
                this.state.width,
                {
                    toValue: 70,
                    tension: 8,
                    friction: 3,
                }
            ),
            Animated.spring(
                this.state.height,
                {
                    toValue: 70,
                    tension: 8,
                    friction: 3,
                }
            ),
        ]).start()
    }

    _shrink = () => {
        Animated.parallel([
            Animated.spring(
                this.state.width,
                {
                    toValue: 40,
                    tension: 8,
                    friction: 3,
                }
            ),
            Animated.spring(
                this.state.height,
                {
                    toValue: 40,
                    tension: 8,
                    friction: 3,
                }
            ),
        ]).start()
    }

    componentDidMount() {
        console.log(this.props.isInFavorites);
        if (this.props.isInFavorites) {
            this._enlarge()
        } else {
            this._shrink()
        }
    }

    componentDidUpdate() {
        if (this.props.isInFavorites) {
            console.log('hahahahaha')
            this._enlarge()
        } else {
            this._shrink()
        }
    }

    render() {
        return (
            <Animated.View
                style={{width: this.state.width, height: this.state.height}}
            >
                {this.props.children}
            </Animated.View>
        )
    }
}

export default EnlargeShrink