package com.newdeal.suhwagdam.controller;

import com.newdeal.suhwagdam.dto.BidDto;
import com.newdeal.suhwagdam.dto.Response;
import com.newdeal.suhwagdam.dto.request.BidCreateRequest;
import com.newdeal.suhwagdam.dto.response.BidResponse;
import com.newdeal.suhwagdam.dto.response.GoodsResponse;
import com.newdeal.suhwagdam.service.BidService;
import com.newdeal.suhwagdam.service.WebSocketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bid")
@RequiredArgsConstructor
public class BidController {
    private final BidService bidService;
    private final WebSocketService webSocketService;

    @PostMapping
    public Response<Void> createBid(@Valid @RequestBody BidCreateRequest request, Authentication authentication) {
        BidDto bidDto = bidService.create(request, authentication.getName());
        webSocketService.broadcastGoodsUpdate(GoodsResponse.fromGoodsDto(bidDto.getGoodsDto()));
        webSocketService.broadcastBidUpdate(BidResponse.fromBidDto(bidDto));
        return Response.success();
    }

    @GetMapping("/goods/{goodsSeq}")
    public Response<List<BidResponse>> getBidsByGoodsSeq(@PathVariable long goodsSeq) {
        return Response.success(bidService.getBidsByGoodsSeq(goodsSeq).stream().map(BidResponse::fromBidDto).toList());
    }
}
