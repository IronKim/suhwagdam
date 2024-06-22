import {subscribeToTopic} from "./WebSocketClient";

export const subscribeToGoodsUpdates = (setGoodsList) => {
    return subscribeToTopic('/topic/goods', (message) => {
        const newGoods = JSON.parse(message.body);

        setGoodsList(prevGoodsList => {
            const existingGoods = prevGoodsList.find(goods => goods.seq === newGoods.seq);

            if (existingGoods) {
                return prevGoodsList.map(goods => goods.seq === newGoods.seq ? newGoods : goods);
            } else {
                return [...prevGoodsList, newGoods];
            }
        });
    });
}

export const subscribeToBidUpdates = (goodsSeq, setBids) => {
    return subscribeToTopic(`/topic/bid/goods/${goodsSeq}`, (message) => {
        const newBid = JSON.parse(message.body);
        setBids(prevBids =>[...prevBids, newBid]);
    });
}