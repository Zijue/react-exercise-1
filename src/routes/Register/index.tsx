import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import actionCreators from '@/store/actionCreators/profile';
import { Button, message, Form, Input } from 'antd';
import NavHeader from '@/components/NavHeader';
import './index.less';
import { LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';

interface Params { };
//typeof actionCreators 把actionCreators映射为属性对象
//ReturnType<typeof mapStateToProps> 把mapStateToProps返回值类型映射为属性对象
type Props = PropsWithChildren<RouteComponentProps<Params> & typeof actionCreators & ReturnType<typeof mapStateToProps>>;
function Register(props: Props) {
    const onFinish = (values: any) => {
        props.register(values);
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
        message.error('表单验证失败');
    }
    return (
        <>
            <NavHeader history={props.history}>注册</NavHeader>
            <Form className='user-form' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input prefix={<UserAddOutlined />} placeholder='用户名' />
                </Form.Item>
                <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
                    <Input type='password' prefix={<LockOutlined />} placeholder='密码' />
                </Form.Item>
                <Form.Item label='确认密码' name='confirmPassword' rules={[{ required: true, message: '请输入确认密码' }]}>
                    <Input type='password' prefix={<LockOutlined />} placeholder='确认密码' />
                </Form.Item>
                <Form.Item label='邮箱' name='email' rules={[{ required: true, message: '请输入邮箱' }]}>
                    <Input type='email' prefix={<MailOutlined />} placeholder='邮箱' />
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType='submit' className='user-form-button'>注册</Button>
                    没有账号，<Link to='/login'>立刻登录</Link>
                </Form.Item>
            </Form>
        </>
    )
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(mapStateToProps, actionCreators)(Register);