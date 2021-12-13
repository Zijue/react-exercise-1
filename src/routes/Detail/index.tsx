import React, { PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import actionCreators from '@/store/actionCreators/cart';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import NavHeader from '@/components/NavHeader';
import { Card } from 'antd';
import { Lesson, LessonResult } from '@/typings/lesson';
import { getLesson } from '@/api/home';

interface Params { id: string };
type Props = PropsWithChildren<RouteComponentProps<Params, StaticContext, Lesson> & typeof actionCreators & ReturnType<typeof mapStateToProps>>;
function Detail(props: Props) {
    let [lesson, setLesson] = useState<Lesson>({} as Lesson);
    useEffect(() => {
        (async function () {
            let lesson: Lesson = props.location.state;
            if (!lesson) {
                let id = props.match.params.id;
                let result: LessonResult = await getLesson<LessonResult>(id)
                setLesson(result.data);
            } else {
                setLesson(lesson);
            }
        })();
    });
    const addCartItem = (lesson: Lesson) => {
        let video: HTMLVideoElement = document.querySelector('#lesson-video');
        let cart: HTMLSpanElement = document.querySelector('.anticon.anticon-shopping');
        let cloneVideo: HTMLVideoElement = video.cloneNode(true) as HTMLVideoElement;
        let videoWidth = video.offsetWidth; //video标签的宽
        let videoHeight = video.offsetHeight; //video标签的高
        let cartWidth = cart.offsetWidth; //购物车图标的宽
        let cartHeight = cart.offsetHeight; //购物车图标的高
        let videoLeft = video.getBoundingClientRect().left;
        let videoTop = video.getBoundingClientRect().top;
        let cartRight = cart.getBoundingClientRect().right;
        let cartBottom = cart.getBoundingClientRect().bottom;

        cloneVideo.style.cssText = `
            z-index: 1000;
            opacity: 0.8;
            position: fixed;
            width: ${videoWidth}px;
            height: ${videoHeight}px;
            top: ${videoTop}px;
            left: ${videoLeft}px;
            transition: all 2s ease-in-out;
        `
        document.body.appendChild(cloneVideo);
        setTimeout(() => {
            cloneVideo.style.left = (cartRight - (cartWidth / 2)) + 'px';
            cloneVideo.style.top = (cartBottom - (cartHeight / 2)) + 'px';
            cloneVideo.style.width = '0px';
            cloneVideo.style.height = '0px';
            cloneVideo.style.opacity = '0.1';
        });
        props.addCartItem(lesson);
    }
    return (
        <>
            <NavHeader history={props.history}>课程详情</NavHeader>
            <Card hoverable={true} style={{ width: '100%' }}
                cover={<video id="lesson-video" src={lesson.video} autoPlay={false} controls={true} />}
            >
                <Card.Meta title={lesson.title}
                    description={(
                        <>
                            <p>价格：${lesson.price}元</p>
                            <button className="add-cart" onClick={() => addCartItem(lesson)}>加入购物车</button>
                        </>
                    )}
                />
            </Card>
        </>
    )
}
function mapStateToProps(state: CombinedState): HomeState {
    return state.home;
}
export default connect(mapStateToProps, actionCreators)(Detail);