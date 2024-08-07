import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Checkbox, Form, Input, Typography} from 'antd';
import {login} from '../api/AuthApiService';
import Butt from '../components/Butt';
import sweet from 'sweetalert2';
import {useSetRecoilState} from "recoil";
import {userState} from "../atoms/userState";
import {jwtDecode} from "jwt-decode";

const InnerDiv = styled.div`
    width: 60%;
    margin: 0 auto;
    
    @media (max-width: 999px) {
        width: 100%;
    }
`;

const NameDiv = styled(Typography.Title)`
    margin-top: 7.9239vw;
`;

const ContentDiv = styled.div`
    width: 100%;
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
    width: 100%;
`;

const StyledCk = styled(Form.Item)`
    width: 80%;
    
    @media (max-width: 639px) {
        width: 95%;
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

const Login = () => {
  const setUserData = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [loginDTO, setLoginDTO] = useState({
    accountId: '',
    password: '',
    rememberMe: false,
  })

const loginInput = (e) => {
    const { name, value, checked, type } = e.target;
        setLoginDTO({
            ...loginDTO,
            [name]: type === 'checkbox' ? checked : value,
        });
}

    const [form] = Form.useForm();
    const loginButton = () => {
        form.validateFields().then(() => {
            if (loginDTO.accountId && loginDTO.password){
              // console.log(loginDTO)
                login(loginDTO)
                  .then(res => {
                    // console.log(res.data.result.token)
                    // console.log(res)
                    // console.log(loginDTO)
                    if (loginDTO.rememberMe === true) {
                        localStorage.setItem('suhwagdamToken', res.data.result.token)
                    } else {
                        sessionStorage.setItem('suhwagdamToken', res.data.result.token)
                    }
                    setUserData(jwtDecode(res.data.result.token));
                    ///////
                    sweet.fire({
                        title: "로그인 되었습니다.",
                        icon: "success"
                    })
                    navigate('/');
                  }).catch((error) => {
                    // console.error('로그인 실패', error)
                    sweet.fire({
                        title: "로그인 실패",
                        html: `
                        아이디와 비밀번호를 확인해 주세요.
                        `,
                    })
                  })
            }
          }).catch((error) => {
        })
    };

  return (
    <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
    }}>
      <InnerDiv>
        <NameDiv level={1} style={{ marginLeft: '20px'}}>로그인</NameDiv>
        <ContentDiv>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            requiredMark={false}
            colon={false}
          >
              <div
              style={{
                  width: '80%',
                  margin: '0 auto'
              }}>
            <StyledFormItem
              label={<div style={{ width: '60px'}}>아이디</div>}
              name="accountId"
              rules={[{ required: true, message: '아이디를 입력해주세요.' }]}
              style={{ marginTop: '50px' }}
            >
              <StyledInput name="accountId" value={loginDTO.accountId} onChange={loginInput} />
            </StyledFormItem>

            <StyledFormItem
              label={<div style={{ width: '60px'}}>비밀번호</div>}
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              style={{ marginTop: '50px', paddingTop: '0px' }}
            >
              <StyledPasswordInput name="password" value={loginDTO.password} onChange={loginInput} />
            </StyledFormItem>

            <StyledCk
              name="rememberMe"
              valuePropName="checked"
              style={{ marginTop: '30px', margin: '0 auto' }}
            >
              <Checkbox
                name="rememberMe"
                checked={loginDTO.rememberMe}
                onChange={loginInput}
                style={{ fontSize: '20px' }}
              >
                자동 로그인
              </Checkbox>
            </StyledCk>

            <Form.Item>
                
              <div style={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>
                <Butt cursor="pointer" onClick={loginButton}>로그인</Butt>
              </div>
            </Form.Item>
              </div>
          </Form>
        </ContentDiv>
      </InnerDiv>
    </div>
  );
};

export default Login;
