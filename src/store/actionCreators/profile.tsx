import { validate } from '@/api/profile';
import * as actionTypes from '@/store/action-types';

const actionCreators = {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()
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