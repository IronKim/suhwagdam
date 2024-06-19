import {apiClient} from "./ApiClient";

export const getGoodsList = () => apiClient.get('api/v1/goods');