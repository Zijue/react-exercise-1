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
                return {
                    ...state,
                    loginState: LOGIN_TYPES.LOGIN_ED,
                    user: action.payload.data,
                    error: null
                }
            } else {
                return {
                    ...state,
                    loginState: LOGIN_TYPES.UN_LOGIN,
                    user: null,
                    error: action.payload
                }
            }
        case actionTypes.CHANGE_AVATAR:
            // state.user.avatar = action.payload;
            return {
                ...state,
                user: { ...state.user, avatar: action.payload }
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loginState: LOGIN_TYPES.UN_LOGIN,
                user: null,
                error: null
            }
        default:
            return state;
    }
}
export default reducer;