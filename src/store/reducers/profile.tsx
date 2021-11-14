import { AnyAction } from 'redux';

export interface ProfileState {

}
let initialState: ProfileState = {};
function reducer(state: ProfileState = initialState, action: AnyAction): ProfileState {
    return state;
}
export default reducer;