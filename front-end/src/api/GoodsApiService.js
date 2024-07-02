import {apiClient} from "./ApiClient";

export const getGoodsList = () => apiClient.get('api/v1/goods');
export const getAuctionList = (accountId) => apiClient.get(`api/v1/user-account/${accountId}/goods`);

export const getMyGoodsList = (accountId) => apiClient.get(`api/v1/user-account/${accountId}/goods`);

export const postGoods = (goodsDTO) => {
    return apiClient.post('api/v1/goods', goodsDTO);
  };
