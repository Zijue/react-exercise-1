import { AnyAction } from 'redux';

export interface HomeState {

}
let initialState: HomeState = {};
function reducer(state: HomeState = initialState, action: AnyAction): HomeState {
    return state;
}
export default reducer;