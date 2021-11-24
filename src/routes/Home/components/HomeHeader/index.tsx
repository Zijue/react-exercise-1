import React, { useState, CSSProperties } from 'react';
import logo from '@/assets/images/logo.png';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.less';
import { Transition } from 'react-transition-group';

const duration = 1000; //动画的持续时间
const defaultStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`
}
interface TransitionStyles {
    entering: CSSProperties; //进入时的样式
    entered: CSSProperties; //进入成功时的样式
    exiting: CSSProperties; //退出时的样式
    exited: CSSProperties; //退出成功后
}
const transitionStyle: TransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
}
interface Props {
    currentCategory: string; //当前的分类
    setCurrentCategory: (currentCategory: string) => any //修改当前分类
}
export default function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
        let target = event.target as HTMLLIElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        setIsMenuVisible(false); //选择分类后隐藏
    }
    return (
        <header className='home-header'>
            <div className='logo-header'>
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state: keyof TransitionStyles) => {
                        console.log(state);
                        return (
                            <ul
                                className='category'
                                onClick={setCurrentCategory}
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyle[state]
                                }}
                            >
                                <li data-category='all' className={classnames({ active: props.currentCategory === 'all' })}>全部</li>
                                <li data-category='react' className={classnames({ active: props.currentCategory === 'react' })}>React</li>
                                <li data-category='vue' className={classnames({ active: props.currentCategory === 'vue' })}>Vue</li>
                            </ul>
                        )
                    }
                }
            </Transition>
        </header>
    )
}
