import React, { PropsWithChildren, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import actionCreators from '@/store/actionCreators/profile';
import { AxiosError } from 'axios';
import { Alert, Button, Descriptions, message } from 'antd';
import LOGIN_TYPES from '@/typings/login-types';
import NavHeader from '@/components/NavHeader';
import './index.less';

interface Params { };
type Props = PropsWithChildren<RouteComponentProps<Params>> & typeof actionCreators & ReturnType<typeof mapStateToProps>;
function Profile(props: Props) {
    useEffect(() => {
        (props.validate() as any).catch((error: AxiosError) => message.error(error.message));
    }, []);
    let content;
    if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
        content = null; //如果未验证则内容为null
    } else if (props.loginState === LOGIN_TYPES.LOGIN_ED) {
        //如果已经登录显示用户信息
        content = (
            <div className="user-info">
                <Descriptions title="当前登录用户">
                    <Descriptions.Item label='用户名'>小吃同学</Descriptions.Item>
                    <Descriptions.Item label='手机号'>187xxxxxxxx</Descriptions.Item>
                    <Descriptions.Item label='邮箱'>xiaochi@gmail.com</Descriptions.Item>
                </Descriptions>
                <Button type='primary'>退出登录</Button>
            </div>
        )
    } else {
        content = (
            <>
                <Alert type="warning" message="当前未登录" description="用户你好，你现在尚未登录，请选择去注册或登录" />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Button type='dashed' onClick={() => props.history.push('/login')}>登录</Button>
                    <Button type='primary' style={{ marginLeft: '50px' }} onClick={() => props.history.push('/register')}>注册</Button>
                </div>
            </>
        )
    }
    return (
        <section>
            <NavHeader history={props.history}>个人中心</NavHeader>
            {content}
        </section>
    )
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(mapStateToProps, actionCreators)(Profile);