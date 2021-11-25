import { AnyAction } from 'redux';
import * as actionTypes from '../action-types';
import { Slider } from '@/typings/slider';

export interface HomeState {
    currentCategory: string;
    sliders: Slider[];
}
let initialState: HomeState = {
    currentCategory: 'all',
    sliders: []
};
function reducer(state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            // state.currentCategory = action.payload;
            return {
                ...state,
                currentCategory: action.payload
            };
        case actionTypes.GET_SLIDERS:
            return {
                ...state,
                sliders: action.payload.data
            }
        default:
            return state;
    }
}
export default reducer;