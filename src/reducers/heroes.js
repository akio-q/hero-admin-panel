import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    addHero
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(deleteHero, (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
        })
        .addCase(addHero, (state, action) => {
            state.heroes.push(action.payload); 
        })
        .addDefaultCase(() => {});
}) 

export default heroes;