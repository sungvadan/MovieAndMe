let initialState = {
    avatar: require('../../Images/faces.png')
}

function changeAvatar(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'CHANGE_AVATAR':
            if (action.avatar !== undefined) {
                nextState = {
                    ...state,
                    avatar: action.avatar
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default changeAvatar