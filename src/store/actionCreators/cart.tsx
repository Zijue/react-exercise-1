import { Lesson } from "@/typings/lesson";
import * as actionTypes from '@/store/action-types';
import { message } from "antd";

const actionCreators = {
    addCartItem(lesson: Lesson) {
        return function (dispatch: Function) {
            dispatch({
                type: actionTypes.ADD_CART_ITEM,
                payload: lesson
            });
            message.info('添加课程到购物车成功!')
        }
    },
    changeCartItemAmount(id: string, amount: number) {
        return {
            type: actionTypes.CHNAGE_CART_ITEM_AMOUNT,
            payload: {
                id,
                amount
            }
        }
    },
    removeCartItem(id: string) {
        return {
            type: actionTypes.REMOVE_CART_ITEM,
            payload: id
        }
    },
    clearCartItems() {
        return {
            type: actionTypes.CLEAR_CART_ITEMS
        }
    },
    settle() {
        return {
            type: actionTypes.SETTLE
        }
    },
    changeCheckedCartItems(checkedIds: string[]) {
        return {
            type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
            payload: checkedIds
        }
    },
}
export default actionCreators;