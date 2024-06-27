import {apiClient} from "./ApiClient";

export const getGoodsList = () => apiClient.get('api/v1/goods');

export const postGoods = (goodsDTO) => {
    return apiClient.post('api/v1/goods', goodsDTO);
  };
