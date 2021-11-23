import React, { PropsWithChildren, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import actionCreators from '@/store/actionCreators/profile';
import { AxiosError } from 'axios';
import { Alert, Button, Descriptions, message, Upload } from 'antd';
import LOGIN_TYPES from '@/typings/login-types';
import NavHeader from '@/components/NavHeader';
import './index.less';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';

interface Params { };
type Props = PropsWithChildren<RouteComponentProps<Params> & typeof actionCreators & ReturnType<typeof mapStateToProps>>;
function Profile(props: Props) {
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        (props.validate() as any).catch((error: AxiosError) => message.error(error.message));
    }, []);
    const handleChange = (info: any) => {
        let status = info.file.status;
        if (status === 'uploading') {
            setLoading(true);
        } else if (status === 'done') {
            let { success, data, message } = info.file.response;
            if (success) {
                setLoading(false);
                props.changeAvatar(data);
            } else {
                setLoading(false);
                message.error(message);
            }
        }
    }
    let content;
    if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
        content = null; //如果未验证则内容为null
    } else if (props.loginState === LOGIN_TYPES.LOGIN_ED) {
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <UploadOutlined />}
                <div className='ant-upload-text'>上传</div>
            </div>
        )
        //如果已经登录显示用户信息
        content = (
            <div className="user-info">
                <Descriptions title="当前用户">
                    <Descriptions.Item label='用户名'>{props.user.username}</Descriptions.Item>
                    <Descriptions.Item label='邮箱'>{props.user.email}</Descriptions.Item>
                    <Descriptions.Item label='头像'>
                        <Upload
                            name='avatar'
                            listType='picture-card'
                            className='avatar-uploader'
                            showUploadList={false}
                            action={'http://localhost:8000/user/uploadAvatar'}
                            beforeUpload={beforeUpload}
                            data={{ userId: props.user.id }}
                            onChange={handleChange}
                        >
                            {
                                props.user.avatar ? (
                                    <img src={props.user.avatar} alt='avatar' style={{ width: '100%' }} />
                                ) : uploadButton
                            }
                        </Upload>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Button type='primary' onClick={props.logout}>退出</Button>
                    </Descriptions.Item>
                </Descriptions>
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
function beforeUpload(file: any) {
    const isAllowedExt = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isAllowedExt) {
        message.error('只能上传jpg/png格式的文件');
    }
    const isLessThan2M = file.size / (1024 * 1024) <= 2;
    if (!isLessThan2M) {
        message.error('图片大小必须小于2M');
    }
    return isAllowedExt && isLessThan2M;
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(mapStateToProps, actionCreators)(Profile);