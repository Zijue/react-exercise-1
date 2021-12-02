import React, { PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import actionCreators from '@/store/actionCreators/home';
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
    })
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
                            <button className="add-cart">加入购物车</button>
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
export default connect(mapStateToProps)(Detail);