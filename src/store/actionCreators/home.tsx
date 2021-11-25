import { getSliders } from '@/api/home';
import * as actionTypes from '@/store/action-types';

const actionCreators = {
    setCurrentCategory(currentCategory: string) {
        return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
    },
    getSliders() {
        return {
            type: actionTypes.GET_SLIDERS,
            payload: getSliders()
        }
    }
}
export default actionCreators;