import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Butt from '../components/Butt'
import sweet from 'sweetalert2'; 
import { Form, Input, Typography} from 'antd';
import {join} from '../api/AuthApiService';
import {checkId,checkEmail} from '../api/AuthApiService';
import {useNavigate} from "react-router-dom";

const InnerDiv = styled.div`
/* border: 1px solid red; */
    width: 60%;
    margin: 0 auto;

    @media (max-width: 999px) {
        width: 100%;
    }
`
const NameDiv = styled(Typography.Title)`
    margin-top: 7.9239vw;
`;
const ContentDiv = styled.div`
    width: 60%;
    margin: auto;
    
@media (max-width: 800px){
    width: 90%;
}
`;
    const StyledPasswordInput = styled(Input.Password)`
    border: 1px solid #E8E8E8;
    width: 90%;
    height: 45px;
    font-size: 25px;
    border-radius: 8px;
    padding: 5px 10px;

    &:focus {
        border: 1px solid #5AC463 !important;
        outline: none;
    }
    &:hover {
        border: 1px solid #5AC463 !important;
        outline: none;
    }
    &:focus-within {
        border: 1px solid #5AC463 !important;
        outline: none;
    }

    @media (max-width: 639px) {
        width: 95%;
    }
    `;

    const StyledInput = styled(Input)`
    border: 1px solid #E8E8E8;
    width: 90%;
    height: 45px;
    font-size: 25px;
    border-radius: 8px;

    &:focus {
        border: 1px solid #5AC463 !important;
        outline: none;
    }
    &:hover {
        border: 1px solid #5AC463 !important;
        outline: none;
    }

    @media (max-width: 639px) {
        width: 95%;
    }
    `;
    
    const StyledFormItem = styled(Form.Item)`
    /* border: 1px solid red; */
    width: 100%;
`;
const Join = () => {
    const navigate = useNavigate();

    const [usertDTO, setUsertDTO] = useState({
        accountId: '',   
        password:'',
        email: '', 
        nickname: ''
    });
    const [form] = Form.useForm();
    const [password2, setPassword2] = useState('');
    
    const onInput = (e) => {
        const {name, value} = e.target
        setUsertDTO({...usertDTO, [name]: value})
        if (name === 'password2') {
            setPassword2(value);
        }
    }
    
//가입한다잉
    const UserSave = () => {
        form.validateFields().then(() => {
            const accountIdPattern = /^([a-zA-Z0-9]){6,20}$/;
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
            const nicknamePattern = /^.{2,8}$/;

            if (!accountIdPattern.test(usertDTO.accountId)) {
                sweet.fire({
                  text: '아이디는 영문자와 숫자로 6~20자 이어야 합니다.',
                  icon: 'error',
                });
                return;
              }
              if (!passwordPattern.test(usertDTO.password)) {
                sweet.fire({
                  text: '비밀번호는 영문자와 숫자 조합으로 8~20자 이어야 합니다.',
                  icon: 'error',
                });
                return;
              }
            if (usertDTO.password !== password2) {
                sweet.fire({
                    text: "비밀번호가 일치하지 않습니다.",
                    icon: "error"
                });
                return;
            }
              if (!nicknamePattern.test(usertDTO.nickname)) {
                sweet.fire({
                  text: '닉네임은 2~8자 이어야 합니다.',
                  icon: 'error',
                });
                return;
              }
              if (!usertDTO.email.includes('@') || !usertDTO.email.includes('.')) {
                sweet.fire({
                  text: '올바른 이메일 형식을 입력해주세요.',
                  icon: 'error',
                });
                return;
              }
            
            checkId(usertDTO.accountId)
            .then(res => {
                console.log(res.data.result);
                if (res.data.result) {
                    sweet.fire({
                        text: '이미 사용 중인 아이디입니다.',
                        icon: 'error',
                    });
                } else {
                    checkEmail(usertDTO.email)
                        .then(res => {
                            console.log(res.data.result);
                            if (res.data.result) {
                                sweet.fire({
                                    text: '이미 사용 중인 이메일입니다.',
                                    icon: 'error',
                                });
                            } else {
                                const loadingModal = sweet.fire({
                                    title: '회원가입 중',
                                    html: '잠시만 기다려주세요...',
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    allowEnterKey: false,
                                    onBeforeOpen: () => {
                                        sweet.showLoading();
                                    },
                                });
                                join(usertDTO)
                                    .then(res => {
                                        loadingModal.close();
                                        sweet.fire({
                                            text: '해당 이메일로 인증번호를 전송했습니다. 인증을 완료해주세요.',
                                            icon: 'success',
                                        });
                                        navigate('/login');
                                    })
                                    .catch(err => {
                                        sweet.fire({
                                            text: '회원가입에 실패했습니다. 다시 시도 해주세요',
                                            icon: 'error',
                                        });
                                        navigate('/');
                                    })
                            }
                        })
                }
                ;
            })
        }).catch(() => {
            sweet.fire({
                text: '입력값을 확인해주세요.',
                icon: 'error',
            });
        });
    }

    return (
        <div>
            <InnerDiv>
                <NameDiv><h1 style={{marginLeft:'20px'}}>회원가입</h1></NameDiv>
                <ContentDiv>
                    <Form
                    form={form}
                    name="basic"
                    requiredMark={false}
                    colon={false}>
                        
                    <StyledFormItem
                        label={<div style={{ width: '80px'}}>아이디</div>}
                        name="accountId"
                        rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                        <StyledInput name="accountId" value={usertDTO.accountId} onChange={onInput} />
                    </StyledFormItem>
                    
                    <StyledFormItem
                        label={<div style={{ width: '80px'}}>비밀번호</div>}
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
                        style={{ marginTop: '50px', paddingTop: '0px' }}
                        >
                    <StyledPasswordInput name="password" value={usertDTO.password} onChange={onInput} />
                    </StyledFormItem>
                    
                    <StyledFormItem
                        label={<div style={{ width: '80px'}}>비밀번호 확인</div>}
                        name="password2"
                        rules={[{ required: true, message: '비밀번호를 한 번 더 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                    <StyledPasswordInput name="password2" value={password2} onChange={onInput} />
                    </StyledFormItem>

                    <StyledFormItem
                        label={<div style={{ width: '80px'}}>닉네임</div>}
                        name="nickname"
                        rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                        <StyledInput name="nickname" value={usertDTO.nickname} onChange={onInput} />
                    </StyledFormItem>

                    <StyledFormItem
                        label={<div style={{ width: '80px'}}>이메일</div>}
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력해주세요.' },
                            { type: 'email', message: '올바른 이메일 형식을 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                        <StyledInput name="email" value={usertDTO.email} onChange={onInput} />
                    </StyledFormItem>
        
                    <div style={{textAlign: 'center', marginTop:'10%'}}>
                    <Butt cursor="pointer" onClick={UserSave}>회원가입</Butt> 
                    </div>
                    
                    </Form>
                </ContentDiv>
            </InnerDiv>
        </div>
    );
};

export default Join;