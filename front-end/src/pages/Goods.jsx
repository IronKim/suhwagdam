import React, {useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, TimePicker, Input, Form, Upload, Radio } from 'antd';
import styled from "styled-components";
import Butt from '../components/Butt'
import dayjs from 'dayjs';
import sweet from 'sweetalert2'; 
import { TbPhotoPlus } from "react-icons/tb";
import { postGoods } from '../../src/api/GoodsApiService';

    const InnerDiv = styled.div`
        /* border: 1px solid red; */
        
        @media (min-width: 800px){
            margin: auto;
            width: 800px;
        }
    `;
    const NameDiv = styled.div`
        /* border: 1px solid green; */
        margin-top: 5%;
        height: 100px;
    `;
    const ContentDiv = styled.div`
        /* border: 1px solid red; */
        margin-top:10%;
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
    const Goods  = () => {

        const [goodsDTO, setGoodsDTO] = useState({
            title: '',      
            description:'',
            categoryId: '',  
            startingPrice: '',   
            deadline:'',  
            images: [],   
        });
        const{title,description,categoryId,startingPrice,deadline,images
        } = goodsDTO

        const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
        const [endTime, setEndTime] = useState('')
        const [goodsimages, setGoodsimages] = useState([])
        const [clientPrice, setClientPrice] = useState('')
        const [titleDiv, setTitleDiv] = useState('')
        const [cateDiv, setCateDiv] = useState('')
        const [descriptionDiv, setDescriptionDiv] = useState('')
        const [imageDiv, setImageDiv] = useState('')
        const [starting_priceDiv, setStarting_priceDiv] = useState('')
        const [endDateDiv, setEndDateDiv] = useState('')
        const [deadlineDiv, setDeadlineDiv] = useState('')
        
        const productSave = async (e) => {
            e.preventDefault()

            var sw = 1
            if(!title){
                setTitleDiv('제목을 입력하세요')
                sw=0
            }else {
                setTitleDiv('')
            }
            if(!categoryId){
                setCateDiv('카테고리를 선택하세요')
                sw=0
            }else {
                setCateDiv('')
            }
            if(!description){
                setDescriptionDiv('설명을 입력하세요')
                sw=0
            }else {
                setDescriptionDiv('')
            }
            if(!goodsimages.length){
                setImageDiv('이미지를 등록하세요')
                sw=0
            }else {
                setImageDiv('')
            }
            if(!clientPrice){
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
            if(!endTime){
                setDeadlineDiv('판매종료 시간을 입력하세요')
                sw=0
            }else {
                setDeadlineDiv('')
            }
            if(sw === 1){
                const deadline = `${endDate}T${dayjs(endTime, 'HH:mm:ss').format('HH:mm:ss')}`;

                setGoodsDTO(prevState => ({
                    ...prevState,
                    deadline: deadline
                }));
                try {
                    const res = await postGoods({
                        ...goodsDTO,
                        deadline: deadline
                    });
                    sweet.fire({
                        title: "등록이 완료되었습니다.",
                        icon: "success"
                    });
    
                } catch (error) {
                    console.error('등록 실패', error);
                }
            }
        }

    const onInput = (e) => {
        if(e && e.target){
            const {name, value} = e.target
            setGoodsDTO({...goodsDTO, [name]: value.slice(0,30)})
        }
    }
    const onInputTA = (e) => {
        if(e && e.target){
            const {name, value} = e.target
            setGoodsDTO({...goodsDTO, [name]: value.slice(0,100)})
        }
    }
    const onInputDate = (date, dateString, fieldName) => {
        if (fieldName === 'endDate') {
            setEndDate(dateString); 
        }
        if (fieldName === 'endTime') {
            setEndTime(date.format('HH:mm:ss') );
        }
        
    }
    const starting_priceHand = (e) => {
        let clientPrice = e.target.value;
    
        clientPrice = Number(clientPrice.replaceAll(',',''));

        if(isNaN(clientPrice)){
            setClientPrice('0');
        }else{
            setClientPrice(clientPrice.toLocaleString('ko-KR'));
            setGoodsDTO({ ...goodsDTO, startingPrice: clientPrice });
        }
    }
    const starting_priceFocus = () => {
        setClientPrice('');
    }
    const onFileChange = (e) => {
        const fileList = normFile(e);
        const blobUrls = fileList.map(file => URL.createObjectURL(file.originFileObj));
        setGoodsimages(fileList); // 이미지 파일 목록 저장
        setGoodsDTO({ ...goodsDTO, images: blobUrls }); // Blob URL 저장
    };
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    /////////////

    const PickerWithType = ({onChange }) => {
            return <StyledTimePicker onChange={onChange} />;
    }
    
    
    /////////////
    return (
        <div>
            <InnerDiv>
                <NameDiv><h1 style={{marginLeft:'20px',  fontSize: '35px'}}>상품등록</h1></NameDiv>
            <ContentDiv>
                <Form>
                <StyledCate>
                    <StyledCateTitle>상품 사진</StyledCateTitle>
                    <StyledCateCon>
                        <Form.Item name="goodsimages" valuePropName="fileList" getValueFromEvent={normFile}>
                            <StyledUpload listType="picture-card"
                                    name="goodsimages" fileList={goodsimages} 
                                    onChange={onFileChange} 
                            >
                            {goodsimages.length < 5 && (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <TbPhotoPlus style={{ width: '80%', height: '80%', opacity: 0.7 }} />
                                        </div>
                            )}
                            </StyledUpload>
                            <EffectDiv>{imageDiv}</EffectDiv>
                        </Form.Item>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate>
                    <StyledCateTitle>제목</StyledCateTitle>
                    <StyledCateCon>
                        <StyledInput maxLength={50} placeholder='품목명과 무게를 포함하여 지어주세요.'
                                    type="text" name="title" value={title} onChange={onInput} />
                        <EffectDiv>{titleDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>
                <StyledCate>
                    <StyledCateTitle>상품 카테고리</StyledCateTitle>
                    <StyledCateCon>
                        <Radio.Group name = "categoryId" onChange={e => setGoodsDTO({ ...goodsDTO, categoryId: e.target.value })} value={categoryId}>
                            <Radio value="100" style={{fontSize:'15px'}}> 농산물 </Radio>
                            <Radio value="200" style={{fontSize:'15px'}}> 수산물 </Radio>
                        </Radio.Group>          
                        <EffectDiv>{cateDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>
                
                <StyledCate>
                    <StyledCateTitle>판매 시작액</StyledCateTitle>
                    <StyledCateCon>
                    <StyledInput type='text' placeholder='숫자만 입력해 주세요.'
                                 name="clientPrice" value={clientPrice} 
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
                        <StyledTimePicker name="endTime"
                                        value={endTime ? dayjs(endTime, 'HH:mm:ss') : null}
                                        onChange={(time, timeString) => onInputDate(time, timeString, 'endTime')}
                                        />
                        <EffectDiv>{deadlineDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>

                <StyledCate height="150px">
                    <StyledCateTitle>상품 설명</StyledCateTitle>
                    <StyledCateCon>
                        <StyledTA rows={4} placeholder='최대 100자' 
                        type="text" name="description" value={description} onChange={onInputTA}/>
                        <EffectDiv>{descriptionDiv}</EffectDiv>
                    </StyledCateCon>
                </StyledCate>
                    <div style={{width:'100%', textAlign: 'center'}}>
                    <Butt cursor="pointer" onClick={productSave}>상품등록</Butt> 
                    </div>
                </Form>
            </ContentDiv>
            </InnerDiv>
            
        </div>
    );
};

export default Goods ;