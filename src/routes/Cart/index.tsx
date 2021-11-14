import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { CartState } from '@/store/reducers/cart';
import actionCreators from '@/store/actionCreators/cart';

interface Params { };
type Props = PropsWithChildren<RouteComponentProps<Params>>;
function Cart(props: Props) {
    return (
        <div>
            Cart
        </div>
    )
}
function mapStateToProps(state: CombinedState): CartState {
    return state.cart;
}
export default connect(mapStateToProps, actionCreators)(Cart);