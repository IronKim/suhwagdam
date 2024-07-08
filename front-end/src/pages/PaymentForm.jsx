import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const FormContainer = styled.div`
  width: 90%;
  height: auto;
  margin: 60px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  
  @media (max-width: 639px) {
    width: 95%;
  }
`;

const AmountContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const AmountButton = styled.button`
  background-color: ${props => props.selected ? '#ddd' : '#fff'};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 40px 40px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  font-size: 20px;
`;

const AgreementContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #5AC463;
  }
`;

const SubmitButton = styled.button`
  background-color: #5AC463;
  border: none;
  color: white;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  width: 50%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red; 
  margin-bottom: 10px; 
`;

const PaymentForm = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!termsAccepted) {
      newErrors.termsAccepted = '약관에 동의해야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
          // 결제 처리 코드 추가
          IMP.request_pay({
              pg: 'html5_inicis',
              pay_method: 'card',
              merchant_uid: 'merchant_' + new Date().getTime(),
              name: selectedAmount + ' 상품 결제',
              amount: Number(selectedAmount.replace('만원', '0000')),
          }, function (rsp) {
              if (rsp.success) {
                  var msg = '결제가 완료되었습니다.';
                  msg += '고유ID : ' + rsp.imp_uid;
                  msg += '상점 거래ID : ' + rsp.merchant_uid;
                  msg += '결제 금액 : ' + rsp.paid_amount;
                  msg += '카드 승인번호 : ' + rsp.apply_num;
              } else {
                  var msg = '결제에 실패하였습니다.';
                  msg += '에러내용 : ' + rsp.error_msg;
              }
              alert(msg);
          });
      }
    };

  return (
    <FormContainer>
      <h1>결제금액</h1>
      <AmountContainer>
        {['1만원', '3만원', '5만원', '10만원', '30만원'].map(amount => (
          <AmountButton
            key={amount}
            selected={selectedAmount === amount}
            onClick={() => setSelectedAmount(amount)}
          >
            {amount}
          </AmountButton>
        ))}
      </AmountContainer>

      <form onSubmit={handleSubmit}>
        <AgreementContainer>
          <Label>
            상품 가격 및 유효 기간을 확인하였으며, 계약 관련 고지사항 및 결제에 동의합니다.
            <Checkbox
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </Label>
        </AgreementContainer>
        {errors.termsAccepted && <ErrorMessage>{errors.termsAccepted}</ErrorMessage>}
        <SubmitButton type="submit">결제</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default PaymentForm;