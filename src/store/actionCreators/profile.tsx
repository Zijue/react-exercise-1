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