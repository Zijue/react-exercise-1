import LOGIN_TYPES from '@/typings/login-types';
import { User } from '@/typings/user';
import { AnyAction } from 'redux';
import * as actionTypes from '@/store/action-types';

export interface ProfileState {
    loginState: LOGIN_TYPES;
    user: User | null;
    error: string | null;
}
let initialState: ProfileState = {
    loginState: LOGIN_TYPES.UN_VALIDATE,
    user: null,
    error: null
};
function reducer(state: ProfileState = initialState, action: AnyAction): ProfileState {
    switch (action.type) {
        case actionTypes.VALIDATE:
            if (action.payload.success) { //当前用户已经登录
                state.loginState = LOGIN_TYPES.LOGIN_ED;
                state.user = action.payload.data;
                state.error = null;
            } else {
                state.loginState = LOGIN_TYPES.UN_LOGIN;
                state.user = null;
                state.error = action.payload;
            }
            return state;
        case actionTypes.CHANGE_AVATAR:
            state.user.avatar = action.payload;
            return state;
        case actionTypes.LOGOUT:
            state.loginState = LOGIN_TYPES.UN_LOGIN;
            state.user = null;
            state.error = null;
            return state;
        default:
            return state;
    }
}
export default reducer;