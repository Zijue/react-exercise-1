import React, { PropsWithChildren, useEffect } from 'react';
import { Lesson } from '@/typings/lesson';
import { Lessons } from '@/store/reducers/home';
import { MenuOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
    lessons: Lessons;
    getLessons: () => any;
    homeContainerRef: any;
}>

export default function LessonList(props: Props) {
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons();
        }
    }, []);
    return (
        <section className='lesson-list'>
            <h2><MenuOutlined />全部课程</h2>
            <Skeleton
                loading={props.lessons.list.length === 0 && props.lessons.loading}
                active
                paragraph={{ rows: 8 }}
            >
                {
                    props.lessons.list.map((lesson: Lesson, index: number) => (
                        <Link key={lesson.id} to={{ pathname: `/detail/${lesson.id}`, state: lesson }}>
                            <Card hoverable={true} style={{ width: '100%' }} cover={<img src={lesson.poster} alt={lesson.title} />}>
                                <Card.Meta title={lesson.title} description={`价格: ${lesson.price}元`} />
                            </Card>
                        </Link>
                    ))
                }
                {
                    props.lessons.hasMore ? (
                        <Button block={true} type='primary' loading={props.lessons.loading} onClick={props.getLessons}>
                            {props.lessons.loading ? '' : '加载更多'}
                        </Button>
                    ) : <Alert style={{ textAlign: 'center' }} message='到底了' type='warning' />
                }
            </Skeleton>
        </section>
    )
}
