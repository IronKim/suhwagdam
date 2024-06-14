import React, {useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, TimePicker, Input, Form, Upload } from 'antd';
import styled from "styled-components";
import Butt from '../components/Butt'
import dayjs from 'dayjs';
import sweet from 'sweetalert2'; 
import { TbPhotoPlus } from "react-icons/tb";

    const InnerDiv = styled.div`
        /* border: 1px solid red; */
        
        @media (min-width: 800px){
            margin: auto;
            width: 800px;
        }
    `;
    const NameDiv = styled.div`
        /* border: 1px solid green; */
        height: 100px;
    `;
    const ContentDiv = styled.div`
        /* border: 1px solid red; */
        
    `;
    const EffectDiv = styled.div`
        /* border: 1px solid red; */
        color: orange;
        font-size: 15px;
    `;
    const StyledInput = styled.input`
        border: 1px solid #E8E8E8;
        width: 90%;
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
            width: 93%;
        }
    `
    const StyledTA = styled.textarea`
        width: 90%;
        height: 130px;
        font-size: 20px;
        border: 1px solid #E8E8E8;
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
            width: 93%;
        }
    `
    const StyledCate = styled.div`
        /* border: 1px solid red; */
        width: 100%;
        margin-top: 1%;
        /* height: ${(props) => props.height || ""}; */
        display: flex;
    `
    const StyledCateTitle = styled.div`
        /* border: 1px solid blue; */
        width: 20%;
        /* height: ${(props) => props.height || ""}; */
        display : flex;
        justify-content : center;
        align-items : center;
        font-weight: bold;
        font-size: 15px;
        @media (max-width: 500px){
            font-size: 13px;
        }
    `
    const StyledCateCon = styled.div`
        /* border: 1px solid green; */
        width: 80%;
        height: auto;
    `
    // const UploaDiv = styled.div`
    //     && {
    //         height: 47px;
    //         width: 150px;

    //         &:hover{
    //             border: 1px solid #5AC463;
    //             outline: none;
    //         }
    //     }
    // `
    const StyledUpload = styled(Upload)`
        
        .ant-upload:hover {
            border:#D0CFCF !important; 
        }

        .ant-upload-list-item {
            border:1px dashed #D0CFCF !important;
        }

        .ant-upload-list-item:hover {
            border:1px dashed #D0CFCF !important;
        }
    `

    const StyledTimePicker = styled(TimePicker)`
        && {
            height: 47px;
            width: 150px;

            &:hover, &:focus {
                border: 1px solid #5AC463 !important;
                outline: none;
            }
        }
    `
    const StyledDatePicker = styled(DatePicker)`
        && {
            height: 47px;
            width: 150px;
            }
        &&:focus {
            border: 1px solid #5AC463 !important; 
        }
        &&:active {
            border: 1px solid #5AC463 !important; 
        }
        &&:hover {
            border: 1px solid #5AC463 !important; 
        }
    `
    ///////////
    

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const Product  = () => {

        const [productDTO, setProductDTO] = useState({
            code:1,
            seq:'',
            // user_seq: userSeq,
            title: '',      //제목
            description:'',
            image: '',  //시작날짜
            starting_price: '',    //끝나는날짜
            current_bid_price: '',    //내용
            deadline: '',       //모집인원  
            created_at: '',
            created_by: ''
        });
        const{code,
            seq,user_seq,title,description,image,starting_price,deadline,endDate,created_at,created_by
        } = productDTO
        
        const [titleDiv, setTitleDiv] = useState('')
        const [descriptionDiv, setDescriptionDiv] = useState('')
        const [imageDiv, setImageDiv] = useState('')
        const [starting_priceDiv, setStarting_priceDiv] = useState('')
        const [endDateDiv, setEndDateDiv] = useState('')
        const [deadlineDiv, setDeadlineDiv] = useState('')
        
        const productSave = (e) => {
            e.preventDefault()
    
            var sw = 1
            if(!title){
                setTitleDiv('제목을 입력하세요')
                sw=0
            }else {
                setTitleDiv('')
            }
            if(!description){
                setDescriptionDiv('설명을 입력하세요')
                sw=0
            }else {
                setDescriptionDiv('')
            }
            if(!image){
                setImageDiv('이미지를 등록하세요')
                sw=0
            }else {
                setImageDiv('')
            }
            if(!starting_price){
                setStarting_priceDiv('시작 금액을 입력하세요')
                sw=0
            }else {
                setStarting_priceDiv('')
            }
            if(!endDate){
                setEndDateDiv('마감기한을 입력하세요')
                sw=0
            }else {
                setEndDateDiv('')
            }
            if(!deadline){
                setDeadlineDiv('판매종료 시간을 입력하세요')
                sw=0
            }else {
                setDeadlineDiv('')
            }
            if(sw === 1){
                sweet.fire({
                    title: "등록이 완료되었습니다.",
                    icon: "success"
                })
            }
        }

    const onInput = (e) => {
        if(e && e.target){
            const {name, value} = e.target
            setProductDTO({...productDTO, [name]: value})
        }
    }
    const onInputDate = (date, dateString, fieldName) => {
        setProductDTO({ ...productDTO, [fieldName]: dateString })
    }
    const starting_priceHand = (e) => {
        let starting_price = e.target.value;
        starting_price = Number(starting_price.replaceAll(',',''));
        if(isNaN(starting_price)){
            setProductDTO({...productDTO, starting_price: '0'});
        }else{
            setProductDTO({ ...productDTO, starting_price: starting_price.toLocaleString('ko-KR') });
        }
    }
    const starting_priceFocus = () => {
            setProductDTO({ ...productDTO, starting_price:'' });
    }
    
    /////////////

    const PickerWithType = ({onChange }) => {
            return <StyledTimePicker onChange={onChange} />;
    }
    
    
    /////////////
    return (
        <div>
            <InnerDiv>
                <NameDiv><h3 style={{marginLeft:'20px'}}>상품등록</h3></NameDiv>
            <ContentDiv>
                <StyledCate>
                    <StyledCateTitle>상품 사진</StyledCateTitle>
                    <StyledCateCon>
                        <div valuePropName="fileList" getValueFromEvent={normFile}>
                            <StyledUpload listType="picture-card"
                                    name="image" value={image} 
                                    onChange={(e) => setProductDTO({ ...productDTO, image: normFile(e) })} 
                                    
                                    
                    //              showUploadList={{
                    //             showPreviewIcon: true,
                    //             showRemoveIcon: true,
                    //             showDownloadIcon: false,
                    //             removeIcon: <div />,
                    //            }}
                            >
                            {productDTO.image.length < 5 && (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <TbPhotoPlus style={{ width: '80%', height: '80%', opacity: 0.7 }} />
                                        </div>
                            )}
                                {/* <Upload style={{ width: '100%', height: '100%', 
                                            display: 'flex', justifyContent: 'center', 
                                            alignItems: 'center'
                                            }}>
                                    <TbPhotoPlus style={{ width: '80%', height: '80%', opacity: 0.7}} />
                                </Upload> */}
                                {/* <TbPhotoPlus style={{ width: '80%', height: '80%', opacity: 0.7}} /> */}
                            </StyledUpload>
                            <EffectDiv>{imageDiv}</EffectDiv>
                        </div>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate>
                    <StyledCateTitle>제목</StyledCateTitle>
                    <StyledCateCon>
                        <StyledInput placeholder='품목명과 무게를 포함하여 지어주세요.'
                                    type="text" name="title" value={title} onChange={onInput} />
                        <EffectDiv>{titleDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>
                
                <StyledCate>
                    <StyledCateTitle>판매 시작액</StyledCateTitle>
                    <StyledCateCon>
                    <StyledInput type='text' placeholder='숫자만 입력해 주세요.'
                                 name="starting_price" value={starting_price} 
                                 onChange={starting_priceHand} onFocus={starting_priceFocus}
                                 />
                    <EffectDiv>{starting_priceDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate>
                    <StyledCateTitle>마감 기한</StyledCateTitle>
                    <StyledCateCon>
                    <StyledDatePicker
                                defaultValue={dayjs()}
                                minDate={dayjs()}
                                name="endDate" 
                                onChange={(date, dateString) => onInputDate(date, dateString, 'endDate')}
                                />
                    <EffectDiv>{endDateDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate>
                    <StyledCateTitle>판매 종료 시간</StyledCateTitle>
                    <StyledCateCon>
                        <StyledTimePicker name="deadline"
                                        value={deadline ? dayjs(deadline, 'HH:mm:ss') : null}
                                        onChange={(time, timeString) => onInputDate(time, timeString, 'deadline')}
                                        />
                        <EffectDiv>{deadlineDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate height="150px">
                    <StyledCateTitle>상품 설명</StyledCateTitle>
                    <StyledCateCon>
                        <StyledTA maxLength={50} rows={4} placeholder='최대 50자' 
                        type="text" name="description" value={description} onChange={onInput}/>
                        <EffectDiv>{descriptionDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>
                    <div style={{width:'100%', textAlign: 'center'}}>
                    <Butt cursor="pointer" onClick={productSave}>회원가입</Butt> 
                    </div>
            </ContentDiv>
            </InnerDiv>
            
        </div>
    );
};

export default Product ;