import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import actionCreators from '@/store/actionCreators/home';
import HomeHeader from './components/HomeHeader';
import HomeSliders from './components/HomeSliders';

interface Params { };
type Props = PropsWithChildren<RouteComponentProps<Params> & typeof actionCreators & ReturnType<typeof mapStateToProps>>;
function Home(props: Props) {
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
            <div className='home-container'>
                <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
            </div>
        </>
    )
}
function mapStateToProps(state: CombinedState): HomeState {
    return state.home;
}
export default connect(mapStateToProps, actionCreators)(Home);