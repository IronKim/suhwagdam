package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.dto.response.GoodsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {
    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastGoodsUpdate(GoodsResponse goodsResponse) {
        messagingTemplate.convertAndSend("/topic/goods", goodsResponse);
    }
}
