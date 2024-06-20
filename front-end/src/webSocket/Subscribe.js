import {getStompClient} from "./WebSocketClient";

export const subscribeToGoodsUpdates = (setGoodsList) => {
    const stompClient = getStompClient();

    stompClient.connect({}, (frame) => {
        // 상품 등록,수정 이벤트 수신
        stompClient.subscribe('/topic/goods', (message) => {
            const newGoods = JSON.parse(message.body);

            setGoodsList(prevGoodsList => {
                const updatedGoods = prevGoodsList.find(goods => goods.seq === newGoods.seq);

                if (updatedGoods) {
                    return prevGoodsList.map(goods => goods.seq === newGoods.seq ? newGoods : goods);
                } else {
                    return [...prevGoodsList, newGoods];
                }
            });
        });
    });

    return () => {
        stompClient.disconnect();
    };
}