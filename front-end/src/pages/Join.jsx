import React, {useState} from 'react';
import styled from "styled-components";
import Butt from '../components/Butt'
import sweet from 'sweetalert2'; 

const InnerDiv = styled.div`
/* border: 1px solid red; */

@media (min-width: 800px){
    margin: auto;
    width: 800px;
}
`
const NameDiv = styled.div`
    /* border: 1px solid green;a */
    height: 100px;
    margin-top: 5%;
`
const ContentDiv = styled.div`
    /* border: 1px solid red;  */
    margin-top:10%;

`
const InfoCate = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
    
`
const CateTitle = styled.div`
    /* border: 1px solid rebeccapurple; */
    width: 18%;
    text-align: center;
    font-size: 20px;
    @media (max-width: 880px){
            width: 25%;
            font-size: 15px;
        }
`
const StyledInput = styled.input`
        border: 1px solid #E8E8E8;
        width: 50%;
        height: 35px;
        font-size: 25px;
        border-radius: 8px;
        padding: 5px 10px 5px 10px;

        &::placeholder{
            font-size: 15px;
            color: #9E9E9E;
        }
        &:focus{
            border: 1px solid #5AC463 !important;
            outline: none;
        }
        @media (max-width: 639px){
            width: 70%;
        }
    `
    const EffectDiv = styled.div`
        /* border: 1px solid red; */
        color: orange;
        font-size: 15px;
        text-align: right;
        width: 50%;
    `;
    const EffectDiv2 = styled.div`
        /* border: 1px solid red; */
        color: orange;
        font-size: 15px;
        text-align: right;
        width: 60%;
    `;
const Join = () => {
    const [usertDTO, setUsertDTO] = useState({
        account_id: '',   
        password:'',
        email: '', 
        nickname: ''
    });
    const {account_id,password,password2,nickname,email} = usertDTO

    const [account_idDIv, setAccount_idDiv] = useState('')
    const [passwordDiv, setPasswordDiv] = useState('')
    const [passwordDiv2, setPasswordDiv2] = useState('')
    const [passwordDiv3, setPasswordDiv3] = useState('')
    const [emailDiv, setEmailDiv] = useState('')
    const [emailDiv2, setEmailDiv2] = useState('')
    const [nicknameDiv, setNicknameDiv] = useState('')

    const UserSave = (e) => {
        e.preventDefault()

        const emailPattern = /^[a-zA-Z0-9_]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        var sw = 1
        if(!account_id){
            setAccount_idDiv('아이디를 입력하세요')
            sw=0
        }else {
            setAccount_idDiv('')
        }
        if(!password){
            setPasswordDiv('비밀번호를 입력하세요')
            sw=0
        }else {
            setPasswordDiv('')
        }
        if(!password2){
            setPasswordDiv2('비밀번호를 한 번 더 입력해 주세요')
            sw=0
        }else {
            setPasswordDiv2('')
            if(password2!=password){
                setPasswordDiv3('비밀번호가 일치하지 않습니다.')
                sw=0
            }else {
                setPasswordDiv3('')
            }
        }
        if(!email){
            setEmailDiv('이메일을 등록하세요')
            sw=0
        }else {
            setEmailDiv('')
            if(!emailPattern.test(email)){
                setEmailDiv2('유효한 이메일 주소를 입력하세요')
                sw=0
            }else {
                setEmailDiv2('')
            }
        }
        if(!nickname){
            setNicknameDiv('닉네임을 입력하세요')
            sw=0
        }else {
            setNicknameDiv('')
        }
        if(sw === 1){
            sweet.fire({
                title: "입력하신 이메일을 통해 회원가입을 완료해주시기 바랍니다.",
                icon: "success"
            })
        }
    }

    const onInput = (e) => {
        if(e && e.target){
            const {name, value} = e.target
            setUsertDTO({...usertDTO, [name]: value})
        }
    }

    return (
        <div>
            <InnerDiv>
                <NameDiv><h1 style={{marginLeft:'20px'}}>회원가입</h1></NameDiv>
                <ContentDiv>
                    
                    <InfoCate>
                        <CateTitle>아이디</CateTitle>
                        <StyledInput type="text"
                        name="account_id" value={account_id} onChange={onInput}/>
                    </InfoCate>
                        <EffectDiv>{account_idDIv}</EffectDiv>
                    
                    <InfoCate>
                        <CateTitle>비밀번호</CateTitle>
                        <StyledInput type="password"
                        name="password" value={password} onChange={onInput}/>
                    </InfoCate>
                    <EffectDiv>{passwordDiv}</EffectDiv>
                    <InfoCate>
                        <CateTitle>비밀번호 확인</CateTitle>
                        <StyledInput type="password"
                        name="password2" value={password2} onChange={onInput}/>
                    </InfoCate>
                        <EffectDiv2>{passwordDiv2}</EffectDiv2>
                        <EffectDiv2>{passwordDiv3}</EffectDiv2>
                    <InfoCate>
                        <CateTitle>닉네임</CateTitle>
                        <StyledInput type="text"
                        name="nickname" value={nickname} onChange={onInput}/>
                    </InfoCate>
                        <EffectDiv>{nicknameDiv}</EffectDiv>
                    <InfoCate>
                        <CateTitle>이메일</CateTitle>
                        <StyledInput type="text"
                        name="email" value={email} onChange={onInput}/>
                    </InfoCate>
                        <EffectDiv>{emailDiv}</EffectDiv>
                        <EffectDiv2>{emailDiv2}</EffectDiv2>
                    <div style={{textAlign: 'center', marginTop:'10%'}}>
                    <Butt cursor="pointer" onClick={UserSave}>회원가입</Butt> 
                    </div>
                </ContentDiv>
            </InnerDiv>
        </div>
    );
};

export default Join;