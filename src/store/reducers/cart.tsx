import { AnyAction } from 'redux';

export interface CartState {

}
let initialState: CartState = {};
function reducer(state: CartState = initialState, action: AnyAction): CartState {
    return state;
}
export default reducer;