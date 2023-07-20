const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: [],
    filteredHeroes: [],
    filterSelected: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'DELETE_HERO': 
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload),
                filteredHeroes: state.filteredHeroes.filter(hero => hero.id !== action.payload)
            }
        case 'ADD_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                filteredHeroes: [...state.filteredHeroes, action.payload]
            }
        case 'FILTER_HEROES':
            return {
                ...state, 
                filterSelected: true,
                filteredHeroes: action.payload === 'all' ? 
                                state.heroes : 
                                state.heroes.filter(hero => hero.element === action.payload)
            }
        default: return state
    }
}

export default reducer;