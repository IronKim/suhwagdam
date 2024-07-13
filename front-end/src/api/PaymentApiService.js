import {apiClient} from "./ApiClient";

export const paymentPost = (paymentDto) => {
    return apiClient.post('api/v1/payment', paymentDto);
  };
  
export const getPaymentList = () => apiClient.get(`api/v1/payment`);
