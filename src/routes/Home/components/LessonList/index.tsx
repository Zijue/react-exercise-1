import React, { PropsWithChildren, useEffect, CSSProperties, forwardRef, useReducer } from 'react';
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
interface VisibleLesson extends Lesson {
    index: number
}

function LessonList(props: Props, forwardRef: any) {
    //利用reducer强制刷新课程列表页
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons();
        }
        forwardRef.current = forceUpdate; //将LessonList强制更新方法通过Ref传给父组件
    }, []);
    //需要添加这个effect用于强制更新，原因是：
    //  需要利用useEffect的执行时机在dom渲染完成之后，
    //  如果不在dom渲染完成后调用LessonList强制更新组件，那么homeContainer将会是null，
    //  导致start、end都是0，无法正确渲染列表页
    useEffect(() => {
        forceUpdate();
    }, []);
    //先获取1rem的值：1rem = 37.5px
    const remSize: number = parseFloat(document.documentElement.style.fontSize); //实际1rem的值
    //计算每个条目实际的高度 = 每个条目的高度 / 1个rem的高度 * 1个rem对应的px值
    //650px是设计稿中每个卡片的高度，在iphone6下高度变成一半就是352px。(650/75)是在计算设计稿中每个卡片占据多少rem
    const itemSize: number = (650 / 75) * remSize; //实际一卡片的高度值
    //计算容器的实际高度
    const containerHeight: number = window.innerHeight - (220 / 75) * remSize;
    //home-container真实的dom元素
    const homeContainer = props.homeContainerRef.current; //取出来备用
    //初始化需要加载条目的初始与结束位置
    let start = 0, end = 0;
    if (homeContainer) {
        //轮播图160px h2标签33px
        const scrollTop = homeContainer.scrollTop - 160 - 33; //初始值：-193
        start = Math.floor(scrollTop / itemSize);
        end = start + Math.floor(containerHeight / itemSize);
        start -= 2, end += 2; //加载可视区域内容上下边界各扩宽两个卡片的内容
        start = start < 0 ? 0 : start; //上边界处理
        end = end > props.lessons.list.length ? props.lessons.list.length : end; //下边界处理
    }
    //截取可视内容的条目：比如30条数据，一屏能显示10条，当前在第二页，那么需要加载9-22索引位置的内容
    const visibleList: VisibleLesson[] = props.lessons.list.map(
        (item: Lesson, index: number) => ({ ...item, index })
    ).slice(start, end);
    const cardStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: itemSize
    }
    //计算按钮距离顶部的位置
    const bottomTop = props.lessons.list.length * itemSize;
    return (
        <section className='lesson-list'>
            <h2><MenuOutlined />全部课程</h2>
            <Skeleton
                loading={props.lessons.list.length === 0 && props.lessons.loading}
                active
                paragraph={{ rows: 8 }}
            >
                <div style={{ position: 'relative', width: '100%', height: `${itemSize * props.lessons.list.length}px` }}>
                    {
                        visibleList.map((lesson: VisibleLesson) => (
                            <Link style={{ ...cardStyle, top: `${itemSize * lesson.index}px` }}
                                key={lesson.id} to={{ pathname: `/detail/${lesson.id}`, state: lesson }}>
                                <Card hoverable={true} style={{ width: '100%' }} cover={<img src={lesson.poster} alt={lesson.title} />}>
                                    <Card.Meta title={lesson.title} description={`价格: ${lesson.price}元`} />
                                </Card>
                            </Link>
                        ))
                    }
                    {
                        props.lessons.hasMore ? (
                            <Button style={{ textAlign: 'center', top: `${bottomTop}px` }} block={true} type='primary' loading={props.lessons.loading} onClick={props.getLessons}>
                                {props.lessons.loading ? '' : '加载更多'}
                            </Button>
                        ) : <Alert style={{ textAlign: 'center', top: `${bottomTop}px` }} message='到底了' type='warning' />
                    }
                </div>
            </Skeleton>
        </section>
    )
}
export default forwardRef(LessonList);