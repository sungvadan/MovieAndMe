let initialState = {
    favoritesFilm: []
}

function toogleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOOGLE_FAVORITE':
            const isInFavorites = state.favoritesFilm.findIndex(item => action.value.id === item.id)
            if (isInFavorites !== -1) {
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== isInFavorites)
                }
            } else {
                nextState =  {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }

            return nextState || state
        default:
            return state
    }
}

export default toogleFavorite