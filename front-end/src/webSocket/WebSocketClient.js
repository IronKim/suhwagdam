import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

let stompClient = null;
let connectingPromise = null;

const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    // stompClient.debug = () => {}; // 디버그 로그 출력 방지

    return new Promise((resolve, reject) => {
        stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
            stompClient.reconnect_delay = 2000; // 재연결 딜레이 설정 (옵션)
            stompClient.onWebSocketClose(() => {
                console.log('WebSocket connection closed');
                stompClient = null; // 연결 끊김 처리
                connectingPromise = null; // 연결 상태를 초기화하여 다시 연결할 수 있도록 함
            });
            resolve(stompClient); // 연결 성공 시 resolve
        }, (error) => {
            reject(error); // 연결 실패 시 reject
        });
    });
};

const getStompClient = async () => {
    if (!stompClient || !stompClient.connected) {
        if (!connectingPromise) {
            connectingPromise = connectWebSocket();
        }
        try {
            stompClient = await connectingPromise;
        } catch (error) {
            console.error('Failed to connect to WebSocket:', error);
        }
    }

    return stompClient;
};

export const subscribeToTopic = async (topic, callback) => {
    try {
        const client = await getStompClient();
        return client.subscribe(topic, callback); // 구독 객체 반환
    } catch (error) {
        console.error('Failed to subscribe:', error);
    }
};
