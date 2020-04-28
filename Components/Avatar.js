import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'

class Avatar extends React.Component
{
    constructor(props) {
        super(props)
    }


    _avatarCliked = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                const action = {type:  'CHANGE_AVATAR', avatar: source}
                this.props.dispatch(action)
            }
        });
    }

    render() {
        console.log(this.props)
        return (
            <TouchableOpacity
                style={styles.avatar_container}
                onPress={this._avatarCliked}
            >
                <Image
                    style={styles.avatar}
                    source={this.props.avatar}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    avatar_container: {
        width: 100,
        height: 100,    
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    },
})

const mapStateToProps = state => ({
    avatar: state.changeAvatar.avatar
})
export default connect(mapStateToProps)(Avatar)