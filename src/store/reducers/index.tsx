import { ReducersMapObject } from 'redux';
import home from './home';
import cart from './cart';
import profile from './profile';
import { connectRouter } from 'connected-react-router';
import history from '@/history';
import { combineReducers } from 'redux-immer';
import produce from 'immer';

let reducers: ReducersMapObject = {
    router: connectRouter(history),
    home,
    cart,
    profile
}
export type CombinedState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}
/** 上面的类型表示的意思如下：key是home、cart、profile，value是reducer函数的返回值
type CombinedState = {
    home | cart | profile: HomeState | CartState | ProfileState
}
 */
let combineReducer = combineReducers(produce, reducers);
export default combineReducer;