import {apiClient} from "./ApiClient";

export const getBidsBygoodsSeq = (goodsSeq) => apiClient.get(`api/v1/bid/goods/${goodsSeq}`);