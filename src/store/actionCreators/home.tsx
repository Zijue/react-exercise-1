import * as actionTypes from '@/store/action-types';

const actionCreators = {
    setCurrentCategory(currentCategory: string) {
        return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
    },
}
export default actionCreators;