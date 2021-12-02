import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import actionCreators from '@/store/actionCreators/home';
import HomeHeader from './components/HomeHeader';
import HomeSliders from './components/HomeSliders';
import './index.less';
import LessonList from './components/LessonList';
import { downRefresh, loadMore } from '@/utils';
import { Spin } from 'antd';

interface Params { };
type Props = PropsWithChildren<RouteComponentProps<Params> & typeof actionCreators & ReturnType<typeof mapStateToProps>>;
function Home(props: Props) {
    let homeContainerRef = useRef(null);
    useEffect(() => {
        loadMore(homeContainerRef.current, props.getLessons);
        downRefresh(homeContainerRef.current, props.refreshLessons);
    }, []);
    return (
        <>
            <Spin size={"large"} />
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
            <div className='home-container' ref={homeContainerRef}>
                <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
                <LessonList
                    lessons={props.lessons}
                    getLessons={props.getLessons}
                    homeContainerRef={homeContainerRef}
                />
            </div>
        </>
    )
}
function mapStateToProps(state: CombinedState): HomeState {
    return state.home;
}
export default connect(mapStateToProps, actionCreators)(Home);