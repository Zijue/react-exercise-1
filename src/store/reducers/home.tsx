import { AnyAction } from 'redux';
import * as actionTypes from '../action-types';

export interface HomeState {
    currentCategory: string;
}
let initialState: HomeState = {
    currentCategory: 'all'
};
function reducer(state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            // state.currentCategory = action.payload;
            return {
                ...state,
                currentCategory: action.payload
            };
        default:
            return state;
    }
}
export default reducer;