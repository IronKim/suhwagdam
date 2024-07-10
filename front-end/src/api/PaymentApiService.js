import {apiClient} from "./ApiClient";

export const getPaymentList = () => apiClient.get(`api/v1/payment`);