import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import { postAdress, getAdress } from '../../api/AuthApiService';
import { Form, Input} from 'antd';
import sweet from 'sweetalert2'; 

const Inner = styled.div`
    /* border: 1px solid orange; */
    width: 50%;
    height: 90%;
    @media (max-width: 1000px){
        width: 70%;
    }
`
const AddressInfo = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    height: 30%;
    font-size: 20px;
    color: #9E9E9E;
    text-align: center;
`
const AddressInfoBut = styled.button`
    border-radius: 15%;
    border: none;
    width: 70px;
    height: 40px;
    font-size: 20px;
    background-color: green;
    color: whitesmoke;
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
`
const InputInfo = styled.div`
    
`
const StyledInput = styled(Input)`
    border: 1px solid #E8E8E8;
    width: 90%;
    height: 45px;
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
    @media (max-width: 700px){
        width: 100%;
    }
    `
const ButtDiv = styled.div`
    /* border: 1px solid red; */
    display: flex;
    justify-content: flex-end;
    margin-top: 5%;
`
const StyledFormItem = styled(Form.Item)`
    /* border: 1px solid red; */
    width: 100%;
    margin: auto;
`;
const Mypage_address = () => {
    const [form] = Form.useForm();
    const [addressDTO, setAddressDTO] = useState ({
        name:'',
        number:'',
        address:'',
        detailedAddress:''
    });
    const [newAddressDTO, setNewAddressDTO] = useState ({
        name:'',
        number:'',
        address:'',
        detailedAddress:''
    });
    const [update, setUpdate] = useState(false);
    
// console.log(addressDTO)
    useEffect(() => {
        getAdress()
        .then(res => {
            setAddressDTO(res.data.result);
            // setNewAddressDTO(res.data.result);
            // console.log('res',res);
                })
        .catch(e => {
            console.log(e);
        })
    }, []);

    const addSave = () => {
        form.validateFields().then(() => {
            postAdress(newAddressDTO)
            .then(res => {
                console.log(res);
                sweet.fire({
                    text: '주소등록이 완료되었습니다.',
                    icon: 'success',
                });
                setUpdate(false);
                setAddressDTO(newAddressDTO);
            }).catch(e => {
                console.log('postAdress에러',e)
            })
        }).catch((e) => {
            console.log(e);
        });
    }
    //주소api
    const openDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                const fullAddress = data.address;
                const extraAddress = data.buildingName ? ` (${data.buildingName})` : '';
                const addressParts = fullAddress.split(' ');

                let newAddress = addressParts.slice(0, 3).join(' ');
                let detailedAddress = addressParts.slice(3).join(' ') + extraAddress;

                setNewAddressDTO({
                    ...newAddressDTO,
                    address: newAddress,
                    detailedAddress: detailedAddress
                });
                form.setFieldsValue({
                    address: newAddress,
                    detailedAddress: detailedAddress
                });
            }
        }).open();
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    // console.log('새주소',newAddressDTO)
//주소끝

    const onInput = (e) => {
        const {name, value} = e.target
        setNewAddressDTO({...newAddressDTO, [name]: value})
    }
    const onInputPhone = (e) => {
        const { name, value } = e.target;
    const newValue = value.replace(/[^\d]/g, ''); 

    setNewAddressDTO({ ...newAddressDTO, [name]: newValue });

    }

    const hasAddress = addressDTO.name 
    && addressDTO.number 
    && addressDTO.address 
    && addressDTO.detailedAddress;

    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <Inner>
            {hasAddress && !update ? 
            (<AddressInfo>
                <p>현재 등록되어있는 주소</p>
                <br></br>
                <div><span>이름: </span><span style={{color:'black'}}>{addressDTO?.name}</span></div>
                <div><span>전화번호: </span><span style={{color:'black'}}>{addressDTO?.number}</span></div>
                <div><span>주소: </span><span style={{color:'black'}}>{addressDTO?.address}</span></div>
                <div><span>상세주소: </span><span style={{color:'black'}}>{addressDTO?.detailedAddress}</span></div>

                <AddressInfoBut onClick={() => setUpdate(true)}>수정</AddressInfoBut>
            </AddressInfo>)
            :( <InputInfo>
            <Form
                    form={form}
                    name="basic"
                    requiredMark={false}
                    colon={false}>
            
            <StyledFormItem
                        label={<div style={{ width: '80px'}}>이름</div>}
                        name="name"
                        rules={[{ required: true, message: '이름을 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                <StyledInput name="name" value={newAddressDTO.name} onChange={onInput} />
            </StyledFormItem>
         
            <StyledFormItem
                        label={<div style={{ width: '80px'}}>연락처</div>}
                        name="number"
                        rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                <StyledInput placeholder='숫자만 입력해 주세요.' name="number" value={newAddressDTO.number} onChange={onInputPhone} />
            </StyledFormItem>
           
            <StyledFormItem
                        label={<div style={{ width: '80px'}}>주소</div>}
                        name="address"
                        rules={[{ required: true, message: '주소를 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                <StyledInput onClick={openDaumPostcode} name="address" 
                value={newAddressDTO.address} onChange={onInput} readOnly/>
            </StyledFormItem>
            <StyledFormItem
                        label={<div style={{ width: '80px'}}>상세주소</div>}
                        name="detailedAddress"
                        rules={[{ required: true, message: '상세주소를 입력해주세요.' }]}
                        style={{ marginTop: '50px' }}
                        >
                <StyledInput name="detailedAddress" 
                value={newAddressDTO.detailedAddress} onChange={onInput} />
            </StyledFormItem>
            
            
            <ButtDiv>
            <Butt cursor="pointer" width="150px" onClick={addSave}>저장</Butt> 
            </ButtDiv>
            </Form>
            </InputInfo>
            )}
            </Inner>
        </div>
    );
};

export default Mypage_address;