import { getSliders, getLessons } from '@/api/home';
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
    },
    getLessons() {
        return function (dispatch: Function, getState: Function) {
            (async function () {
                let state = getState(); //首先先获取状态
                let { currentCategory, lessons: { hasMore, offset, limit, loading } } = state.home; //解构参数
                if (hasMore && !loading) {
                    dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true }); //将课程列表组件状态loading设置为true
                    let result = await getLessons(currentCategory, offset, limit);
                    dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
                }
            })();
        }
    }
}
export default actionCreators;