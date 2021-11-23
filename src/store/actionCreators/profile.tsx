import { login, register, validate } from '@/api/profile';
import * as actionTypes from '@/store/action-types';
import { LoginPayload, LoginResult, RegisterPayload, RegisterResult } from '@/typings/user';
import { message } from 'antd';
import { push } from 'connected-react-router';

const actionCreators = {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()
        }
    },
    register(values: RegisterPayload) {
        return function (dispatch: Function) {
            (async function () {
                try {
                    //AxiosResponse<any, any>=RegisterResult
                    let registerResult = await register<RegisterResult>(values);
                    //如果成功了，可以跳转到登录页
                    if (registerResult.success) {
                        dispatch(push('/login'));
                    } else {
                        message.error(registerResult.message);
                    }
                } catch (error) {
                    message.error(error.message);
                }
            })();
        }
    },
    login(values: LoginPayload) {
        return function (dispatch: Function) {
            (async function () {
                try {
                    //AxiosResponse<any, any>=RegisterResult
                    let loginResult = await login<LoginResult>(values); //后端接口应该优化一下，现在登录不成功返回的不是200成功
                    if (loginResult.success) {
                        sessionStorage.setItem('access_token', loginResult.data.token);
                        dispatch(push('/profile'));
                    } else {
                        message.error(loginResult.message);
                    }
                } catch (error) {
                    message.error(error.message);
                }
            })();
        }
    },
    changeAvatar(avatar: string) {
        return {
            type: actionTypes.CHANGE_AVATAR,
            payload: avatar //服务返回的上传后的图片的访问地址
        }
    },
    logout() {
        return function (dispatch: Function) {
            sessionStorage.removeItem('access_token');
            dispatch({ type: actionTypes.LOGOUT });
        }
    }
}
export default actionCreators;
/**
 * validate方法会派发store.dispatch({
 *      type: actionTypes.VALIDATE,
 *      payload: validate()
 * })
 *
 * redux-promise会识别或者说拦截这个action，
 * 然后等validate()结束之后再次派发action
 * store.dispatch({
 *      type: actionTypes.VALIDATE,
 *      payload: {success: true, data: {id: 1, username: '紫珏'}}
 * })
 */