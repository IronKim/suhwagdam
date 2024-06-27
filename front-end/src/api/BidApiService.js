import {apiClient} from "./ApiClient";

export const getBidsBygoodsSeq = (goodsSeq) => apiClient.get(`api/v1/bid/goods/${goodsSeq}`);

export const postbid = (bidDTO) => {
    return apiClient.post('api/v1/bid', bidDTO);
  };