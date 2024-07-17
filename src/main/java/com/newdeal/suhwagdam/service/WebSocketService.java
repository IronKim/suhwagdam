package com.newdeal.suhwagdam.service;

import com.newdeal.suhwagdam.dto.response.BidResponse;
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

    public void broadcastBidUpdate(BidResponse bidResponse) {
        messagingTemplate.convertAndSend("/topic/bid/goods/" + bidResponse.getGoodsResponse().getSeq(), bidResponse);
    }
    
    public void sendBidSuccess(String accountId, String message) {
    	messagingTemplate.convertAndSendToUser(accountId, "/topic/bidSuccess", message);
    }
}
