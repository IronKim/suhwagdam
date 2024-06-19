import SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
    });
};

export const getStompClient = () => stompClient;